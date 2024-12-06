<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Resident;
use Illuminate\Support\Facades\Auth;

class ResidentController extends Controller
{
   /**
 * @OA\Get(
 *     path="/api/residents",
 *     summary="Retrieve a list of residents with pagination",
 *     tags={"Residents"},
 *     @OA\Parameter(
 *         name="per_page",
 *         in="query",
 *         description="Number of records per page",
 *         required=false,
 *         @OA\Schema(type="integer", default=10)
 *     ),
 *     @OA\Parameter(
 *         name="search",
 *         in="query",
 *         description="Search term for filtering residents by name",
 *         required=false,
 *         @OA\Schema(type="string", example="John")
 *     ),
 *     @OA\Parameter(
 *         name="sort_field",
 *         in="query",
 *         description="Field to sort the results by",
 *         required=false,
 *         @OA\Schema(type="string", default="id")
 *     ),
 *     @OA\Parameter(
 *         name="sort_order",
 *         in="query",
 *         description="Sort order (asc or desc)",
 *         required=false,
 *         @OA\Schema(type="string", default="asc")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Residents retrieved successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Residents retrieved successfully"),
 *             @OA\Property(property="code", type="integer", example=200),
 *             @OA\Property(
 *                 property="data",
 *                 type="array",
 *                 @OA\Items(
 *                     @OA\Property(property="id", type="integer", example=1),
 *                     @OA\Property(property="nama_penghuni", type="string", example="John Doe"),
 *                     @OA\Property(property="rooms", type="object", nullable=true),
 *                 )
 *             ),
 *             @OA\Property(
 *                 property="pagination",
 *                 type="object",
 *                 @OA\Property(property="current_page", type="integer", example=1),
 *                 @OA\Property(property="per_page", type="integer", example=10),
 *                 @OA\Property(property="total", type="integer", example=50),
 *                 @OA\Property(property="last_page", type="integer", example=5),
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid request",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Invalid request"),
 *             @OA\Property(property="code", type="integer", example=400)
 *         )
 *     )
 * )
 */

    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $search = $request->query('search', '');
        $sortField = $request->query('sort_field', 'id');
        $sortOrder = $request->query('sort_order', 'asc');

        $residents = Resident::with('rooms')
            ->where('nama_penghuni', 'like', "%$search%")
            ->orderBy($sortField, $sortOrder)
            ->paginate($perPage);

        return response()->json([
            'message' => 'Residents retrieved successfully',
            'code' => 200,
            'data' => $residents->items(),
            'pagination' => [
                'current_page' => $residents->currentPage(),
                'per_page' => $residents->perPage(),
                'total' => $residents->total(),
                'last_page' => $residents->lastPage(),
            ],
        ], 200);
    }

    /**
 * @OA\Get(
 *     path="/api/non-active-residents",
 *     summary="Retrieve a list of non-active residents with pagination",
 *     tags={"Residents"},
 *     @OA\Parameter(
 *         name="per_page",
 *         in="query",
 *         description="Number of records per page",
 *         required=false,
 *         @OA\Schema(type="integer", default=10)
 *     ),
 *     @OA\Parameter(
 *         name="sort_field",
 *         in="query",
 *         description="Field to sort the results by",
 *         required=false,
 *         @OA\Schema(type="string", default="id")
 *     ),
 *     @OA\Parameter(
 *         name="sort_order",
 *         in="query",
 *         description="Sort order (asc or desc)",
 *         required=false,
 *         @OA\Schema(type="string", default="asc")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Non-active residents retrieved successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Non-active residents retrieved successfully"),
 *             @OA\Property(property="code", type="integer", example=200),
 *             @OA\Property(
 *                 property="data",
 *                 type="array",
 *                 @OA\Items(
 *                     @OA\Property(property="id", type="integer", example=1),
 *                     @OA\Property(property="nama_penghuni", type="string", example="John Doe"),
 *                     @OA\Property(property="status_sewa", type="integer", example=2),
 *                     @OA\Property(property="rooms", type="object", nullable=true),
 *                 )
 *             ),
 *             @OA\Property(
 *                 property="pagination",
 *                 type="object",
 *                 @OA\Property(property="current_page", type="integer", example=1),
 *                 @OA\Property(property="per_page", type="integer", example=10),
 *                 @OA\Property(property="total", type="integer", example=50),
 *                 @OA\Property(property="last_page", type="integer", example=5),
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid request",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Invalid request"),
 *             @OA\Property(property="code", type="integer", example=400)
 *         )
 *     )
 * )
 */

    public function getNonActiveResidents(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $sortField = $request->query('sort_field', 'id');
        $sortOrder = $request->query('sort_order', 'asc');

        $residents = Resident::with('rooms')
            ->where('status_sewa', 2) // Status 2 untuk non-aktif
            ->orderBy($sortField, $sortOrder)
            ->paginate($perPage);

        return response()->json([
            'message' => 'Non-active residents retrieved successfully',
            'code' => 200,
            'data' => $residents->items(),
            'pagination' => [
                'current_page' => $residents->currentPage(),
                'per_page' => $residents->perPage(),
                'total' => $residents->total(),
                'last_page' => $residents->lastPage(),
            ],
        ], 200);
    }

