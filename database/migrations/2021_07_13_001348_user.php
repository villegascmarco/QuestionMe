<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class User extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('password');
            $table->string('creado_en');
            $table->integer('status')->default(0);
            $table->unsignedBigInteger('role');
            $table->foreign('role')->references('id')->on('user_role');

            $table->unsignedBigInteger('human');
            $table->foreign('human')->references('id')->on('human');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
