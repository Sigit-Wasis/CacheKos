<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\SettingController;
use App\Http\Controllers\API\RoomController;
// use App\Http\Controllers\API\ResidentController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {git 
    return $request->user();
});

// Route untuk RoomController
Route::prefix('rooms')->group(function () {
    Route::get('/', [RoomController::class, 'index']); // Menampilkan semua data kamar
    Route::post('/', [RoomController::class, 'create']); // Menambahkan data kamar baru
    Route::put('/{id}', [RoomController::class, 'edit']); // Memperbarui data kamar berdasarkan ID
    Route ::get('/{id}', [RoomController::class, 'show']); // Mengambil data kamar berdasarkan ID
    Route::delete('/{id}', [RoomController::class, 'destroy']); // Menghapus data kamar berdasarkan ID
});

// Route untuk ResidentController (Jika diperlukan, hapus komentar di bawah ini untuk mengaktifkan)
// Route::prefix('residents')->group(function () {
//     Route::get('/', [ResidentController::class, 'index']); // Get all residents
//     Route::post('/', [ResidentController::class, 'store']); // Create a new resident
//     Route::get('/{id}', [ResidentController::class, 'show']); // Get a single resident by ID
//     Route::put('/{id}', [ResidentController::class, 'update']); // Update a resident by ID
//     Route::delete('/{id}', [ResidentController::class, 'destroy']); // Delete a resident by ID
// });

// Route untuk SettingController
Route::prefix('settings')->group(function () {
    Route::get('/', [SettingController::class, 'index']);
    Route::post('/', [SettingController::class, 'store']);
    Route::get('/{id}', [SettingController::class, 'show']);
    Route::put('/{id}', [SettingController::class, 'update']);
    Route::delete('/{id}', [SettingController::class, 'destroy']);
});
