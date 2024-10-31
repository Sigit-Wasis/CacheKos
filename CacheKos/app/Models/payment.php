<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class payment extends Model
{
    protected $table = 'payment';
    protected $primaryKey = 'id';

    // Menentukan atribut yang dapat diisi (fillable)
    protected $fillable = [
        'invoice',
        'jumlah_bayar',
        'status',
        'tanggal',
        'id_resident',
        'keterangan',
        'kurang_bayar',
        'grand_total',
        'bukti_bayar',
        'created_by',
        'updated_by',
    ];
}
