<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Fungsi untuk login pengguna dengan username
    public function login(Request $request)
    {
        // Validasi input yang diterima
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ], [
            'username.required' => 'Username wajib diisi.',
            'username.string' => 'Username harus berupa teks.',
            'password.required' => 'Password wajib diisi.',
            'password.string' => 'Password harus berupa teks.',
        ]);
        
        // Jika validasi gagal, kembalikan error
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Cek kredensial pengguna
        $user = User::where('username', $request->username)->first();

        // Jika pengguna tidak ditemukan atau password salah
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Akses Ditolak! Username atau password salah.'
            ], 401);
        }

        // Buat token untuk pengguna
        $token = $user->createToken('auth_token')->plainTextToken;

        // Kembalikan respons JSON dengan data pengguna dan token
        return response()->json([
            'message' => 'Login berhasil',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'nama_lengkap' => $user->nama_lengkap,
                    'email' => $user->email,
                    // Tambahkan atribut lain sesuai yang diperlukan
                ],
                'access_token' => $token,
                'token_type' => 'Bearer'
            ]
        ]);
    }

    // Fungsi untuk memeriksa validitas token (misalnya dalam middleware)
    public function checkToken(Request $request)
    {
        // Memeriksa token dari header
        $token = $request->bearerToken();

        if (!$token || !Auth::guard('api')->setToken($token)->check()) {
            return response()->json([
                'message' => 'Token tidak valid atau telah kedaluwarsa.'
            ], 401);
        }

        // Jika token valid, dapatkan informasi pengguna
        $user = Auth::guard('api')->user();

        return response()->json([
            'message' => 'Token valid.',
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'nama_lengkap' => $user->nama_lengkap,
                'email' => $user->email,
                // Tambahkan atribut lain sesuai yang diperlukan
            ]
        ]);
    }
}
