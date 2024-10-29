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
            $table->float('nominal'); // Menyimpan nominal sebagai float
            $table->unsignedBigInteger('created_by'); // Menyimpan ID pembuat
            $table->unsignedBigInteger('updated_by')->nullable(); // Menyimpan ID pengupdate, bisa null
            $table->timestamps();

            // Menambahkan foreign key jika ada referensi ke tabel lain
            // Misalnya jika created_by dan updated_by adalah id dari tabel users
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');
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
