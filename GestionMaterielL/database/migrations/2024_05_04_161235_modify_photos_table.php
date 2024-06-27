<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyPhotosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    /**
     * Reverse the migrations.
     *
     * @return void
     */


    public function up()
    {
        Schema::table('photos', function (Blueprint $table) {
            $table->dropForeign(['materiel_id']);
            $table->unsignedBigInteger('materiel_id')->nullable()->default((null))->change();

            // Re-add the foreign key constraint with onDelete set to 'set null'
            $table->foreign('materiel_id')->references('id')->on('materiels')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('photos', function (Blueprint $table) {
            // Drop the newly modified foreign key constraint
            $table->dropForeign(['materiel_id']);

            // Revert the 'department_id' column to not be nullable
            $table->unsignedBigInteger('materiel_id')->nullable(false)->change();

            // Optionally re-add the original foreign key constraint without onDelete behavior
            $table->foreign('materiel_id')->references('id')->on('materiels');
        });
    }
}
