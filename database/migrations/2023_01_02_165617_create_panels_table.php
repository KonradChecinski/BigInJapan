<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('panels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kanban_table_id');
            $table->string('name', 255);
            $table->unsignedBigInteger('order');
            $table->timestamps();

            $table->foreign('kanban_table_id')->references('id')->on('kanban_tables');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('panels', function (Blueprint $table){
           $table->dropForeign('panels_kanban_table_id_foreign');
        });
        Schema::dropIfExists('panels');
    }
};
