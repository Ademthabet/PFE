<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDemandeMaterielsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('demande_materiels')){
            Schema::create('demande_materiels', function (Blueprint $table) {
                $table->id();
                $table->integer('numero');
                $table->date('date');
                $table->string('etat');
                $table->unsignedBigInteger('employe_id')->default(0);
                $table->foreign('employe_id')->references('id')->on('employes')->onDelete('cascade');
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
        Schema::dropIfExists('demande_materiels');
        Schema::table('demande_materiels', function (Blueprint $table) {
            $table->dropForeign(['employe_id']);
            $table->dropColumn('employe_id');
        });
    }
    
}
