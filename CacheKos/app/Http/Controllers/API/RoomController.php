<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;



class RoomController extends Controller
{
    /**
 * @OA\Get(
 *     path="/api/rooms",
 *     summary="Get all rooms",
 *     description="Retrieve a list of all rooms",
 *     operationId="getAllRooms",
 *     tags={"Rooms"},
 *     @OA\Response(
 *         response=200,
 *         description="Data rooms berhasil dimuat.",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="message",
 *                 type="string",
 *                 example="Data rooms berhasil dimuat."
 *             ),
 *             @OA\Property(
 *                 property="data",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(property="id", type="integer"),
 *                     @OA\Property(property="name", type="string"),
 *                     @OA\Property(property="description", type="string"),
 *                     @OA\Property(property="capacity", type="integer"),
 *                     @OA\Property(property="created_at", type="string", format="date-time"),
 *                     @OA\Property(property="updated_at", type="string", format="date-time")
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Bad request"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Not found"
 *     )
 * )
 */
public function index()
{
    $rooms = DB::table('rooms')->get();

    return response()->json([
        'message' => 'Data rooms berhasil dimuat.',
        'data' => $rooms
    ], 200);
}


    /**
 * @OA\Post(
 *     path="/api/rooms",
 *     summary="Create a new room",
 *      security={{"sanctum":{}}},
 *     description="Create a new room with all the necessary details",
 *     operationId="createRoom",
 *     tags={"Rooms"},
 *     @OA\RequestBody(
 *         required=true,
 *         description="Room data to create a new room",
 *         @OA\JsonContent(
 *             type="object",
 *             required={"nama_kamar", "nomor_kamar", "harga_per_bulan", "harga_per_hari", "harga_per_minggu", "harga_per_tahun"},
 *             @OA\Property(property="nama_kamar", type="string", example="Deluxe Room"),
 *             @OA\Property(property="nomor_kamar", type="string", example="101"),
 *             @OA\Property(property="harga_per_bulan", type="number", format="float", example=1000000),
 *             @OA\Property(property="harga_per_hari", type="number", format="float", example=50000),
 *             @OA\Property(property="harga_per_minggu", type="number", format="float", example=300000),
 *             @OA\Property(property="harga_per_tahun", type="number", format="float", example=12000000),
 *             @OA\Property(property="fasilitas", type="string", example="AC, Wi-Fi"),
 *             @OA\Property(property="kelengkapan_lain", type="string", example="TV, Kamar Mandi Pribadi"),
 *             @OA\Property(property="catatan_kamar", type="string", example="Kamar bersih dan nyaman"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Room created successfully",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="message", type="string", example="Data kamar berhasil ditambahkan."),
 *             @OA\Property(
 *                 property="data",
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="nama_kamar", type="string", example="Deluxe Room"),
 *                 @OA\Property(property="nomor_kamar", type="string", example="101"),
 *                 @OA\Property(property="harga_per_bulan", type="number", format="float", example=1000000),
 *                 @OA\Property(property="harga_per_hari", type="number", format="float", example=50000),
 *                 @OA\Property(property="harga_per_minggu", type="number", format="float", example=300000),
 *                 @OA\Property(property="harga_per_tahun", type="number", format="float", example=12000000),
 *                 @OA\Property(property="fasilitas", type="string", example="AC, Wi-Fi"),
 *                 @OA\Property(property="kelengkapan_lain", type="string", example="TV, Kamar Mandi Pribadi"),
 *                 @OA\Property(property="catatan_kamar", type="string", example="Kamar bersih dan nyaman"),
 *                 @OA\Property(property="created_by", type="integer", example=1),
 *                 @OA\Property(property="updated_by", type="integer", example=1),
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Bad request",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="message", type="string", example="Validation error"),
 *             @OA\Property(property="errors", type="object")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="message", type="string", example="Terjadi kesalahan saat menambahkan data kamar."),
 *             @OA\Property(property="error", type="string", example="Error message")
 *         )
 *     )
 * )
 */
public function create(Request $request)
{
    try {
        $validatedData = $request->validate([
            'nama_kamar' => 'required|string|max:255',
            'nomor_kamar' => 'required|string|max:50',
            'harga_per_bulan' => 'required|numeric',
            'harga_per_hari' => 'required|numeric',
            'harga_per_minggu' => 'required|numeric',
            'harga_per_tahun' => 'required|numeric',
            'fasilitas' => 'nullable|string',
            'kelengkapan_lain' => 'nullable|string',
            'catatan_kamar' => 'nullable|string',
        ]);

        $validatedData['created_by'] = Auth::id(); 
        $validatedData['updated_by'] = Auth::id(); 
        $roomId = DB::table('rooms')->insertGetId($validatedData);

        return response()->json([
            'message' => 'Data kamar berhasil ditambahkan.',
            'data' => array_merge(['id' => $roomId], $validatedData)
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Terjadi kesalahan saat menambahkan data kamar.',
            'error' => $e->getMessage()
        ], 500);
    }
}


