<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('photos')){
            Schema::create('photos', function (Blueprint $table) {
                $table->id();
                $table->string('nom');
                $table->string('type');
                $table->unsignedBigInteger('employe_id')->nullable();
                $table->foreign('employe_id')->references('id')->on('employes')->onDelete('cascade');
                $table->unsignedBigInteger('materiel_id')->nullable();
                $table->foreign('materiel_id')->references('id')->on('materiels')->onDelete('cascade');
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
        Schema::dropIfExists('photos');
        Schema::table('photos', function (Blueprint $table) {
            $table->dropForeign(['employe_id']);
            $table->dropColumn('employe_id');
            $table->dropForeign(['materiel_id']);
            $table->dropColumn('materiel_id');
        });
    }
}
