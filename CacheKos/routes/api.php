<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ContohController;
use App\Http\Controllers\API\ExpenseController;




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route untuk ExpenseController
Route::prefix('expenses')->group(function () {
    Route::get('/', [ExpenseController::class, 'index']); // Get all expenses
    Route::post('/', [ExpenseController::class, 'create']); // Create a new expense
    Route::get('/{id}', [ExpenseController::class, 'edit']); // Get a single expense by ID for editing
    Route::put('/{id}', [ExpenseController::class, 'update']); // Update an expense by ID
    Route::delete('/{id}', [ExpenseController::class, 'delete']);

});

// Route untuk ResidentController
// // Route::prefix('residen')->group(function () {
//     Route::get('/', [ResidentController::class, 'index']); // Get all residents
//     Route::post('/', [ResidentController::class, 'store']); // Create a new resident
//     Route::get('/{id}', [ResidentController::class, 'show']); // Get a single resident by ID
//     Route::put('/{id}', [ResidentController::class, 'update']); // Update a resident by ID
//     Route::delete('/{id}', [ResidentController::class, 'destroy']); // Delete a resident by ID
// });
