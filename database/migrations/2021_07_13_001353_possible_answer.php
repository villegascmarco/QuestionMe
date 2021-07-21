<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PossibleAnswer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('possible_answer', function (Blueprint $table) {
            $table->id();
            $table->string('answer');
            $table->boolean('is_correct');

            $table->unsignedBigInteger('question');
            $table->foreign('question')->references('id')->on('question')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('possible_answer');
    }
}
