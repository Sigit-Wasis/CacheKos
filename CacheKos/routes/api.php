<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::prefix('residents')->group(function () {
//     Route::get('/', [ResidentController::class, 'index']); // Get all residents
//     Route::post('/', [ResidentController::class, 'store']); // Create a new resident
//     Route::get('/{id}', [ResidentController::class, 'show']); // Get a single resident by ID
//     Route::put('/{id}', [ResidentController::class, 'update']); // Update a resident by ID
//     Route::delete('/{id}', [ResidentController::class, 'destroy']); // Delete a resident by ID
// });

Route::prefix('settings')->group(function () {
    Route::get('/', [SettingController::class, 'index']);
    Route::post('/', [SettingController::class, 'store']);
    Route::get('/{id}', [SettingController::class, 'show']);
    Route::put('/{id}', [SettingController::class, 'update']);
    Route::delete('/{id}', [SettingController::class, 'destroy']);
});
