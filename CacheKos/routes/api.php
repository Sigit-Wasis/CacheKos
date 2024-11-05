<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController; // Mengimpor AuthController
use App\Http\Controllers\Api\RoomController; // Mengimpor RoomController
// use App\Http\Controllers\Api\ResidentController; // Mengimpor ResidentController jika diperlukan

/*
|---------------------------------------------------------------------------
| API Routes
|---------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Rute untuk autentikasi
Route::post('/login', [AuthController::class, 'login']);

// Rute untuk logout
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


// Rute untuk mendapatkan informasi pengguna yang terautentikasi
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//logout
// Route::post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
// Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
//     $request->user()->currentAccessToken()->delete();
//     return response()->json(['message' => 'Logged out successfully']);
// });
/******  8d190a1e-7df7-4c22-828d-dbf41e93af5b  *******/



// Route untuk RoomController
Route::prefix('rooms')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [RoomController::class, 'index']); // Menampilkan semua data kamar
    Route::post('/', [RoomController::class, 'create']); // Menambahkan data kamar baru
    Route::put('/{id}', [RoomController::class, 'edit']); // Memperbarui data kamar berdasarkan ID
    Route ::get('/{id}', [RoomController::class, 'show']); // Mengambil data kamar berdasarkan ID
    Route::delete('/{id}', [RoomController::class, 'destroy']); // Menghapus data kamar berdasarkan 
   
});

// Rute untuk ResidentController (jika diperlukan)
// Route::prefix('residents')->middleware('auth:sanctum')->group(function () {
//     Route::get('/', [ResidentController::class, 'index']); // Mendapatkan semua resident
//     Route::post('/', [ResidentController::class, 'store']); // Membuat resident baru
//     Route::get('/{id}', [ResidentController::class, 'show']); // Mendapatkan resident berdasarkan ID
//     Route::put('/{id}', [ResidentController::class, 'update']); // Memperbarui resident berdasarkan ID
//     Route::delete('/{id}', [ResidentController::class, 'destroy']); // Menghapus resident berdasarkan ID
// });

<<<<<<< HEAD
// Route untuk SettingController
Route::prefix('settings')->group(function () {
    Route::get('/', [SettingController::class, 'index']);
    Route::post('/', [SettingController::class, 'store']);
    Route::get('/{id}', [SettingController::class, 'show']);
    Route::put('/{id}', [SettingController::class, 'update']);
    Route::delete('/{id}', [SettingController::class, 'destroy']);
    

});
=======
//route setting
Route:: prefix ('settings')->group(function () {
Route:: get ('/', [SettingController::class, 'index']);
Route:: post ('/', [SettingController::class, 'store']);
Route:: get ('/{id}', [SettingController::class, 'show']);
Route:: put ('/{id}', [SettingController::class, 'update']);
Route:: delete ('/{id}', [SettingController::class, 'destroy']);
});



>>>>>>> 0d40ded35eda51db9faa8e84af472b6d400a994e
