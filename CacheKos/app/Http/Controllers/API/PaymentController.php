<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Resident;


class PaymentController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/payments",
     *     summary="Get all payments",
     *     description="Retrieve all payments data",
     *     tags={"Payments"},
     *     @OA\Response(
     *         response=200,
     *         description="Successfully retrieved all payments",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Data payments berhasil diambil"),
     *             @OA\Property(property="code", type="integer", example=200),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="invoice", type="string"),
     *                     @OA\Property(property="jumlah_bayar", type="number", format="float"),
     *                     @OA\Property(property="status", type="string"),
     *                     @OA\Property(property="tanggal", type="string", format="date"),
     *                     @OA\Property(property="id_resident", type="integer"),
     *                     @OA\Property(property="keterangan", type="string", nullable=true),
     *                     @OA\Property(property="kurang_bayar", type="number", format="float", nullable=true),
     *                     @OA\Property(property="grand_total", type="number", format="float"),
     *                     @OA\Property(property="bukti_bayar", type="string", nullable=true),
     *                     @OA\Property(property="created_by", type="integer"),
     *                     @OA\Property(property="updated_by", type="integer", nullable=true)
     *                 )
     *             )
     *         )
     *     )
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/payments/{id}",
     *     summary="Get payment by ID",
     *     description="Retrieve a specific payment by its ID",
     *     tags={"Payments"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Payment ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successfully retrieved payment",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Data payment berhasil dimuat."),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Payment not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Data payment tidak ditemukan.")
     *         )
     *     )
     * )
     */
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

    /**
     * @OA\Delete(
     *     path="/api/payments/{id}",
     *     summary="Delete a payment",
     *     description="Delete a payment record by ID",
     *     tags={"Payments"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Payment ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successfully deleted payment",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Data payments berhasil dihapus"),
     *             @OA\Property(property="code", type="integer", example=200)
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Payment not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Pembayaran tidak ditemukan.")
     *         )
     *     )
     * )
     */
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