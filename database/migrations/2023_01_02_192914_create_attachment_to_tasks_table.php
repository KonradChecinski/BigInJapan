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
        Schema::create('attachment_to_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id');
            $table->string('name', 255);
            $table->string('type', 255);
            $table->string('path');
            $table->timestamps();

            $table->foreign('task_id')->references('id')->on('tasks');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('attachment_to_tasks', function (Blueprint $table){
            $table->dropForeign('attachment_to_tasks_task_id_foreign');
        });
        Schema::dropIfExists('attachment_to_tasks');
    }
};
