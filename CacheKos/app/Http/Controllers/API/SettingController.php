<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SettingController extends Controller
{
    // Mendapatkan semua data room settings
    public function index()
    {
        // Mengambil semua data dari tabel room_settings
        $room_settings = DB::table('room_settings')->select(

            'nama_kost',
            'alamat',
            'telepon',
            'email',
            'deskripsi',
            'logo',
            'tenggang_waktu',
            'biaya_terlambat',
            'facebook',
            'instagram',
            'tiktok'

        )->get();

        // Menampilkan data 
        return response()->json([
            'success' => true,
            'message' => 'Berhasil mengambil data room settings',
            'data' => $room_settings
        ], 200);
    }


    // Menambahkan data room setting baru
    public function store(Request $request)
    {
        // Validasi data yang dikirimkan
        $validatedData = $request->validate([
            'nama_kost' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'telepon' => 'required|string|max:15',
            'email' => 'required|email|max:255',
            'deskripsi' => 'nullable|string',
            'logo' => 'nullable|string|max:255',
            'tenggang_waktu' => 'required|integer',
            'biaya_terlambat' => 'required|numeric',
            'facebook' => 'nullable|url|max:255',
            'instagram' => 'nullable|url|max:255',
            'tiktok' => 'nullable|url|max:255',
        ]);

        // Menyimpan data baru ke dalam tabel room_settings
        $newSetting = DB::table('room_settings')->insertGetId($validatedData); // Menggunakan insertGetId() untuk mendapatkan ID baru yang telah disimpan.get($validatedData);

        // Mengembalikan response sukses
        return response()->json([
            'success' => true,
            'message' => 'Data room setting berhasil ditambahkan',
            'data' => $validatedData
        ], 201);
    }
}
