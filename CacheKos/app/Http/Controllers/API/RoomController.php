<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    // FUNCTION INDEX 
    public function index()
    {
        // Mengambil semua data di tabel rooms dan menyimpan ke dalam variabel $rooms
        $rooms = DB::table('rooms')->get();

        // Mengembalikan respons JSON
        return response()->json([
            'message' => 'Data rooms berhasil dimuat.',
            'data' => $rooms
        ], 200);
    }

    // FUNCTION CREATE
    public function create(Request $request)
    {
        try {
            // Validasi data yang diterima dari permintaan
            $validatedData = $request->validate([
                'nama_kamar' => 'required|string|max:255',
                'nomor_kamar' => 'required|string|max:50',
                'harga_per_bulan' => 'required|numeric',
                'harga_per_hari' => 'required|numeric',
                'fasilitas' => 'nullable|string',
                'kelengkapan_lain' => 'nullable|string',
                'catatan_kamar' => 'nullable|string',
                
            ]);

            // Menambahkan data baru ke tabel rooms
            // Menambahkan kolom 'created_by' dengan ID pengguna yang sedang login
            $validatedData['created_by'] = Auth::id(); 
            // Menambahkan kolom 'created_by' dengan ID pengguna yang sedang login
            $validatedData['updated_by'] = Auth::id(); 
            $roomId = DB::table('rooms')->insertGetId($validatedData);


            // Mengembalikan respons JSON setelah berhasil menambahkan data
            return response()->json([
                'message' => 'Data kamar berhasil ditambahkan.',
                'data' => array_merge(['id' => $roomId], $validatedData)
            ], 201);
        } catch (\Exception $e) {
            // Mengembalikan respons JSON dengan error
            return response()->json([
                'message' => 'Terjadi kesalahan saat menambahkan data kamar.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // FUNCTION EDIT
    // FUNCTION EDIT
public function edit(Request $request, $id)
{
    try {
        // 1. Cek dulu apakah data exists
        $currentRoom = DB::table('rooms')->where('id', $id)->first();
        
        if (!$currentRoom) {
            return response()->json([
                'message' => 'Kamar dengan ID ' . $id . ' tidak ditemukan.',
            ], 404);
        }

        // 2. Konversi current data ke array
        $currentData = (array) $currentRoom;

        // 3. Merge data lama dengan data baru yang dikirim
        $validatedData = $request->validate([
            'nama_kamar' => 'sometimes|required|string|max:255',
            'nomor_kamar' => 'sometimes|required|string|max:50',
            'harga_per_bulan' => 'sometimes|required|numeric',
            'harga_per_hari' => 'sometimes|required|numeric',
            'fasilitas' => 'nullable|string',
            'kelengkapan_lain' => 'nullable|string',
            'catatan_kamar' => 'nullable|string',
            'updated_by' => 'required|integer',
        ]);

        // 4. Update data
        DB::table('rooms')->where('id', $id)->update($validatedData);

        // 5. Ambil data yang sudah diupdate
        $updatedRoom = DB::table('rooms')->where('id', $id)->first();

        return response()->json([
            'message' => 'Data kamar berhasil diperbarui.',
            'data' => $updatedRoom
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Terjadi kesalahan saat memperbarui data kamar.',
            'error' => $e->getMessage(),
            'data_sent' => $request->all() // tambahkan ini untuk debugging
        ], 500);
    }
}
    // FUNCTION SHOW/DETAIL
public function show($id)
{
    try {
        // Ambil data room berdasarkan ID
        $room = DB::table('rooms')->where('id', $id)->first();
        
        if (!$room) {
            return response()->json([
                'message' => 'Data kamar tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'message' => 'Data kamar berhasil dimuat.',
            'data' => $room
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Terjadi kesalahan saat mengambil data kamar.',
            'error' => $e->getMessage()
        ], 500);
    }
}

//delete 
public function destroy($id)
{
    try {
        // Cek dulu apakah data exists
        $currentRoom = DB::table('rooms')->where('id', $id)->first();
        
        if (!$currentRoom) {
            return response()->json([
                'message' => 'Kamar dengan ID ' . $id . ' tidak ditemukan.',
            ], 404);
        }

        // Hapus data
        DB::table('rooms')->where('id', $id)->delete();

        return response()->json([
            'message' => 'Data kamar berhasil dihapus.',
        ], 200);        
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Terjadi kesalahan saat menghapus data kamar.',
            'error' => $e->getMessage()
        ], 500);
    }
}
   
}
