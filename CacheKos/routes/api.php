<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController; 
use App\Http\Controllers\Api\RoomController; 
use App\Http\Controllers\Api\ResidentController; 
use App\Http\Controllers\Api\SettingController; 
use App\Http\Controllers\Api\PaymentController; 
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\ExpenseController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\LaporanController;
use App\Http\Controllers\API\InvoiceController;
 use App\Http\Controllers\API\KategoriBeritaController;

/*
|---------------------------------------------------------------------------|
| API Routes                                                                |
|---------------------------------------------------------------------------|
| Here is where you can register API routes for your application.          |
| These routes are loaded by the RouteServiceProvider within a group which |
| is assigned the "api" middleware group. Enjoy building your API!        |
|---------------------------------------------------------------------------|
*/
//route register
Route::post('/register', [AuthController::class, 'register']);
// Rute untuk autentikasi
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
    Route::get('/', [UserController::class, 'index']); // Menampilkan semua data user
    Route::post('/', [UserController::class, 'create']); // Menambahkan data user baru
    Route::put('/{id}', [UserController::class, 'update']); // Memperbarui data user berdasarkan ID
    Route::get('/{id}', [UserController::class, 'show']); // Mengambil data user berdasarkan ID
    Route::delete('/{id}', [UserController::class, 'destroy']); // Menghapus data user berdasarkan ID
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
    Route::put('/{id}', [SettingController::class, 'edit']);
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
    Route::get('/residents/non-active', [ResidentController::class, 'getNonActiveResidents']);
    Route::get('/residents/active', [ResidentController::class, 'getActiveResidents']);
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
    Route::put('/{id}', [SettingController::class, 'edit']);
    Route::delete('/{id}', [SettingController::class, 'destroy']);
});

// Route untuk PaymentController
Route::prefix('payments')->group(function () {
    Route::get('/', [PaymentController::class, 'index']);
    Route::post('/', [PaymentController::class, 'create']);
    Route::get('/{id}', [PaymentController::class, 'show']);
    Route::put('/{id}', [PaymentController::class, 'update']);
    Route::delete('/{id}', [PaymentController::class, 'destroy']);
});


Route::middleware('auth:api')->group(function () {
    // Get all expenses
    Route::get('/expenses', [ExpenseController::class, 'index']);
    
    // Get expense by ID
    Route::get('/expenses/{id}', [ExpenseController::class, 'getExpenseById']);
    
    // Store new expense
    Route::post('/expenses', [ExpenseController::class, 'store']);
    
    // Update existing expense
    Route::put('/expenses/{id}', [ExpenseController::class, 'update']);
    
    // Delete expense by ID
    Route::delete('/expenses/{id}', [ExpenseController::class, 'delete']);
});



Route::get('/invoice/{id}', [InvoiceController::class, 'printInvoice']);
