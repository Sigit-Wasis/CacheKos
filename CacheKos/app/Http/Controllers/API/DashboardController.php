<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class DashboardController extends Controller
{
    public function index()
    {
        $totalkamarterisi = DB::table('rooms')
        ->join('residents', 'rooms.id', '=', 'residents.id_kamar')
        ->where('status_sewa', 1)->count();

        $totalkamarkosong = DB::table('rooms')
        ->join('residents', 'rooms.id', '=', 'residents.id_kamar')
        ->where('status_sewa', 0)->count();

        $totalpemasukan = DB::table('payments')
            ->sum('jumlah_bayar');
        
        return response()->json([
            'success' => true,
            'message' => 'Berhasil mengambil data dashboard',
            'data' => [
                "total_kamar_terisi" => $totalkamarterisi,
                "total_kamar_kosong" => $totalkamarkosong,
                "total_pemasukan" => $totalpemasukan
            ]
        ], 200);
    }
}
