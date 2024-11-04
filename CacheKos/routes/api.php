<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ResidentController;

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

// Route to get authenticated user details
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Group routes for residents with Sanctum authentication
Route::middleware('auth:sanctum')->prefix('residents')->group(function () {
    Route::get('/', [ResidentController::class, 'index']);       // Get all residents
    Route::post('/', [ResidentController::class, 'store']);      // Create a new resident
    Route::get('/{id}', [ResidentController::class, 'show']);    // Get a single resident by ID
    Route::put('/{id}', [ResidentController::class, 'update']);  // Update a resident by ID
    Route::delete('/{id}', [ResidentController::class, 'delete']); // Delete a resident by ID
});
