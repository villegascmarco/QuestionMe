<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class question extends Model
{
    use HasFactory;

    protected $table = "question";

    public $timestamps = false;

    public function possible_answers()
    {
        return $this->hasMany(possible_answer::class, 'question');
    }
    public function open_ended_answers()
    {
        return $this->hasMany(answer_selected::class, 'question');
    }
}
