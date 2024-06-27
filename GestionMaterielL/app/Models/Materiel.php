<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materiel extends Model
{
    use HasFactory;
    protected $fillable = [
        'code', 'designation', 'description', 'type','quantite','bureaus_id','employe_id'
    ];
    public function bureaux()
    {
        return $this->belongsTo(Bureau::class, "bureaus_id");
    }
    public function employes()
    {
        return $this->belongsTo(Employe::class,"employe_id") ;
    }
    public function photos()
    {
        return $this->hasMany(Photo::class);
    }
    public function lignesDemandes()
    {
        return $this->hasMany(LigneDemande::class);
    }
   public function decreaseQuantity($amount)
   {
       $this->quantite -= $amount;
       $this->save();
   }
}
