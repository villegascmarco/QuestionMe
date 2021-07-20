<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $table = "question";

    public $timestamps = false;

    public function possible_answers()
    {
        return $this->hasMany(PossibleAnswer::class, 'question');
    }
}
