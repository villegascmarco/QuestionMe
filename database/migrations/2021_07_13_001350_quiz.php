<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Quiz extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quiz', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('is_template');
            $table->decimal('quality', 13, 2)->default(0);
            $table->integer('status')->default(0);

            $table->foreignId('quiz_origin')->nullable()->constrained()->references('id')->on('quiz');

            $table->unsignedBigInteger('category');
            $table->foreign('category')->references('id')->on('category');

            $table->unsignedBigInteger('user');
            $table->foreign('user')->references('id')->on('user');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quiz');
    }
}
