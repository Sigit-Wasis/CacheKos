<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomSeeder extends Seeder
{
    public function run()
    {
        DB::table('room')->insert([
            [
                'nama_kamar' => 'Kamar Deluxe',
                'nomor_kamar' => '101',
                'harga_per_bulan' => 1500000,
                'harga_per_hari' => 100000,
                'fasilitas' => 'AC, Wi-Fi, TV, Kamar Mandi Dalam',
                'kelengkapan_lain' => 'Lemari Pakaian, Meja Kerja',
                'catatan_kamar' => 'Tersedia balkon',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_kamar' => 'Kamar Standar',
                'nomor_kamar' => '102',
                'harga_per_bulan' => 1200000,
                'harga_per_hari' => 80000,
                'fasilitas' => 'Wi-Fi, Kipas Angin, Kamar Mandi Luar',
                'kelengkapan_lain' => 'Meja Belajar, Rak Sepatu',
                'catatan_kamar' => 'Dekat dengan ruang bersama',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_kamar' => 'Kamar Ekonomi',
                'nomor_kamar' => '103',
                'harga_per_bulan' => 1000000,
                'harga_per_hari' => 70000,
                'fasilitas' => 'Kipas Angin, Wi-Fi',
                'kelengkapan_lain' => 'Meja Lipat, Rak Sepatu',
                'catatan_kamar' => 'Dekat dengan dapur umum',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
