<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
<<<<<<< HEAD
use App\Http\Controllers\API\SettingController;

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
=======
use App\Http\Controllers\API\RoomController;
// use App\Http\Controllers\API\ResidentController;
>>>>>>> c1da4b1d2e9328deacb710ab173dc23d9e17e2e5

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

<<<<<<< HEAD
=======
// Route untuk RoomController
Route::prefix('rooms')->group(function () {
    Route::get('/', [RoomController::class, 'index']); // Menampilkan semua data kamar
    Route::post('/', [RoomController::class, 'create']); // Menambahkan data kamar baru
});

// Route untuk ResidentController
>>>>>>> c1da4b1d2e9328deacb710ab173dc23d9e17e2e5
// Route::prefix('residents')->group(function () {
//     Route::get('/', [ResidentController::class, 'index']); // Get all residents
//     Route::post('/', [ResidentController::class, 'store']); // Create a new resident
//     Route::get('/{id}', [ResidentController::class, 'show']); // Get a single resident by ID
//     Route::put('/{id}', [ResidentController::class, 'update']); // Update a resident by ID
//     Route::delete('/{id}', [ResidentController::class, 'destroy']); // Delete a resident by ID
// });
<<<<<<< HEAD

Route::prefix('settings')->group(function () {
    Route::get('/', [SettingController::class, 'index']);
    Route::post('/', [SettingController::class, 'store']);
    Route::get('/{id}', [SettingController::class, 'show']);
    Route::put('/{id}', [SettingController::class, 'update']);
    Route::delete('/{id}', [SettingController::class, 'destroy']);
});
=======
>>>>>>> c1da4b1d2e9328deacb710ab173dc23d9e17e2e5
