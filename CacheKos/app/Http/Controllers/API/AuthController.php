<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{/**
 * @OA\Post(
 *     path="/api/login",
 *     summary="Login user",
 *     description="Autentikasi pengguna menggunakan username dan password untuk mendapatkan token akses.",
 *     tags={"Authentication"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="username", type="string", description="Username pengguna", example="user123"),
 *             @OA\Property(property="password", type="string", description="Password pengguna", example="password123")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Login berhasil",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="message", type="string", example="Login berhasil"),
 *             @OA\Property(
 *                 property="data",
 *                 type="object",
 *                 @OA\Property(
 *                     property="user",
 *                     type="object",
 *                     @OA\Property(property="id", type="integer", example=1),
 *                     @OA\Property(property="username", type="string", example="user123"),
 *                     @OA\Property(property="nama_lengkap", type="string", example="John Doe"),
 *                     @OA\Property(property="email", type="string", example="johndoe@example.com")
 *                 ),
 *                 @OA\Property(property="access_token", type="string", description="Token akses", example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."),
 *                 @OA\Property(property="token_type", type="string", description="Tipe token", example="Bearer")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Validasi gagal",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="username", type="array", @OA\Items(type="string", example="Username wajib diisi.")),
 *             @OA\Property(property="password", type="array", @OA\Items(type="string", example="Password wajib diisi."))
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Kredensial salah",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="message", type="string", example="Akses Ditolak! Username atau password salah.")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Kesalahan server",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="message", type="string", example="Kesalahan server.")
 *         )
 *     )
 * )
 */
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

    // Fungsi untuk logout pengguna
    public function logout(Request $request)
    {
        // Mendapatkan pengguna yang terautentikasi
        $user = Auth::user(); // Menggunakan Auth::user() untuk mendapatkan pengguna yang sedang login

        // Debug: Cek apakah pengguna terautentikasi
        if (!$user) {
            return response()->json([
                'message' => 'Pengguna tidak terautentikasi. Pastikan Anda mengirimkan token yang benar.'
            ], 401);
        }
        // Hapus token dari pengguna
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil.'
        ]);
    }

    //function register 
    public function register(Request $request)
    {
        // Validasi input yang diterima
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users',
            'password' => 'required|string',
            'nama_lengkap' => 'required|string',
            'email' => 'required|email|unique:users',
            'alamat' => 'required|string',          

        ], [
            'username.required' => 'Username wajib diisi.',
            'username.string' => 'Username harus berupa teks.',
            'username.unique' => 'Username sudah digunakan.',
            'password.required' => 'Password wajib diisi.',
            'password.string' => 'Password harus berupa teks.',
            'nama_lengkap.required' => 'Nama lengkap wajib diisi.',
            'nama_lengkap.string' => 'Nama lengkap harus berupa teks.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah digunakan.',
            'alamat.required' => 'Alamat wajib diisi.',
            'alamat.string' => 'Alamat harus berupa teks.',
        ]);

        // Jika validasi gagal, kembalikan error
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }    

        // Buat pengguna baru
        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'nama_lengkap' => $request->nama_lengkap,
            'email' => $request->email,
            'alamat' => $request->alamat
        ]);

        return response()->json([
            'message' => 'Register berhasil.',
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'nama_lengkap' => $user->nama_lengkap,
                'email' => $user->email,
                'alamat' => $user->alamat,
                // Tambahkan atribut lain sesuai yang diperlukan
            ]
        ]);
    }

}
