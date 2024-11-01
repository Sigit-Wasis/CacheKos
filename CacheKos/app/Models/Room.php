<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $table='rooms';
    protected $primaryKey='id';
    protected $fillable = [
        'nama_kamar',
        'nomor_kamar',
        'harga_per_bulan',
        'harga_per_hari',
        'fasilitas',
        'kelengkapan_lain',
        'catatan_kamar',
        'created_by',
        'updated_by'
    ];
}
