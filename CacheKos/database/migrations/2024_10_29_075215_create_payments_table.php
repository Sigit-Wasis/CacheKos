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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('invoice')->unique(); // Nomor faktur unik
            $table->float('jumlah_bayar'); // Jumlah yang dibayarkan
            $table->string('status'); // Status pembayaran, misalnya "paid", "unpaid"
            $table->date('tanggal'); // Tanggal pembayaran
            $table->unsignedBigInteger('id_resident'); // ID untuk resident yang melakukan pembayaran
            $table->text('keterangan')->nullable(); // Keterangan tambahan
            $table->float('kurang_bayar')->nullable(); // Sisa pembayaran jika ada
            $table->float('grand_total'); // Total akhir
            $table->string('bukti_bayar')->nullable(); // File bukti bayar, path atau URL
            $table->unsignedBigInteger('created_by'); // ID user yang membuat record
            $table->unsignedBigInteger('updated_by')->nullable(); // ID user yang mengubah record
            $table->timestamps();

            // Menambahkan foreign key jika ada referensi ke tabel lain
            // Misalnya jika created_by dan updated_by adalah id dari tabel users
            $table->foreign('id_resident')->references('id')->on('resident')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
