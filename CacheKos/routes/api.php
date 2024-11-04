<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController; // Tambahkan ini
// use App\Http\Controllers\API\ResidentController; // Tambahkan ini

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


// Routes untuk tabel 'users' (UserController)
Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']); // Get all users
    Route::post('/', [UserController::class, 'create']); 
    Route::get('/{id}', [UserController::class, 'edit']); // Get a single user by ID for editing
    Route::put('/{id}', [UserController::class, 'update']); // Mengupdate data pengguna berdasarkan
    Route::delete('users/{id}', [UserController::class, 'delete']);

    
    
});
 


// Route::prefix('residents')->group(function () {
//     Route::get('/', [ResidentController::class, 'index']); // Get all residents
//     Route::post('/', [ResidentController::class, 'store']); // Create a new resident
//     Route::get('/{id}', [ResidentController::class, 'show']); // Get a single resident by ID
//     Route::put('/{id}', [ResidentController::class, 'update']); // Update a resident by ID
// });