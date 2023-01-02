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
        Schema::create('kanban_table_user_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kanban_table_id');
            $table->foreignId('user_id');
            $table->unsignedInteger('permission');
            $table->timestamps();

            $table->foreign('kanban_table_id')->references('id')->on('kanban_tables');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('task_users', function (Blueprint $table){
            $table->dropForeign('kanban_table_user_permissions_kanban_table_id_foreign');
            $table->dropForeign('kanban_table_user_permissions_user_id_foreign');
        });
        Schema::dropIfExists('kanban_table_user_permissions');
    }
};