/**
 * @OA\Get(
 *     path="/api/active-residents",
 *     summary="Retrieve a list of active residents with pagination",
 *     tags={"Residents"},
 *     @OA\Parameter(
 *         name="per_page",
 *         in="query",
 *         description="Number of records per page",
 *         required=false,
 *         @OA\Schema(type="integer", default=10)
 *     ),
 *     @OA\Parameter(
 *         name="sort_field",
 *         in="query",
 *         description="Field to sort the results by",
 *         required=false,
 *         @OA\Schema(type="string", default="id")
 *     ),
 *     @OA\Parameter(
 *         name="sort_order",
 *         in="query",
 *         description="Sort order (asc or desc)",
 *         required=false,
 *         @OA\Schema(type="string", default="asc")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Active residents retrieved successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Active residents retrieved successfully"),
 *             @OA\Property(property="code", type="integer", example=200),
 *             @OA\Property(
 *                 property="data",
 *                 type="array",
 *                 @OA\Items(
 *                     @OA\Property(property="id", type="integer", example=1),
 *                     @OA\Property(property="nama_penghuni", type="string", example="John Doe"),
 *                     @OA\Property(property="status_sewa", type="integer", example=1),
 *                     @OA\Property(property="rooms", type="object", nullable=true),
 *                 )
 *             ),
 *             @OA\Property(
 *                 property="pagination",
 *                 type="object",
 *                 @OA\Property(property="current_page", type="integer", example=1),
 *                 @OA\Property(property="per_page", type="integer", example=10),
 *                 @OA\Property(property="total", type="integer", example=50),
 *                 @OA\Property(property="last_page", type="integer", example=5),
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid request",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Invalid request"),
 *             @OA\Property(property="code", type="integer", example=400)
 *         )
 *     )
 * )
 */

    public function getActiveResidents(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $sortField = $request->query('sort_field', 'id');
        $sortOrder = $request->query('sort_order', 'asc');

        $residents = Resident::with('rooms')
            ->where('status_sewa', 1) // Status 1 untuk aktif
            ->orderBy($sortField, $sortOrder)
            ->paginate($perPage);

        return response()->json([
            'message' => 'Active residents retrieved successfully',
            'code' => 200,
            'data' => $residents->items(),
            'pagination' => [
                'current_page' => $residents->currentPage(),
                'per_page' => $residents->perPage(),
                'total' => $residents->total(),
                'last_page' => $residents->lastPage(),
            ],
        ], 200);
    }
