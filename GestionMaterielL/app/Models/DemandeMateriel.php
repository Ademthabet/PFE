<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandeMateriel extends Model
{
    use HasFactory;
    protected $fillable = [
        'numero', 'date','etat','employe_id'
    ];
    public function employes()
    {
        return $this->belongsTo(Employe::class, 'employe_id');
    }
    public function lignesDemandes()
    {
        return $this->hasMany(LigneDemande::class);
    }
    public function dateValidation()
    {
        return $this->hasMany(DateValidation::class);
    }
}
