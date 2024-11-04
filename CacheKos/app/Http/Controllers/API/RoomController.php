<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{

   // FUNCTION INDEX 
   public function index()
    {
        // Mengambil semua data di table rooms dan menyimpan ke dalam variable $rooms
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
                'created_by' => 'required|integer',  
                'updated_by' => 'nullable|integer', 
            ]);
            
            // Menambahkan data baru ke tabel rooms
            $roomId = DB::table('rooms')->insertGetId($validatedData);
    
            // Mengembalikan respons JSON setelah berhasil menambahkan data
            return response()->json([
                'message' => 'Data kamar berhasil ditambahkan.',
                'data' => [
                    'id' => $roomId,
                    'nama_kamar' => $validatedData['nama_kamar'],
                    'nomor_kamar' => $validatedData['nomor_kamar'],
                    'harga_per_bulan' => $validatedData['harga_per_bulan'],
                    'harga_per_hari' => $validatedData['harga_per_hari'],
                    'fasilitas' => $validatedData['fasilitas'],
                    'kelengkapan_lain' => $validatedData['kelengkapan_lain'],
                    'catatan_kamar' => $validatedData['catatan_kamar'],
                    'created_by' => $validatedData['created_by'],
                    'updated_by' => $validatedData['updated_by'],
                ]
            ], 201);
        } catch (\Exception $e) {
            // Mengembalikan respons JSON dengan error
            return response()->json([
                'message' => 'Terjadi kesalahan saat menambahkan data kamar.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
}
