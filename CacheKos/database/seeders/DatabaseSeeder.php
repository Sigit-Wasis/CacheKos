<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(RoomSeeder::class);
        $this->call(ResidentsSeeder::class);
        $this->call(ExpensesSeeder::class);
        $this->call(PaymentsSeeder::class);
        $this->call(SettingsSeeder::class);
    }
}
