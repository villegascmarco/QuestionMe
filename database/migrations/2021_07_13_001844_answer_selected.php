<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AnswerSelected extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('answer_selected', function (Blueprint $table) {
            $table->id();
            $table->string('given_answer');
            $table->boolean('is_correct');
            $table->unsignedBigInteger('non_registered_human');
            $table->foreign('non_registered_human')->references('id')->on('non_registered_human');

            $table->unsignedBigInteger('possible_answer');
            $table->foreign('possible_answer')->references('id')->on('possible_answer');
        }); //
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('answer_selected');
    }
}
