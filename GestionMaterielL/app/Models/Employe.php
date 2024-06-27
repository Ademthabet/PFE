<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Materiel;

class Employe extends Model
{
    use HasFactory;
    protected $fillable = [
        'code', 'nom', 'prenom','dateRecrutement','email','password','tel', 'role','bureaus_id'
    ];
    public function bureaux()
    {
        return $this->belongsTo(Bureau::class, "bureaus_id");
    }
    public function materiels()
    {
        return $this->hasMany(Materiel::class);
    }
    public function photos()
    {
        return $this->hasMany(Photo::class);
    }
    public function demandesMatériels()
    {
        return $this->hasMany(DemandeMateriel::class);
    }
    public function dateValidation()
    {
        return $this->hasMany(DateValidation::class);
    }
}
