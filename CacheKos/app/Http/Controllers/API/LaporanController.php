<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Expense;
use DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Response;

class LaporanController extends Controller
{
    // Metode untuk laporan bulanan
    public function laporanBulanan()
    {
        $today = Carbon::now();

        // Pemasukan bulan ini
        $pemasukanBulanIni = Payment::whereYear('tanggal', $today->year)
            ->whereMonth('tanggal', $today->month)
            ->sum('jumlah_bayar');

        // Pengeluaran bulan ini
        $pengeluaranBulanIni = DB::table('expenses')
            ->whereYear('tanggal', $today->year)
            ->whereMonth('tanggal', $today->month)
            ->sum('nominal');

        // Hasil bulan ini (pemasukan - pengeluaran)
        $hasilBulanIni = $pemasukanBulanIni - $pengeluaranBulanIni;

        // Set tanggal untuk bulan lalu
        $lastMonth = $today->copy()->subMonth();

        // Pemasukan bulan lalu
        $pemasukanBulanLalu = Payment::whereYear('tanggal', $lastMonth->year)
            ->whereMonth('tanggal', $lastMonth->month)
            ->sum('jumlah_bayar');

        // Pengeluaran bulan lalu
        $pengeluaranBulanLalu = DB::table('expenses')
            ->whereYear('tanggal', $lastMonth->year)
            ->whereMonth('tanggal', $lastMonth->month)
            ->sum('nominal');

        // Hasil bulan lalu (pemasukan - pengeluaran)
        $hasilBulanLalu = $pemasukanBulanLalu - $pengeluaranBulanLalu;

        return response()->json([
            'message' => 'Laporan bulanan berhasil diambil',
            'code' => 200,
            'data' => [
                'bulan_ini' => [
                    'pemasukan' => $pemasukanBulanIni,
                    'pengeluaran' => $pengeluaranBulanIni,
                    'hasil' => $hasilBulanIni,
                ],
                'bulan_lalu' => [
                    'pemasukan' => $pemasukanBulanLalu,
                    'pengeluaran' => $pengeluaranBulanLalu,
                    'hasil' => $hasilBulanLalu,
                ]
            ]
        ]);
    }

    // Metode untuk cetak laporan bulanan
    public function CetakLaporanBulanan($bulan = 'lalu')
    {
        // Menentukan tanggal awal dan akhir berdasarkan parameter bulan
        if ($bulan == 'ini') {
            // Tanggal untuk bulan ini
            $tanggalAwal = Carbon::now()->startOfMonth();  // Awal bulan ini
            $tanggalAkhir = Carbon::now()->endOfMonth();   // Akhir bulan ini
        } else {
            // Tanggal untuk bulan lalu
            $tanggalAwal = Carbon::now()->subMonth()->startOfMonth();  // Awal bulan lalu
            $tanggalAkhir = Carbon::now()->subMonth()->endOfMonth();   // Akhir bulan lalu
        }
    
        // Mengambil data payment sebagai pemasukan untuk bulan yang dipilih
        $payments = Payment::whereBetween('tanggal', [$tanggalAwal, $tanggalAkhir])
                    ->select('keterangan', 'grand_total as nominal', 'tanggal')
                    ->get()
                    ->map(function ($item) {
                        $item->kategori = 'pemasukan'; // Menambahkan kategori pemasukan
                        return $item;
                    });
    
        // Mengambil data expense sebagai pengeluaran untuk bulan yang dipilih
        $expenses = Expense::whereBetween('tanggal', [$tanggalAwal, $tanggalAkhir])
                    ->select('keterangan', 'nominal', 'tanggal')
                    ->get()
                    ->map(function ($item) {
                        $item->kategori = 'pengeluaran'; // Menambahkan kategori pengeluaran
                        return $item;
                    });
    
        // Menggabungkan kedua hasil query
        $laporanBulanan = $payments->concat($expenses);
    
        // Mengurutkan hasil berdasarkan tanggal
        $laporanBulanan = $laporanBulanan->sortBy('tanggal')->values();
    
        return response()->json([
            'message' => 'Laporan berhasil diambil untuk bulan ' . ($bulan == 'ini' ? 'ini' : 'lalu'),
            'code' => 200,
            'data' => $laporanBulanan
        ]);
    }
    
// tahunan
    public function CetakLaporanTahunan($tahun = 'lalu')
    {
        // Menentukan tahun berdasarkan parameter yang diberikan
        if ($tahun == 'ini') {
            // Tahun ini
            $tahunYangDipilih = Carbon::now()->year;
        } else {
            // Tahun lalu
            $tahunYangDipilih = Carbon::now()->subYear()->year;
        }
    
        // Menentukan tanggal awal dan akhir tahun yang dipilih
        $tanggalAwal = Carbon::createFromDate($tahunYangDipilih, 1, 1)->startOfYear();  // Awal tahun
        $tanggalAkhir = Carbon::createFromDate($tahunYangDipilih, 12, 31)->endOfYear();   // Akhir tahun
        
        // Mengambil data payment sebagai pemasukan untuk tahun yang dipilih
        $payments = Payment::whereBetween('tanggal', [$tanggalAwal, $tanggalAkhir])
                    ->select('keterangan', 'grand_total as nominal', 'tanggal')
                    ->get()
                    ->map(function ($item) {
                        $item->kategori = 'pemasukan'; // Menambahkan kategori pemasukan
                        return $item;
                    });
    
        // Mengambil data expense sebagai pengeluaran untuk tahun yang dipilih
        $expenses = Expense::whereBetween('tanggal', [$tanggalAwal, $tanggalAkhir])
                    ->select('keterangan', 'nominal', 'tanggal')
                    ->get()
                    ->map(function ($item) {
                        $item->kategori = 'pengeluaran'; // Menambahkan kategori pengeluaran
                        return $item;
                    });
    
        // Menggabungkan kedua hasil query
        $laporanTahunan = $payments->concat($expenses);
    
        // Mengurutkan hasil berdasarkan tanggal
        $laporanTahunan = $laporanTahunan->sortBy('tanggal')->values();
    
        return response()->json([
            'message' => 'Laporan berhasil diambil untuk tahun ' . ($tahun == 'ini' ? 'ini' : 'lalu'),
            'code' => 200,
            'data' => $laporanTahunan
        ]);
    }
    
