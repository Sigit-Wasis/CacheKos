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
        Schema::create('room_settings', function (Blueprint $table) {
            $table->id();
            $table->string('nama_kost');
            $table->text('alamat');
            $table->string('telepon', 15)->nullable();
            $table->string('email')->unique()->nullable();
            $table->text('deskripsi')->nullable();
            $table->string('logo')->nullable();
            $table->integer('tenggang_waktu')->nullable();
            $table->decimal('biaya_terlambat', 8, 2)->nullable();
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('tiktok')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
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
        Schema::dropIfExists('room_settings');
    }
};
