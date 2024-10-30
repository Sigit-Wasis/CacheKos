<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // Pastikan Anda mengimpor DB
use Carbon\Carbon;

class ExpensesSeeder extends Seeder
{
    public function run()
    {
        DB::table('expenses')->insert([
            [
                'nama_pengeluaran' => 'Pembelian Alat Tulis',
                'keterangan' => 'Pembelian alat tulis kantor untuk kebutuhan harian',
                'tanggal' => Carbon::now()->subDays(10),
                'nominal' => 200000,
                'created_by' => 1, // Tambahkan kolom created_by
                'updated_by' => 1, // Tambahkan kolom updated_by
                'created_at' => now(), 
                'updated_at' => now(),
            ],
            [
                'nama_pengeluaran' => 'Tagihan Listrik',
                'keterangan' => 'Pembayaran tagihan listrik bulanan',
                'tanggal' => Carbon::now()->subDays(8),
                'nominal' => 450000,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(), 
                'updated_at' => now(),
            ],
            [
                'nama_pengeluaran' => 'Biaya Konsumsi Meeting',
                'keterangan' => 'Pengeluaran untuk konsumsi meeting bulanan',
                'tanggal' => Carbon::now()->subDays(5),
                'nominal' => 150000,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(), 
                'updated_at' => now(),
            ],
            [
                'nama_pengeluaran' => 'Biaya Transportasi',
                'keterangan' => 'Pengeluaran untuk transportasi harian operasional',
                'tanggal' => Carbon::now()->subDays(3),
                'nominal' => 100000,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(), 
                'updated_at' => now(),
            ],
            [
                'nama_pengeluaran' => 'Tagihan Internet',
                'keterangan' => 'Pembayaran tagihan internet bulanan',
                'tanggal' => Carbon::now()->subDays(2),
                'nominal' => 300000,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(), 
                'updated_at' => now(),
            ],
        ]);
    }
}