    public function laporanTahunan()
    {
        $today = Carbon::now();
        
        // Pemasukan tahun ini
        $pemasukanTahunIni = Payment::whereYear('tanggal', $today->year)
            ->sum('jumlah_bayar');
    
        // Pengeluaran tahun ini
        $pengeluaranTahunIni = DB::table('expenses')
            ->whereYear('tanggal', $today->year)
            ->sum('nominal');
    
        // Hasil tahun ini (pemasukan - pengeluaran)
        $hasilTahunIni = $pemasukanTahunIni - $pengeluaranTahunIni;
    
        // Set tahun lalu
        $lastYear = $today->copy()->subYear();
    
        // Pemasukan tahun lalu
        $pemasukanTahunLalu = Payment::whereYear('tanggal', $lastYear->year)
            ->sum('jumlah_bayar');
    
        // Pengeluaran tahun lalu
        $pengeluaranTahunLalu = DB::table('expenses')
            ->whereYear('tanggal', $lastYear->year)
            ->sum('nominal');
    
        // Hasil tahun lalu (pemasukan - pengeluaran)
        $hasilTahunLalu = $pemasukanTahunLalu - $pengeluaranTahunLalu;
    
        return response()->json([
            'message' => 'Laporan tahunan berhasil diambil',
            'code' => 200,
            'data' => [
                'tahun_ini' => [
                    'pemasukan' => $pemasukanTahunIni,
                    'pengeluaran' => $pengeluaranTahunIni,
                    'hasil' => $hasilTahunIni,
                ],
                'tahun_lalu' => [
                    'pemasukan' => $pemasukanTahunLalu,
                    'pengeluaran' => $pengeluaranTahunLalu,
                    'hasil' => $hasilTahunLalu,
                ]
            ]
        ]);
    }
    




    // Metode untuk laporan dengan rentang tanggal khusus
    public function laporanCustomRange(Request $request)
    {
        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);

        // Pemasukan dalam rentang tanggal
        $pemasukan = Payment::whereBetween('tanggal', [$startDate, $endDate])
            ->sum('jumlah_bayar');

        // Pengeluaran dalam rentang tanggal
        $pengeluaran = DB::table('expenses')
            ->whereBetween('tanggal', [$startDate, $endDate])
            ->sum('nominal');

        // Hasil (pemasukan - pengeluaran)
        $hasil = $pemasukan - $pengeluaran;

        return response()->json([
            'message' => 'Laporan custom range berhasil diambil',
            'code' => 200,
            'data' => [
                'pemasukan' => $pemasukan,
                'pengeluaran' => $pengeluaran,
                'hasil' => $hasil,
            ]
        ]);
    }
}
