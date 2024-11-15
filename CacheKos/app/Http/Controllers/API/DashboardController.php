<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // Count of filled and empty rooms
        $totalkamarterisi = DB::table('rooms')
            ->join('residents', 'rooms.id', '=', 'residents.id_kamar')
            ->where('status_sewa', 1)
            ->count();

        $totalkamarkosong = DB::table('rooms')
            ->join('residents', 'rooms.id', '=', 'residents.id_kamar')
            ->where('status_sewa', 0)
            ->count();

        // Total income and expenses
        $totalpemasukan = DB::table('payments')->sum('jumlah_bayar');
        $totalpengeluaran = DB::table('expenses')->sum('nominal');

        // Monthly income and expenses
        $monthlyIncome = DB::table('payments')
            ->select(DB::raw('MONTH(tanggal) as month'), DB::raw('SUM(jumlah_bayar) as total'))
            ->groupBy('month')
            ->pluck('total', 'month');

        $monthlyExpenses = DB::table('expenses')
            ->select(DB::raw('MONTH(tanggal) as month'), DB::raw('SUM(nominal) as total'))
            ->groupBy('month')
            ->pluck('total', 'month');

        // Notifikasi peringatan masa sewa habis
        $tanggalSekarang = Carbon::now();
        $batasAkhirSewa = $tanggalSekarang->copy()->addDays(7); // 30 hari dari hari ini

        $sewaHampirHabis = DB::table('residents')
            ->select('nama_penghuni', 'tanggal_masuk', 'lama_sewa', 'id_kamar')
            ->whereRaw("DATE_ADD(tanggal_masuk, INTERVAL lama_sewa MONTH) BETWEEN ? AND ?", [$tanggalSekarang, $batasAkhirSewa])
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Berhasil mengambil data dashboard',
            'data' => [
                "total_kamar_terisi" => $totalkamarterisi,
                "total_kamar_kosong" => $totalkamarkosong,
                "total_pemasukan" => $totalpemasukan,
                "total_pengeluaran" => $totalpengeluaran,
                "monthly_income" => $monthlyIncome,
                "monthly_expenses" => $monthlyExpenses,
                "sewa_hampir_habis" => $sewaHampirHabis, // Notifikasi masa sewa hampir habis
            ]
        ], 200);
    }
}
