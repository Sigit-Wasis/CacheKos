<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request; // Import the Request class
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function index()
    {
        // Mengambil data dengan kolom tertentu di tabel 'payments'
        $payments = DB::table('payments')->select(
            'id',
            'invoice',
            'jumlah_bayar',
            'status',
            'tanggal',
            'id_resident',
            'keterangan',
            'kurang_bayar',
            'grand_total',
            'bukti_bayar',
            'created_by',
            'updated_by'
        )->get();

        // Menampilkan data dari variabel
        return response()->json([
            'message' => 'Data payments berhasil diambil',
            'code' => 200,
            'data' => $payments
        ]);
    }

    public function create(Request $request)
    {
        // Validasi data yang diterima dari request
        $validatedData = $request->validate([
            'invoice' => 'required|string|max:255',
            'jumlah_bayar' => 'required|numeric',
            'status' => 'required|string|max:50',
            'tanggal' => 'required|date',
            'id_resident' => 'required|integer',
            'keterangan' => 'nullable|string',
            'kurang_bayar' => 'nullable|numeric',
            'grand_total' => 'required|numeric',
            'bukti_bayar' => 'nullable|string',
            'created_by' => 'required|string|max:100',
            'updated_by' => 'nullable|string|max:100',
        ]);

        // Insert data into the payments table
        $inserted = DB::table('payments')->insert($validatedData);

        if ($inserted) {
            // Fetch the last inserted payment
            $newPayment = DB::table('payments')->latest()->first();

            return response()->json([
                'message' => 'Data payments berhasil ditambahkan',
                'code' => 201, // Use 201 for created
                'data' => $newPayment
            ]);
        } else {
            return response()->json([
                'message' => 'Data payments gagal ditambahkan',
                'code' => 500
            ]);
        }
    }
}
