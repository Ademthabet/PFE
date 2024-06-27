<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBureausTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('bureaus')){
            Schema::create('bureaus', function (Blueprint $table) {
                $table->id();
                $table->integer('numero')->unique();
                $table->unsignedBigInteger('departement_id')->default(0);
                $table->foreign('departement_id')->references('id')->on('departements')->onDelete('cascade');
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
        Schema::dropIfExists('bureaus');
        Schema::table('bureaus', function (Blueprint $table) {
            $table->dropForeign(['departement_id']);
            $table->dropColumn('departement_id');
        });
    }
}
