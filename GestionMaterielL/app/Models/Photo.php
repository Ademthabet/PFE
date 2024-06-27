<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom', 'type','employe_id','materiel_id'
    ];
    public function employes()
    {
        return $this->belongsTo(Employe::class, 'employe_id');
    }
    public function materiels()
    {
        return $this->belongsTo(Materiel::class, 'materiel_id');
    }
}
