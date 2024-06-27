<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Statistiques extends Model
{
    use HasFactory;
    protected $fillable = [
        'dureeAttDemande', 'dureeAttMoyenne', 'nbrDEnCours', 'nbrDValidee','nbrDNonValidee','nbrDPartiellementValidee','nbrMParEmploye'
    ];
    public function mois()
    {
        return $this->hasMany(Mois::class);
    }
}
