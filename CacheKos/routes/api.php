<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RoomController;
// use App\Http\Controllers\API\ResidentController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route untuk RoomController
Route::prefix('rooms')->group(function () {
    Route::get('/', [RoomController::class, 'index']); // Menampilkan semua data kamar
    Route::post('/', [RoomController::class, 'create']); // Menambahkan data kamar baru
});

// Route untuk ResidentController
// Route::prefix('residents')->group(function () {
//     Route::get('/', [ResidentController::class, 'index']); // Get all residents
//     Route::post('/', [ResidentController::class, 'store']); // Create a new resident
//     Route::get('/{id}', [ResidentController::class, 'show']); // Get a single resident by ID
//     Route::put('/{id}', [ResidentController::class, 'update']); // Update a resident by ID
//     Route::delete('/{id}', [ResidentController::class, 'destroy']); // Delete a resident by ID
// });
