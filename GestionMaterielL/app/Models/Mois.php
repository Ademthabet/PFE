<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mois extends Model
{
    use HasFactory;
    protected $fillable = [
        'numero', 'statistiques_id'
    ];
    public function statistiques()
    {
        return $this->belongsTo(Statistiques::class, "statistiques_id");
    }
}
