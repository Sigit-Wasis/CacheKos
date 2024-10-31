<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $table = 'room_settings';
    protected $primaryKey = 'id';

    protected $fillable = [
        'nama_kost',
        'alamat',
        'telepon',
        'email',
        'deskripsi',
        'logo',
        'tenggang_waktu',
        'biaya_terlambat',
        'facebook',
        'instagram',
        'tiktok',
        'created_by',
        'updated_by'
    ];
}
