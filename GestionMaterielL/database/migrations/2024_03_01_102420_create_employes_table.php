<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('employes')){
            Schema::create('employes', function (Blueprint $table) {
                $table->id();
                $table->string('code')->unique();
                $table->string('nom')->nullable();
                $table->string('prenom')->nullable();
                $table->date('dateRecrutement');
                $table->string('email');
                $table->string('password')->nullable();
                $table->integer('tel')->nullable();
                $table->string('role');
                $table->unsignedBigInteger('bureaus_id')->default(0);
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
        Schema::dropIfExists('employes');
        Schema::table('employes', function (Blueprint $table) {
            $table->dropForeign(['bureaus_id']);
            $table->dropColumn('bureaus_id');
        });
       
    }
}