/**
 * @OA\Post(
 *     path="/api/residents",
 *     summary="Create a new resident",
 *     tags={"Residents"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={
 *                 "jenis_sewa_kamar", "id_kamar", "nama_penghuni", 
 *                 "no_handphone", "jenis_kelamin", "no_ktp", 
 *                 "status_penghuni", "lama_sewa", "tanggal_masuk", 
 *                 "status_sewa"
 *             },
 *             @OA\Property(property="jenis_sewa_kamar", type="integer", example=1),
 *             @OA\Property(property="id_kamar", type="integer", example=101),
 *             @OA\Property(property="nama_penghuni", type="string", example="John Doe"),
 *             @OA\Property(property="no_handphone", type="string", example="081234567890"),
 *             @OA\Property(property="jenis_kelamin", type="boolean", example=true, description="1 for male, 0 for female"),
 *             @OA\Property(property="no_ktp", type="string", example="1234567890123456", description="16-digit KTP number"),
 *             @OA\Property(property="status_penghuni", type="integer", example=1),
 *             @OA\Property(property="lama_sewa", type="integer", example=12, description="Duration of rent in months"),
 *             @OA\Property(property="tanggal_masuk", type="string", format="date", example="2024-01-01"),
 *             @OA\Property(property="status_sewa", type="integer", example=1, description="1 for active, 2 for non-active"),
 *             @OA\Property(property="keterangan", type="string", nullable=true, example="Special conditions apply"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Resident created successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Resident created successfully"),
 *             @OA\Property(property="code", type="integer", example=201),
 *             @OA\Property(
 *                 property="data",
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="jenis_sewa_kamar", type="integer", example=1),
 *                 @OA\Property(property="id_kamar", type="integer", example=101),
 *                 @OA\Property(property="nama_penghuni", type="string", example="John Doe"),
 *                 @OA\Property(property="no_handphone", type="string", example="081234567890"),
 *                 @OA\Property(property="jenis_kelamin", type="boolean", example=true),
 *                 @OA\Property(property="no_ktp", type="string", example="1234567890123456"),
 *                 @OA\Property(property="status_penghuni", type="integer", example=1),
 *                 @OA\Property(property="lama_sewa", type="integer", example=12),
 *                 @OA\Property(property="tanggal_masuk", type="string", format="date", example="2024-01-01"),
 *                 @OA\Property(property="status_sewa", type="integer", example=1),
 *                 @OA\Property(property="keterangan", type="string", nullable=true, example="Special conditions apply"),
 *                 @OA\Property(property="created_by", type="integer", example=1),
 *                 @OA\Property(property="updated_by", type="integer", example=1),
 *                 @OA\Property(property="created_at", type="string", format="date-time", example="2024-01-01T12:00:00Z"),
 *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2024-01-01T12:00:00Z")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Validation error",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Validation error"),
 *             @OA\Property(property="errors", type="object")
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Unauthenticated",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Unauthenticated")
 *         )
 *     )
 * )
 */

    public function store(Request $request)
    {
        $validated = $request->validate([
            'jenis_sewa_kamar' => 'required|integer',
            'id_kamar' => 'required|integer',
            'nama_penghuni' => 'required|string|max:255',
            'no_handphone' => 'required|string|max:255',
            'jenis_kelamin' => 'required|boolean',
            'no_ktp' => 'required|string|size:16',
            'status_penghuni' => 'required|integer',
            'lama_sewa' => 'required|integer',
            'tanggal_masuk' => 'required|date',
            'status_sewa' => 'required|integer',
            'keterangan' => 'nullable|string',
        ]);

        $validated['created_by'] = Auth::id();
        $validated['updated_by'] = Auth::id();

        $resident = Resident::create($validated);

        return response()->json([
            'message' => 'Resident created successfully',
            'code' => 201,
            'data' => $resident,
        ], 201);
    }

    /**
 * @OA\Get(
 *     path="/api/residents/{id}",
 *     summary="Retrieve a specific resident by ID",
 *     tags={"Residents"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID of the resident to retrieve",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Resident retrieved successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Resident retrieved successfully"),
 *             @OA\Property(property="code", type="integer", example=200),
 *             @OA\Property(
 *                 property="data",
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="nama_penghuni", type="string", example="John Doe"),
 *                 @OA\Property(property="no_handphone", type="string", example="081234567890"),
 *                 @OA\Property(property="jenis_kelamin", type="boolean", example=true),
 *                 @OA\Property(property="no_ktp", type="string", example="1234567890123456"),
 *                 @OA\Property(property="status_penghuni", type="integer", example=1),
 *                 @OA\Property(property="lama_sewa", type="integer", example=12),
 *                 @OA\Property(property="tanggal_masuk", type="string", format="date", example="2024-01-01"),
 *                 @OA\Property(property="status_sewa", type="integer", example=1),
 *                 @OA\Property(property="keterangan", type="string", nullable=true, example="Special conditions apply"),
 *                 @OA\Property(property="rooms", type="object", nullable=true, example={"id": 101, "nama_kamar": "A-101"}),
 *                 @OA\Property(property="created_at", type="string", format="date-time", example="2024-01-01T12:00:00Z"),
 *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2024-01-01T12:00:00Z")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Resident not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Resident not found")
 *         )
 *     )
 * )
 */


    public function show($id)
    {
        $resident = Resident::with('rooms')->find($id);

        if (!$resident) {
            return response()->json(['message' => 'Resident not found'], 404);
        }

        return response()->json([
            'message' => 'Resident retrieved successfully',
            'code' => 200,
            'data' => $resident,
        ], 200);
    }

    /**
 * @OA\Put(
 *     path="/api/residents/{id}",
 *     summary="Update a specific resident by ID",
 *     tags={"Residents"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID of the resident to update",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={
 *                 "jenis_sewa_kamar", "id_kamar", "nama_penghuni", 
 *                 "no_handphone", "jenis_kelamin", "no_ktp", 
 *                 "status_penghuni", "lama_sewa", "tanggal_masuk", 
 *                 "status_sewa"
 *             },
 *             @OA\Property(property="jenis_sewa_kamar", type="integer", example=1),
 *             @OA\Property(property="id_kamar", type="integer", example=101),
 *             @OA\Property(property="nama_penghuni", type="string", example="John Doe"),
 *             @OA\Property(property="no_handphone", type="string", example="081234567890"),
 *             @OA\Property(property="jenis_kelamin", type="boolean", example=true, description="1 for male, 0 for female"),
 *             @OA\Property(property="no_ktp", type="string", example="1234567890123456", description="16-digit KTP number"),
 *             @OA\Property(property="status_penghuni", type="integer", example=1),
 *             @OA\Property(property="lama_sewa", type="integer", example=12, description="Duration of rent in months"),
 *             @OA\Property(property="tanggal_masuk", type="string", format="date", example="2024-01-01"),
 *             @OA\Property(property="status_sewa", type="integer", example=1, description="1 for active, 2 for non-active"),
 *             @OA\Property(property="keterangan", type="string", nullable=true, example="Special conditions apply"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Resident updated successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Resident updated successfully"),
 *             @OA\Property(property="code", type="integer", example=200),
 *             @OA\Property(
 *                 property="data",
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="jenis_sewa_kamar", type="integer", example=1),
 *                 @OA\Property(property="id_kamar", type="integer", example=101),
 *                 @OA\Property(property="nama_penghuni", type="string", example="John Doe"),
 *                 @OA\Property(property="no_handphone", type="string", example="081234567890"),
 *                 @OA\Property(property="jenis_kelamin", type="boolean", example=true),
 *                 @OA\Property(property="no_ktp", type="string", example="1234567890123456"),
 *                 @OA\Property(property="status_penghuni", type="integer", example=1),
 *                 @OA\Property(property="lama_sewa", type="integer", example=12),
 *                 @OA\Property(property="tanggal_masuk", type="string", format="date", example="2024-01-01"),
 *                 @OA\Property(property="status_sewa", type="integer", example=1),
 *                 @OA\Property(property="keterangan", type="string", nullable=true, example="Special conditions apply"),
 *                 @OA\Property(property="updated_by", type="integer", example=1),
 *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2024-01-01T12:00:00Z")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Resident not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Resident not found")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Validation error",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Validation error"),
 *             @OA\Property(property="errors", type="object")
 *         )
 *     )
 * )
 */

    public function update(Request $request, $id)
    {
        $resident = Resident::find($id);

        if (!$resident) {
            return response()->json(['message' => 'Resident not found'], 404);
        }

        $validated = $request->validate([
            'jenis_sewa_kamar' => 'required|integer',
            'id_kamar' => 'required|integer',
            'nama_penghuni' => 'required|string|max:255',
            'no_handphone' => 'required|string|max:255',
            'jenis_kelamin' => 'required|boolean',
            'no_ktp' => 'required|string|size:16',
            'status_penghuni' => 'required|integer',
            'lama_sewa' => 'required|integer',
            'tanggal_masuk' => 'required|date',
            'status_sewa' => 'required|integer',
            'keterangan' => 'nullable|string',
        ]);

        $validated['updated_by'] = Auth::id();
        $resident->update($validated);

        return response()->json([
            'message' => 'Resident updated successfully',
            'code' => 200,
            'data' => $resident,
        ], 200);
    }

/**
 * @OA\Delete(
 *     path="/api/residents/{id}",
 *     summary="Delete a specific resident by ID",
 *     tags={"Residents"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID of the resident to delete",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Resident deleted successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Resident deleted successfully")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Resident not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Resident not found")
 *         )
 *     )
 * )
 */

    public function destroy($id)
    {
        $resident = Resident::find($id);

        if (!$resident) {
            return response()->json(['message' => 'Resident not found'], 404);
        }

        $resident->delete();

        return response()->json(['message' => 'Resident deleted successfully'], 200);
    }
}
