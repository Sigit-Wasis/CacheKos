<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ExpenseController extends Controller
{
    // Fungsi untuk menghapus data pengeluaran berdasarkan ID
    public function delete($id)
    {
        // Cek apakah data pengeluaran dengan ID tersebut ada
        $expense = DB::table('expenses')->where('id', $id)->first();

        // Jika data tidak ditemukan, kembalikan respons error
        if (!$expense) {
            return response()->json([
                'message' => 'Data pengeluaran tidak ditemukan',
                'code' => 404
            ], 404);
        }

        // Hapus data pengeluaran
        DB::table('expenses')->where('id', $id)->delete();

        // Kembalikan respons berhasil menghapus
        return response()->json([
            'message' => 'Berhasil menghapus data expense',
            'code' => 200
        ], 200);
    }

    // Fungsi untuk menambah data pengeluaran
    public function create(Request $request)
    {
        // Validasi input data
        $validator = Validator::make($request->all(), [
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'date' => 'required|date',
        ]);

        // Jika validasi gagal, kembalikan respons error
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
                'code' => 422
            ], 422);
        }

        // Tambahkan data ke tabel expenses
        $expenseId = DB::table('expenses')->insertGetId([
            'description' => $request->description,
            'amount' => $request->amount,
            'date' => $request->date,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Kembalikan respons berhasil menambah
        return response()->json([
            'message' => 'Berhasil menambah data expense',
            'expense_id' => $expenseId,
            'code' => 201
        ], 201);
    }
}
