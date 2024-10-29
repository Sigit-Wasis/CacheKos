<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pengeluaran'); // Menyimpan nama pengeluaran
            $table->text('keterangan')->nullable(); // Menyimpan keterangan, bisa null
            $table->date('tanggal'); // Menyimpan tanggal pengeluaran
            $table->float('nominal', 8, 2); // Menyimpan nominal sebagai float dengan 2 desimal
            $table->unsignedBigInteger('created_by'); // Menyimpan ID pembuat
            $table->unsignedBigInteger('updated_by')->nullable(); // Menyimpan ID pengupdate, bisa null
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
