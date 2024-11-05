<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
}
