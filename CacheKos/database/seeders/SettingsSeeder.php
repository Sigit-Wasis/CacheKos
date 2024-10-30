<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('settings')->insert([
            'nama_kost' => 'Cache Kost',
            'alamat' => 'Jl. Mawar No. 123, Jakarta',
            'telepon' => '081234567890',
            'email' => 'info@kostadel.com',
            'deskripsi' => 'Kost nyaman dengan fasilitas lengkap di Jakarta.',
            'logo' => 'logo.png',
            'tenggang_waktu' => 7,
            'biaya_terlambat' => 50000,
            'facebook' => 'https://facebook.com/kostadel',
            'instagram' => 'https://instagram.com/kostadel',
            'tiktok' => 'https://tiktok.com/@kostadel',



            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
