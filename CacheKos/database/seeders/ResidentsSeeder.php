<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use DB;

class ResidentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('residents')->insert([

            'jenis_sewa_kamar' => 1,
            'id_kamar' => 1,
            'nama_penghuni' => 'John Doe',
            'no_handphone' => '081234567890',
            'jenis_kelamin' => true, // true untuk laki-laki, false untuk perempuan
            'no_ktp' => '1234567890123456',
            'foto_ktp' => 'ktp_john_doe.jpg',
            'status_penghuni' => 1, // contoh status 1: aktif, 0: tidak aktif
            'pekerjaan' => 2, // contoh pekerjaan 2: pegawai
            'jumlah_penghuni' => 1,
            'lama_sewa' => '365',
            'tanggal_masuk' => '2024-01-15',
            'keterangan' => 'Penghuni baru',
            'status_sewa' => 1, // contoh status sewa 1: aktif
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

        ]);
    }
}
