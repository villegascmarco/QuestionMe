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
            $table->string('given_answer')->nullable();
            $table->boolean('is_correct')->nullable();
            $table->foreignId('non_registered_human')->constrained()->references('id')->on('non_registered_human');
            $table->foreignId('question')->nullable()->nullable()->constrained()->references('id')->on('question');
            $table->foreignId('possible_answer')->nullable()->constrained()->references('id')->on('possible_answer');
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
