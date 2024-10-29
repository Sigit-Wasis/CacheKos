<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoomsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id(); 
            $table->string('nama_kamar'); 
            $table->string('nomor_kamar')->unique(); 
            $table->float('harga_per_bulan'); 
            $table->float('harga_per_hari');
            $table->text('fasilitas'); 
            $table->text('kelengkapan_lain'); 
            $table->text('catatan_kamar'); 
            $table->unsignedBigInteger('created_by'); 
            $table->unsignedBigInteger('updated_by'); 
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
        Schema::dropIfExists('rooms'); // Menghapus tabel rooms jika migration dibatalkan
    }
};
