<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class UserController extends Controller
{
    public function index()
    {
        // Mengambil semua data di tabel users
        $users = DB::table('users')->get();

        // Mengembalikan respons JSON dengan data pengguna
        return response()->json([
            'message' => 'Data pengguna berhasil diambil', // Pesan sukses
            'code' => 200, // Kode status HTTP
            'data' => $users // Data pengguna yang diambil
        ], 200); // Kode status HTTP
    }

    public function create(Request $request)
    {
        // Validasi data yang diterima
        $request->validate([
            'username' => 'required|string|max:255|unique:users',
            'nama_lengkap' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // Menyimpan data pengguna baru ke dalam tabel users
        $userId = DB::table('users')->insertGetId([
            'username' => $request->username,
            'nama_lengkap' => $request->nama_lengkap,
            'alamat' => $request->alamat,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Mengenkripsi password
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Mengembalikan respons JSON setelah pengguna berhasil dibuat
        return response()->json([
            'message' => 'Pengguna berhasil dibuat',
            'code' => 201, // Kode status HTTP untuk created
            'data' => [
                'id' => $userId,
                'username' => $request->username,
                'nama_lengkap' => $request->nama_lengkap,
                'alamat' => $request->alamat,
                'email' => $request->email,
            ]
        ], 201); // Kode status HTTP
    }

    public function edit($id)
    {
        // Mengambil data pengguna berdasarkan ID
        $user = DB::table('users')->where('id', $id)->first();

        // Memeriksa apakah pengguna ditemukan
        if (!$user) {
            return response()->json([
                'message' => 'Pengguna tidak ditemukan',
                'code' => 404
            ], 404); // Kode status HTTP untuk not found
        }

        // Mengembalikan respons JSON dengan data pengguna
        return response()->json([
            'message' => 'Data pengguna berhasil diambil',
            'code' => 200,
            'data' => $user
        ], 200); // Kode status HTTP
    }

    public function update(Request $request, $id)
    {
        // Validasi data yang diterima
        $request->validate([
            'username' => 'sometimes|required|string|max:255|unique:users,username,' . $id,
            'nama_lengkap' => 'sometimes|required|string|max:255',
            'alamat' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes|nullable|string|min:6',
        ]);

        // Cek apakah pengguna ada
        $user = DB::table('users')->where('id', $id)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Pengguna tidak ditemukan',
                'code' => 404,
            ], 404); // Kode status HTTP untuk not found
        }

        // Update data pengguna
        $updatedData = [
            'username' => $request->username ?? $user->username,
            'nama_lengkap' => $request->nama_lengkap ?? $user->nama_lengkap,
            'alamat' => $request->alamat ?? $user->alamat,
            'email' => $request->email ?? $user->email,
            'updated_at' => now(),
        ];

        // Update password jika disertakan
        if ($request->password) {
            $updatedData['password'] = bcrypt($request->password);
        }

        // Update data di database
        DB::table('users')->where('id', $id)->update($updatedData);

        // Mengembalikan respons JSON setelah pengguna berhasil diperbarui
        return response()->json([
            'message' => 'Pengguna berhasil diperbarui',
            'code' => 200,
            'data' => $updatedData,
        ], 200); // Kode status HTTP
    }
}
