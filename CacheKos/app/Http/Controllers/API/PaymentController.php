<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Resident;


class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::select(
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

        return response()->json([
            'message' => 'Data payments berhasil diambil',
            'code' => 200,
            'data' => $payments
        ]);
    }

    public function store(Request $request)
{
    $validatedData = $request->validate([
        'invoice' => 'required|string|max:255',
        'jumlah_bayar' => 'required|numeric',
        'status' => 'required|string|max:50',
        'tanggal' => 'required|date',
        'id_resident' => 'required|integer', // Pastikan id_resident valid
        'keterangan' => 'nullable|string',
        'kurang_bayar' => 'nullable|numeric',
        'grand_total' => 'required|numeric',
        'bukti_bayar' => 'nullable|string',
        'created_by' => 'required|integer',
        'updated_by' => 'nullable|integer',
    ]);

    // Pastikan id_resident yang diterima ada di tabel residents
    $resident = Resident::find($validatedData['id_resident']);
    if (!$resident) {
        return response()->json([
            'message' => 'Resident tidak ditemukan.',
        ], 400);
    }

    $newPayment = Payment::create($validatedData);

    return response()->json([
        'message' => 'Data payments berhasil ditambahkan',
        'code' => 201,
        'data' => $newPayment
    ]);
}


    public function update(Request $request, $id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        $validatedData = $request->validate([
            'invoice' => 'required|string',
            'jumlah_bayar' => 'required|numeric',
            'status' => 'required|string',
            'tanggal' => 'required|date',
            'keterangan' => 'nullable|string',
            'kurang_bayar' => 'required|numeric',
            'grand_total' => 'required|numeric',
            'bukti_bayar' => 'nullable|string',
            'updated_by' => 'nullable|integer',
        ]);

        $payment->update($validatedData);

        return response()->json([
            'message' => 'Payment updated successfully',
            'data' => $payment
        ]);
    }

    public function show($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json([
                'message' => 'Data payment tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'message' => 'Data payment berhasil dimuat.',
            'data' => $payment
        ], 200);
    }

    public function destroy($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json([
                'message' => 'Pembayaran tidak ditemukan.',
            ], 404);
        }

        $payment->delete();

        return response()->json([
            'message' => 'Data payments berhasil dihapus',
            'code' => 200
        ]);
    }
}
