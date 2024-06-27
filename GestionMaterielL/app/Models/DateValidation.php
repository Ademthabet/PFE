<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DateValidation extends Model
{
    use HasFactory;
    protected $fillable = [
        'dateValidation','employe_id','demandeMateriels_id'
    ];
    public function employes()
    {
        return $this->belongsTo(Employe::class, 'employe_id');
    }
    public function demandesMateriels()
    {
        return $this->belongsTo(DemandeMateriel::class, 'demandeMateriels_id');
    }
}
