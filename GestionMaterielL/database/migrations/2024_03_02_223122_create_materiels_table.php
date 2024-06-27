<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaterielsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('materiels')){
            Schema::create('materiels', function (Blueprint $table) {
                $table->id();
                $table->string('code')->unique();
                $table->string('designation');
                $table->string('description');
                $table->string('type');
                $table->integer('quantite');
                $table->unsignedBigInteger('employe_id')->nullable();
                $table->foreign('employe_id')->references('id')->on('employes')->onDelete('cascade');
                $table->unsignedBigInteger('bureaus_id')->nullable();
                $table->foreign('bureaus_id')->references('id')->on('bureaus')->onDelete('cascade');
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
        Schema::dropIfExists('materiels');
        Schema::table('materiels', function (Blueprint $table) {
            $table->dropForeign(['employe_id']);
            $table->dropColumn('employe_id');
            $table->dropForeign(['bureaus_id']);
            $table->dropColumn('bureaus_id');
        });
    }
}
