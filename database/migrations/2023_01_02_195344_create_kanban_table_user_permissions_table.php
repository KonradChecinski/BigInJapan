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
        Schema::create('table_user_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('table_id');
            $table->foreignId('user_id');
            $table->unsignedInteger('permission');
            $table->timestamps();

            $table->foreign('table_id')->references('id')->on('tables');
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
        Schema::table('table_user_permissions', function (Blueprint $table){
            $table->dropForeign('table_user_permissions_table_id_foreign');
            $table->dropForeign('table_user_permissions_user_id_foreign');
        });
        Schema::dropIfExists('table_user_permissions');
    }
};
