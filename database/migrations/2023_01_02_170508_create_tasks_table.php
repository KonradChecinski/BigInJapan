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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('panel_id');
            $table->unsignedBigInteger('order');
            $table->string('name');
            $table->string('description');
            $table->dateTime('datetime');
            $table->char('color', 6);
            $table->boolean('marker');
            $table->timestamps();

            $table->foreign('panel_id')->references('id')->on('panels');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tasks', function (Blueprint $table){
            $table->dropForeign('tasks_panel_id_foreign');
        });
        Schema::dropIfExists('tasks');
    }
};
