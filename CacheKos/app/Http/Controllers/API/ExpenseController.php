<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Expense;

class ExpenseController extends Controller
{
    // Fungsi untuk mengambil semua data pengeluaran
    public function index()
    {
        $expenses = Expense::all();

        return response()->json([
            'message' => 'Berhasil mengambil data expenses',
            'data' => $expenses,
            'code' => 200
        ], 200);
    }

    // Fungsi untuk mengambil data pengeluaran berdasarkan ID
    public function getExpenseById($id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json([
                'message' => 'Data pengeluaran tidak ditemukan',
                'code' => 404
            ], 404);
        }

        return response()->json([
            'message' => 'Berhasil mengambil data expense',
            'data' => $expense,
            'code' => 200
        ], 200);
    }

    // Fungsi untuk menghapus data pengeluaran berdasarkan ID
    public function delete($id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json([
                'message' => 'Data pengeluaran tidak ditemukan',
                'code' => 404
            ], 404);
        }

        $expense->delete();

        return response()->json([
            'message' => 'Berhasil menghapus data expense',
            'alert' => 'Data pengeluaran berhasil dihapus!',
            'code' => 200
        ], 200);
    }

    // Fungsi untuk menambah data pengeluaran
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'keterangan' => 'required|string|max:255',
            'nama_pengeluaran' => 'required|string|max:255',
            'nominal' => 'required|numeric',
            'tanggal' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
                'code' => 422
            ], 422);
        }

        $expense = Expense::create([
            'keterangan' => $request->keterangan,
            'nama_pengeluaran' => $request->nama_pengeluaran,
            'nominal' => $request->nominal,
            'tanggal' => $request->tanggal,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'Berhasil menambah data expense',
            'alert' => 'Data pengeluaran berhasil ditambahkan!',
            'expense' => $expense,
            'code' => 201
        ], 201);
    }

    // Fungsi untuk memperbarui data pengeluaran berdasarkan ID
    public function update(Request $request, $id)
    {
        $expense = Expense::findOrFail($id);
        $expense->update($request->all());

        return response()->json([
            'message' => 'Data berhasil diperbarui',
            'alert' => 'Data pengeluaran berhasil diperbarui!',
            'data' => $expense,
            'code' => 200
        ], 200);
    }
}
