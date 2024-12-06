<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    use HasFactory;
    
    protected $table = 'residents';
    protected $primaryKey = 'id';
    protected $guarded = [];
    
    // protected $fillable = [
    //     'jenis_sewa_kamar',
    //     'id_kamar',
    //     'nama_penghuni',
    //     'no_handphone',
    //     'jenis_kelamin',
    //     'no_ktp',
    //     'foto_ktp',
    //     'status_penghuni',
    //     'pekerjaan',
    //     'jumlah_penghuni',
    //     'lama_sewa',
    //     'tanggal_masuk',
    //     'keterangan',
    //     'status_sewa',
    //     'created_by',
    //     'updated_by',
    // ];
    const HARIAN = 1;
    const MINGGUAN = 2;
    const BULANAN = 3;
    const TAHUNAN = 4;

    public static function jenisSewaKamarString()

    {
        return [
            self::BULANAN => 'Bulanan',
            self::HARIAN => 'Harian',
            self::MINGGUAN => 'Mingguan',
            self::TAHUNAN => 'Tahunan',
        ];
    }

    const MAHASISWA = 1;
    const WIRASWASTA = 2;
    const PNS = 3;
    const POLISI = 4;
    const PERAWAT = 5;
    const PROGRAMMER = 6;
    const GURU = 7;
    const LAINNYA = 8;

    public static function pekerjaanString()

    {
        return [
            self::MAHASISWA => 'Mahasiswa',
            self::WIRASWASTA => 'Wiraswasta',
            self::PNS => 'PNS',
            self::POLISI => 'Polisi',
            self:: PERAWAT => 'Perawat',
            self::PROGRAMMER => 'Programmer',
            self::GURU => 'Guru',
            self::LAINNYA => 'Lainnya',
            
        ];
    }
    const BELUM_MENIKAH  = 1;
    const MENIKAH = 2;
    const JANDA= 3;
    const DUDA = 4;
    const CERAI_MATI = 5;

    public static function status_perkawinanString()

    {
        return [
            self::BELUM_MENIKAH => 'Belum menikah',
            self::MENIKAH => 'Menikah',
            self::JANDA => 'Janda',
            self::DUDA => 'Duda',
            self::CERAI_MATI => 'Cerai Mati',
        ];
    }
    
    /**
     * Relationship with the Room model.
     */
    public function rooms()
    {
        return $this->belongsTo(Room::class, 'id_kamar');
    }

    /**
     * Relationship with the User model for the creator.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Relationship with the User model for the updater.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
