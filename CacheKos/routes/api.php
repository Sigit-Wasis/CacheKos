<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\UserController;

// use App\Http\Controllers\Api\ResidentController; // Uncomment jika diperlukan

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Rute untuk autentikasi
Route::post('/login', [AuthController::class, 'login']);

// Rute untuk mendapatkan informasi pengguna yang terautentikasi
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rute untuk logout
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);



// Route untuk RoomController
Route::prefix('rooms')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [RoomController::class, 'index']); // Menampilkan semua data kamar
    Route::post('/', [RoomController::class, 'create']); // Menambahkan data kamar baru
    Route::put('/{id}', [RoomController::class, 'edit']); // Memperbarui data kamar berdasarkan ID
    Route::get('/{id}', [RoomController::class, 'show']); // Mengambil data kamar berdasarkan ID
    Route::delete('/{id}', [RoomController::class, 'destroy']); // Menghapus data kamar berdasarkan ID
});

Route::prefix('users')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [UserController::class, 'index']); // Menampilkan semua data user
    Route::post('/', [UserController::class, 'create']); // Menambahkan data user baru
    Route::put('/{id}', [UserController::class, 'edit']); // Memperbarui data user berdasarkan ID
    Route::get('/{id}', [UserController::class, 'show']); // Mengambil data user berdasarkan ID
    Route::delete('/{id}', [UserController::class, 'destroy']); // Menghapus data user berdasarkan ID
});

// Rute untuk ResidentController (jika diperlukan)
// Route::prefix('residents')->middleware('auth:sanctum')->group(function () {
//     Route::get('/', [ResidentController::class, 'index']); // Mendapatkan semua resident
//     Route::post('/', [ResidentController::class, 'store']); // Membuat resident baru
//     Route::get('/{id}', [ResidentController::class, 'show']); // Mendapatkan resident berdasarkan ID
//     Route::put('/{id}', [ResidentController::class, 'update']); // Memperbarui resident berdasarkan ID
//     Route::delete('/{id}', [ResidentController::class, 'destroy']); // Menghapus resident berdasarkan ID
// });

// Route untuk SettingController
Route::prefix('settings')->group(function () {
    Route::get('/', [SettingController::class, 'index']);
    Route::post('/', [SettingController::class, 'store']);
    Route::get('/{id}', [SettingController::class, 'show']);
    Route::put('/{id}', [SettingController::class, 'update']);
    Route::delete('/{id}', [SettingController::class, 'destroy']);
});
