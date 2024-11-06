<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController; // Mengimpor AuthController
use App\Http\Controllers\Api\RoomController; // Mengimpor RoomController
use App\Http\Controllers\Api\SettingController; // Mengimpor SettingController
use App\Http\Controllers\Api\PaymentController; // Mengimpor UserController
// use App\Http\Controllers\Api\ResidentController; // Mengimpor ResidentController jika diperlukan

/*
|---------------------------------------------------------------------------
| API Routes
|---------------------------------------------------------------------------
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

//logout 
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Route untuk RoomController
Route::prefix('rooms')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [RoomController::class, 'index']); // Menampilkan semua data kamar
    Route::post('/', [RoomController::class, 'create']); // Menambahkan data kamar baru
    Route::put('/{id}', [RoomController::class, 'edit']); // Memperbarui data kamar berdasarkan ID
    Route ::get('/{id}', [RoomController::class, 'show']); // Mengambil data kamar berdasarkan ID
    Route::delete('/{id}', [RoomController::class, 'destroy']); // Menghapus data kamar berdasarkan ID
});

// Rute untuk ResidentController (jika diperlukan)
// Route::prefix('residents')->middleware('auth:sanctum')->group(function () {
//     Route::get('/', [ResidentController::class, 'index']); // Mendapatkan semua resident
//     Route::post('/', [ResidentController::class, 'store']); // Membuat resident baru
//     Route::get('/{id}', [ResidentController::class, 'show']); // Mendapatkan resident berdasarkan ID
//     Route::put('/{id}', [ResidentController::class, 'update']); // Memperbarui resident berdasarkan ID
//     Route::delete('/{id}', [ResidentController::class, 'destroy']); // Menghapus resident berdasarkan ID
// });

//route setting
Route:: prefix ('settings')->group(function () {
Route:: get ('/', [SettingController::class, 'index']);
Route:: post ('/', [SettingController::class, 'store']);
Route:: get ('/{id}', [SettingController::class, 'show']);
Route:: put ('/{id}', [SettingController::class, 'update']);
Route:: delete ('/{id}', [SettingController::class, 'destroy']);
});

//route payment
Route:: prefix ('payments')->group(function () {
Route:: get ('/', [PaymentController::class, 'index']);
Route:: post ('/', [PaymentController::class, 'store']);
Route:: get ('/{id}', [PaymentController::class, 'show']);
Route:: put ('/{id}', [PaymentController::class, 'update']);
Route:: delete ('/{id}', [PaymentController::class, 'destroy']);
});

