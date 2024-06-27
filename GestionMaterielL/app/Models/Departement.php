<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departement extends Model
{
    use HasFactory;
    protected $fillable = [
        'numero', 'nom'
    ];
    public function bureaus()
    {
        return $this->hasMany(Bureau::class);
    }
}
