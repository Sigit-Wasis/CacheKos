<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
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
        dd($payments);
    }
}
