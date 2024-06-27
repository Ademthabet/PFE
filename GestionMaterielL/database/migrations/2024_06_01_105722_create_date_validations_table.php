<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDateValidationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('date_validations', function (Blueprint $table) {
            $table->id();
            $table->date('dateValidation');
            $table->unsignedBigInteger('employe_id')->default(0);
            $table->foreign('employe_id')->references('id')->on('employes')->onDelete('cascade');
            $table->unsignedBigInteger('demandeMateriels_id')->default(0);
            $table->foreign('demandeMateriels_id')->references('id')->on('demande_materiels')->onDelete('cascade');
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
        Schema::dropIfExists('date_validations');
    }
}
