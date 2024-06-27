<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLigneDemandesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('ligne_demandes')){
            Schema::create('ligne_demandes', function (Blueprint $table) {
                $table->id();
                $table->integer('numero');
                $table->integer('quantiteDem');
                $table->string('etat');
                $table->unsignedBigInteger('demandeMateriels_id')->default(0);
                $table->foreign('demandeMateriels_id')->references('id')->on('demande_materiels')->onDelete('cascade');
                $table->unsignedBigInteger('materiels_id')->default(0);
                $table->foreign('materiels_id')->references('id')->on('materiels')->onDelete('cascade');
                $table->timestamps();
            });
        }
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ligne_demandes');
        Schema::table('ligne_demandes', function (Blueprint $table) {
            $table->dropForeign(['demandeMateriels_id']);
            $table->dropColumn('demandeMateriels_id');
            $table->dropForeign(['materiels_id']);
            $table->dropColumn('materiels_id');
        });
    }
}
