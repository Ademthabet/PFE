<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneDemande extends Model
{
    use HasFactory;
    protected $fillable = [
        'numero','quantiteDem','etat','demandeMateriels_id','materiels_id'
    ];
    public function demandeMateriels()
    {
        return $this->belongsTo(DemandeMateriel::class, 'demandeMateriels_id');
    }
    public function materiels()
    {
        return $this->belongsTo(Materiel::class, 'materiels_id');
    }
}
