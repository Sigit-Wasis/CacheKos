<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('payments')->insert([
            [
               
                'invoice' => 'INV-001',
                'jumlah_bayar' => 500000,
                'status' => 'Lunas',
                'tanggal' => date('Y-m-d H:i:s'),
                'id_resident' => 1,
                'keterangan' => 'Pembayaran Bulanan',
                'kurang_bayar' => 0,
                'grand_total' => 500000,
                'bukti_bayar' => 'path/to/bukti_bayar1.jpg',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                
                'invoice' => 'INV-002',
                'jumlah_bayar' => 250000,
                'status' => 'Belum Lunas',
                'tanggal' => date('Y-m-d H:i:s'),
                'id_resident' => 1,
                'keterangan' => 'Pembayaran Bulanan Sebagian',
                'kurang_bayar' => 250000,
                'grand_total' => 500000,
                'bukti_bayar' => 'path/to/bukti_bayar2.jpg',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Tambahkan data lain jika diperlukan
        ]);
    }
}
