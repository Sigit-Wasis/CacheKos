<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Resident;
use Illuminate\Support\Facades\Auth;

class ResidentController extends Controller
{
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
