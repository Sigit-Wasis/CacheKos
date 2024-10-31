<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    // Menentukan nama tabel di database
    protected $table = 'expenses';

    // Menentukan primary key (pastikan typo "primarykey" sudah diperbaiki menjadi "primaryKey")
    protected $primaryKey = 'id';

    // Menentukan kolom-kolom yang bisa diisi (mass assignment)
    protected $fillable = [
        'nama_pengeluaran',
        'keterangan',
        'tanggal',
        'nominal',
        'created_by',
        'updated_by'
    ];
}
