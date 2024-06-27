<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bureau extends Model
{
    use HasFactory;
    protected $fillable = [
        'numero','departement_id'
    ];
    public function departements()
    {
        return $this->belongsTo(Departement::class, 'departement_id');
    }
    public function employe()
    {
        return $this->hasMany(Employe::class);
    }
    public function materiels()
    {
        return $this->hasMany(Materiel::class);
    }
}