    /**
     * @OA\Put(
     *     path="/api/rooms/{id}",
     *     summary="Mengupdate data kamar",
     *     tags={"Rooms"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID kamar yang ingin diupdate",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="nama_kamar", type="string", nullable=true),
     *             @OA\Property(property="nomor_kamar", type="string", nullable=true),
     *             @OA\Property(property="harga_per_bulan", type="number", format="float", nullable=true),
     *             @OA\Property(property="harga_per_hari", type="number", format="float", nullable=true),
     *             @OA\Property(property="fasilitas", type="string", nullable=true),
     *             @OA\Property(property="kelengkapan_lain", type="string", nullable=true),
     *             @OA\Property(property="catatan_kamar", type="string", nullable=true)           
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Data kamar berhasil diperbarui",
     *         @OA\JsonContent(
     *         )
     *     ),
     *     @OA\Response(response=404, description="Kamar tidak ditemukan"),
     *     @OA\Response(response=500, description="Kesalahan server")
     * )
     */
    public function edit(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nama_kamar' => 'nullable|string|max:255',
            'nomor_kamar' => 'nullable|string|max:50',
            'harga_per_bulan' => 'nullable|numeric',
            'harga_per_hari' => 'nullable|numeric',
            'harga_per_minggu' => 'nullable|numeric',
            'harga_per_tahun' => 'nullable|numeric',
            'fasilitas' => 'nullable|string',
            'kelengkapan_lain' => 'nullable|string',
            'catatan_kamar' => 'nullable|string',
        ]);

        $room = DB::table('rooms')->where('id', $id)->first();

        if ($room) {
            DB::table('rooms')->where('id', $id)->update($validatedData);
            return response()->json([
                'message' => 'Data kamar berhasil diperbarui.',
                'data' => array_merge(['id' => $id], $validatedData)
            ], 200);
        }

        return response()->json(['message' => 'Kamar tidak ditemukan.'], 404);
    }

   /**
 * @OA\Get(
 *     path="/api/rooms/{id}",
 *     summary="Get a room by ID",
 *     description="Retrieve the details of a specific room by its ID",
 *     operationId="getRoomById",
 *     tags={"Rooms"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID of the room to retrieve",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Room data retrieved successfully",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="message", type="string", example="Data kamar berhasil dimuat."),
 *             @OA\Property(
 *                 property="data",
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="nama_kamar", type="string", example="Deluxe Room"),
 *                 @OA\Property(property="nomor_kamar", type="string", example="101"),
 *                 @OA\Property(property="harga_per_bulan", type="number", format="float", example=1000000),
 *                 @OA\Property(property="harga_per_hari", type="number", format="float", example=50000),
 *                 @OA\Property(property="harga_per_minggu", type="number", format="float", example=300000),
 *                 @OA\Property(property="harga_per_tahun", type="number", format="float", example=12000000),
 *                 @OA\Property(property="fasilitas", type="string", example="AC, Wi-Fi"),
 *                 @OA\Property(property="kelengkapan_lain", type="string", example="TV, Kamar Mandi Pribadi"),
 *                 @OA\Property(property="catatan_kamar", type="string", example="Kamar bersih dan nyaman"),
 *                 @OA\Property(property="created_by", type="integer", example=1),
 *                 @OA\Property(property="updated_by", type="integer", example=1),
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Room not found",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="message", type="string", example="Data kamar tidak ditemukan.")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="message", type="string", example="Terjadi kesalahan saat menampilkan data kamar."),
 *             @OA\Property(property="error", type="string", example="Error message")
 *         )
 *     )
 * )
 */
public function show($id)
{
    $room = DB::table('rooms')->where('id', $id)->first();

    if ($room) {
        return response()->json([
            'message' => 'Data kamar berhasil dimuat.',
            'data' => $room
        ], 200);
    }

    return response()->json(['message' => 'Data kamar tidak ditemukan.'], 404);
}


    /**
     * @OA\Delete(
     *     path="/api/rooms/{id}",
     *     summary="Menghapus kamar berdasarkan ID",
     *     tags={"Rooms"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID kamar yang ingin dihapus",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Kamar berhasil dihapus",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Kamar berhasil dihapus.")
     *         )
     *     ),
     *     @OA\Response(response=404, description="Kamar tidak ditemukan"),
     *     @OA\Response(response=500, description="Kesalahan server")
     * )
     */
    public function destroy($id)
    {
        $room = DB::table('rooms')->where('id', $id)->first();

        if ($room) {
            DB::table('rooms')->where('id', $id)->delete();
            return response()->json(['message' => 'Kamar berhasil dihapus.'], 200);
        }

        return response()->json(['message' => 'Kamar tidak ditemukan.'], 404);
    }
}
