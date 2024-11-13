<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\ResidentController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ExpenseController; // Mengimpor ExpenseController

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Here is where you can register API routes for your application. 
| These routes are loaded by the RouteServiceProvider within a group 
| which is assigned the "api" middleware group. Enjoy building your API!
|--------------------------------------------------------------------------
*/

// Rute untuk autentikasi
Route::post('/login', [AuthController::class, 'login']);

// Rute untuk mendapatkan informasi pengguna yang terautentikasi
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Logout
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Group route untuk yang membutuhkan autentikasi
Route::middleware('auth:sanctum')->group(function () {

    // Route untuk RoomController
    Route::prefix('rooms')->group(function () {
        Route::get('/', [RoomController::class, 'index']);
        Route::post('/', [RoomController::class, 'create']);
        Route::put('/{id}', [RoomController::class, 'edit']);
        Route::get('/{id}', [RoomController::class, 'show']);
        Route::delete('/{id}', [RoomController::class, 'destroy']);
    });

    // Route untuk ResidentController
    Route::prefix('residents')->group(function () {
        Route::get('/', [ResidentController::class, 'index']);
        Route::post('/', [ResidentController::class, 'store']);
        Route::get('/{id}', [ResidentController::class, 'show']);
        Route::put('/{id}', [ResidentController::class, 'update']);
        Route::delete('/{id}', [ResidentController::class, 'destroy']);
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

    // Route untuk ExpenseController
    Route::prefix('expenses')->group(function () {
        Route::get('/', [ExpenseController::class, 'index']); // Mendapatkan semua expenses
        Route::post('/', [ExpenseController::class, 'store']); // Membuat expense baru
        Route::get('/{id}', [ExpenseController::class, 'show']); // Mendapatkan expense berdasarkan ID
        Route::put('/{id}', [ExpenseController::class, 'update']); // Memperbarui expense berdasarkan ID
        Route::delete('/{id}', [ExpenseController::class, 'delete']); // Menghapus expense berdasarkan ID
    });


});
