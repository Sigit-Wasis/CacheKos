<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use DB;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    { 
        DB::table('users')->insert([
            [
                'username' => 'nida',
                'nama_lengkap' => 'nida alhasani',
                'alamat' => 'Jl. Tanggamus No.1, lampung',
                'email' => 'nida@gmail.com',
                'password' => Hash::make('password123'),
            ]  
        ]);
    }
}
