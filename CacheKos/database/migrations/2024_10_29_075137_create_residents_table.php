<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResidentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('residents', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->smallInteger('jenis_sewa_kamar');
            $table->bigInteger('id_kamar')->unsigned();
            $table->string('nama_penghuni');
            $table->string('no_handphone');
            $table->boolean('jenis_kelamin');
            $table->string('no_ktp', 16);
            $table->string('foto_ktp')->nullable();
            $table->smallInteger('status_penghuni');
            $table->smallInteger('pekerjaan');
            $table->integer('jumlah_penghuni');
            $table->integer('lama_sewa');
            $table->date('tanggal_masuk');
            $table->text('keterangan')->nullable();
            $table->smallInteger('status_sewa');
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by');
            $table->timestamps();

            // Menambahkan foreign key ke tabel Rooms
            $table->foreign('id_kamar')->references('id')->on('rooms')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::dropIfExists('residents');
    }
};
