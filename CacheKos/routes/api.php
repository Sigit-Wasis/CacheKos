<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController; 
use App\Http\Controllers\Api\RoomController; 
use App\Http\Controllers\Api\ResidentController; 
use App\Http\Controllers\Api\SettingController; 
use App\Http\Controllers\Api\PaymentController; 
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\LaporanController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::get('/laporan-bulanan', [LaporanController::class, 'laporanBulanan']);
Route::get('/laporan-bulan-ini', [LaporanController::class, 'CetakLaporanBulanan'])->defaults('bulan', 'ini');
Route::get('/laporan-bulan-lalu', [LaporanController::class, 'CetakLaporanBulanan'])->defaults('bulan', 'lalu');

Route::get('/laporan-tahunan', [LaporanController::class, 'laporanTahunan']);
Route::get('/laporan-tahun-ini', [LaporanController::class, 'CetakLaporanTahunan'])->defaults('tahun', 'ini');
Route::get('/laporan-tahun-lalu', [LaporanController::class, 'CetakLaporanTahunan'])->defaults('tahun', 'lalu');


Route::get('/laporan-custom-range', [LaporanController::class, 'laporanCustomRange']); // Route baru untuk laporan custom range

Route::prefix('rooms')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [RoomController::class, 'index']);
    Route::post('/', [RoomController::class, 'create']);
    Route::put('/{id}', [RoomController::class, 'edit']);
    Route::get('/{id}', [RoomController::class, 'show']);
    Route::delete('/{id}', [RoomController::class, 'destroy']);
});

Route::prefix('users')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::post('/', [UserController::class, 'create']);
    Route::put('/{id}', [UserController::class, 'edit']);
    Route::get('/{id}', [UserController::class, 'show']);
    Route::delete('/{id}', [UserController::class, 'destroy']);
});

Route::prefix('residents')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [ResidentController::class, 'index']);
    Route::post('/', [ResidentController::class, 'store']);
    Route::get('/{id}', [ResidentController::class, 'show']);
    Route::put('/{id}', [ResidentController::class, 'update']);
    Route::delete('/{id}', [ResidentController::class, 'destroy']);
});

Route::prefix('dashboard')->middleware('auth:sanctum')->group(function () {
    Route::get('/kamar-terisi', [DashboardController::class, 'index']);
});
Route::prefix('settings')->group(function () {
    Route::get('/', [SettingController::class, 'index']);
    Route::post('/', [SettingController::class, 'store']);
    Route::get('/{id}', [SettingController::class, 'show']);
    Route::put('/{id}', [SettingController::class, 'update']);
    Route::delete('/{id}', [SettingController::class, 'destroy']);
});

Route::prefix('payments')->group(function () {
    Route::get('/', [PaymentController::class, 'index']);
    Route::post('/', [PaymentController::class, 'store']);
    Route::get('/{id}', [PaymentController::class, 'show']);
    Route::put('/{id}', [PaymentController::class, 'update']);
    Route::delete('/{id}', [PaymentController::class, 'destroy']);
});



// Rute untuk ResidentController (jika diperlukan)
Route::prefix('residents')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [ResidentController::class, 'index']); // Mendapatkan semua resident
    Route::post('/', [ResidentController::class, 'store']); // Membuat resident baru
    Route::get('/{id}', [ResidentController::class, 'show']); // Mendapatkan resident berdasarkan ID
    Route::put('/{id}', [ResidentController::class, 'update']); // Memperbarui resident berdasarkan ID
    Route::delete('/{id}', [ResidentController::class, 'destroy']); // Menghapus resident berdasarkan ID
});

Route::prefix('dashboard')->middleware('auth:sanctum')->group(function () {
    Route::get('/kamar-terisi', [DashboardController::class, 'index']); // Mendapatkan semua resident
});

// Route untuk SettingController
Route::prefix('settings')->group(function () {
    Route::get('/', [SettingController::class, 'index']);
    Route::post('/', [SettingController::class, 'store']);
    Route::get('/{id}', [SettingController::class, 'show']);
    Route::put('/{id}', [SettingController::class, 'update']);
    Route::delete('/{id}', [SettingController::class, 'destroy']);
});

// Route untuk PaymentController
Route::prefix('payments')->group(function () {
    Route::get('/', [PaymentController::class, 'index']);
    Route::post('/', [PaymentController::class, 'store']);
    Route::get('/{id}', [PaymentController::class, 'show']);
    Route::put('/{id}', [PaymentController::class, 'update']);
    Route::delete('/{id}', [PaymentController::class, 'destroy']);
});

