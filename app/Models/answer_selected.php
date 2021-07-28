<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class answer_selected extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = "answer_selected";

    public function closed_ended_answers()
    {
        return $this->belongsTo(possible_answer::class, 'possible_answer');
    }
}
