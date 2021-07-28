<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Human extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('human', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('last_name')->default('');
            $table->string('picture');
            $table->string('date_birth')->default('2000-01-01');
            $table->string('email')->unique();
            $table->integer('status')->default(0);
            $table->timestamps();
        }); //
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('human');
    }
}
