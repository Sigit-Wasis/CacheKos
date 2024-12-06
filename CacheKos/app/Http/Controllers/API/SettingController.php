<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * @OA\Info(
 *     title="API Documentation",
 *     version="1.0.0",
 *     description="API untuk mengelola room settings",
 * )
 */
class SettingController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/setting",
     *     summary="Mendapatkan semua data room settings",
     *     tags={"Settings"},
     *     @OA\Response(
     *         response=200,
     *         description="Berhasil mengambil data room settings",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Berhasil mengambil data room settings"),
     *             @OA\Property(property="data", type="array", 
     *                 @OA\Items(
     *                     @OA\Property(property="nama_kost", type="string"),
     *                     @OA\Property(property="alamat", type="string"),
     *                     @OA\Property(property="telepon", type="string"),
     *                     @OA\Property(property="email", type="string"),
     *                     @OA\Property(property="deskripsi", type="string"),
     *                     @OA\Property(property="logo", type="string"),
     *                     @OA\Property(property="tenggang_waktu", type="integer"),
     *                     @OA\Property(property="biaya_terlambat", type="number"),
     *                     @OA\Property(property="facebook", type="string"),
     *                     @OA\Property(property="instagram", type="string"),
     *                     @OA\Property(property="tiktok", type="string")
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        $room_settings = DB::table('room_settings')->select(
            'nama_kost', 'alamat', 'telepon', 'email', 'deskripsi', 'logo', 
            'tenggang_waktu', 'biaya_terlambat', 'facebook', 'instagram', 'tiktok'
        )->get();

        return response()->json([
            'success' => true,
            'message' => 'Berhasil mengambil data room settings',
            'data' => $room_settings
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/setting",
     *     summary="Menambahkan data room setting baru",
     *     tags={"Settings"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nama_kost", "alamat", "telepon", "email", "tenggang_waktu", "biaya_terlambat"},
     *             @OA\Property(property="nama_kost", type="string"),
     *             @OA\Property(property="alamat", type="string"),
     *             @OA\Property(property="telepon", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="deskripsi", type="string"),
     *             @OA\Property(property="logo", type="string"),
     *             @OA\Property(property="tenggang_waktu", type="integer"),
     *             @OA\Property(property="biaya_terlambat", type="number"),
     *             @OA\Property(property="facebook", type="string"),
     *             @OA\Property(property="instagram", type="string"),
     *             @OA\Property(property="tiktok", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Data room setting berhasil ditambahkan",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Data room setting berhasil ditambahkan"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        // Validasi data
        $validatedData = $request->validate([
            'nama_kost' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'telepon' => 'required|string|max:15',
            'email' => 'required|email|max:255',
            'deskripsi' => 'nullable|string',
            'logo' => 'nullable|string|max:255',
            'tenggang_waktu' => 'required|integer',
            'biaya_terlambat' => 'required|numeric',
            'facebook' => 'nullable|url|max:255',
            'instagram' => 'nullable|url|max:255',
            'tiktok' => 'nullable|url|max:255',
        ]);

        $newSetting = DB::table('room_settings')->insertGetId($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Data room setting berhasil ditambahkan',
            'data' => $validatedData
        ], 201);
        
    }


    //swagger edit
    /**
     * @OA\Put(
     *     path="/api/setting/{id}",
     *     summary="Mengubah data room setting",
     *     tags={"Settings"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID room setting",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="nama_kost", type="string"),
     *             @OA\Property(property="alamat", type="string"),
     *             @OA\Property(property="telepon", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="deskripsi", type="string"),
     *             @OA\Property(property="logo", type="string"),
     *             @OA\Property(property="tenggang_waktu", type="integer"),
     *             @OA\Property(property="biaya_terlambat", type="number"),
     *             @OA\Property(property="facebook", type="string"),
     *             @OA\Property(property="instagram", type="string"),
     *             @OA\Property(property="tiktok", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Data room setting berhasil diubah",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Data room setting berhasil diubah"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function edit(Request $request, $id)
    {
        // Validasi data
        $validatedData = $request->validate([
            'nama_kost' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'telepon' => 'required|string|max:15',
            'email' => 'required|email|max:255',
            'deskripsi' => 'nullable|string',
            'logo' => 'nullable|string|max:255',
            'tenggang_waktu' => 'required|integer',
            'biaya_terlambat' => 'required|numeric',
            'facebook' => 'nullable|url|max:255',
            'instagram' => 'nullable|url|max:255',
            'tiktok' => 'nullable|url|max:255',
        ]);

        $updatedSetting = DB::table('room_settings')        
        ->where('id', $id)
        ->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Data room setting berhasil diubah',
            'data' => $validatedData
        ], 200);
    }
     
     
    // Anda dapat menambahkan anotasi Swagger untuk edit dan delete sesuai dengan cara di atas
}
