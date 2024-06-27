<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatistiquesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('statistiques', function (Blueprint $table) {
            $table->id();
            $table->date('dureeAttDemande');
            $table->integer('dureeAttMoyenne');
            $table->integer('nbrDEnCours');
            $table->integer('nbrDValidee');
            $table->integer('nbrDNonValidee');
            $table->integer('nbrDPartiellementValidee');
            $table->integer('nbrMParEmploye');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('statistiques');
    }
}
