<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;

class ResidentController extends Controller
{
    public function index()
    {
        // untuk mengambil semua data di table contohs disimpan di dalam variabel $contohs
        $residents = DB::table('residents')->get();

        
        return response()->json([
            'message' => 'Your success or error message here',
            'code' => 200, // or other appropriate HTTP status code
            'data' => $residents // data you want to send, e.g., an array or object
        ], 200); // The second parameter here is the HTTP status code
    }

    public function store(Request $request)
    {

        // Menyimpan data ke tabel residents
        $residentId = DB::table('residents')->insertGetId([
            'jenis_sewa_kamar' => $request->jenis_sewa_kamar,
            'id_kamar' => $request->id_kamar,
            'nama_penghuni' => $request->nama_penghuni,
            'no_handphone' => $request->no_handphone,
            'jenis_kelamin' => $request->jenis_kelamin,
            'no_ktp' => $request->no_ktp,
            'foto_ktp'=> $request->foto_ktp,
            'status_penghuni' => $request->status_penghuni,
            'pekerjaan' => $request->pekerjaan,
            'jumlah_penghuni' => $request->jumlah_penghuni,
            'lama_sewa' => $request->lama_sewa,
            'tanggal_masuk' => $request->tanggal_masuk,
            'status_sewa' => $request->status_sewa,
            'keterangan' => $request->keterangan,
            'created_by' =>Auth::id() ?? 1,  // Ensure the user is authenticated
            'updated_by' =>Auth::id() ?? 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        if (!$residentId) {
            return response()->json(['message' => 'Failed to insert data'], 500);
        }
        return response()->json([
            'message' => 'Resident created successfully',
            'code' => 201,
            'data' => DB::table('residents')->where('id', $residentId)->first()
        ], 201);
    }           

    public function show($id)
    {
    // Retrieve the resident by ID
    $resident = DB::table('residents')->where('id', $id)->first();

    // Check if the resident exists
    if (!$resident) {
        return response()->json(['message' => 'Resident not found'], 404);
    }

    return response()->json([
        'message' => 'Resident retrieved successfully',
        'code' => 200,
        'data' => $resident
    ], 200);

    }


    public function update(Request $request, $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'jenis_sewa_kamar' => 'required|integer',        // smallint in database, integer validation
            'id_kamar' => 'required|integer',                // bigint in database, integer validation
            'nama_penghuni' => 'required|string|max:255',    // varchar(255), string validation with max length
            'no_handphone' => 'required|string|max:255',     // varchar(255), string validation with max length
            'jenis_kelamin' => 'required|boolean',           // tinyint(1) (usually treated as boolean)
            'no_ktp' => 'required|string|size:16',           // varchar(16), string with exact length
            'foto_ktp' => 'nullable|string|max:255',         // varchar(255), nullable
            'status_penghuni' => 'required|integer',         // smallint, integer validation
            'pekerjaan' => 'required|integer',               // smallint, integer validation
            'jumlah_penghuni' => 'required|integer',         // int, integer validation
            'lama_sewa' => 'required|integer',        // varchar(255), string with max length
            'tanggal_masuk' => 'required|date',              // date validation
            'keterangan' => 'nullable|string',               // text, nullable
            'status_sewa' => 'required|integer',             // smallint, integer validation
            'created_by' => 'required|integer',              // bigint, integer validation
            'updated_by' => 'required|integer',              // bigint, integer validation
        ]);
    
        // Update the resident data in the database
        $updated = DB::table('residents')->where('id', $id)->update([
            'jenis_sewa_kamar' => $validatedData['jenis_sewa_kamar'],
            'id_kamar' => $validatedData['id_kamar'],
            'nama_penghuni' => $validatedData['nama_penghuni'],
            'no_handphone' => $validatedData['no_handphone'],
            'jenis_kelamin' => $validatedData['jenis_kelamin'],
            'no_ktp' => $validatedData['no_ktp'],
            'foto_ktp' => $validatedData['foto_ktp'],
            'status_penghuni' => $validatedData['status_penghuni'],
            'pekerjaan' => $validatedData['pekerjaan'],
            'jumlah_penghuni' => $validatedData['jumlah_penghuni'],
            'lama_sewa' => $validatedData['lama_sewa'],
            'tanggal_masuk' => $validatedData['tanggal_masuk'],
            'status_sewa' => $validatedData['status_sewa'],
            'keterangan' => $validatedData['keterangan'],
            'updated_by' => $validatedData['updated_by'],  // Ensure the updated_by is taken from validated data
            'updated_at' => now(),
        ]);
    
        if ($updated) {
            return response()->json([
                'message' => 'Resident updated successfully',
                'code' => 200,
                'data' => DB::table('residents')->where('id', $id)->first()
            ], 200);
        }
    
        return response()->json(['message' => 'Failed to update resident or no changes made'], 400);
    }

    public function destroy($id)
    {
    // Check if the resident exists
    $resident = DB::table('residents')->where('id', $id)->first();

    if (!$resident) {
        return response()->json(['message' => 'Resident not found'], 404);
    }

    // Delete the resident record
    $deleted = DB::table('residents')->where('id', $id)->delete();

    if ($deleted) {
        return response()->json(['message' => 'Resident deleted successfully'], 200);
    }

    return response()->json(['message' => 'Failed to delete resident'], 400);
}

    


}