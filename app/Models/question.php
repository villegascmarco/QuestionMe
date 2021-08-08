<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($question) { // before delete() method call this
            $question->open_ended_answers()->delete();

            $possible_answers = DB::Table('possible_answer')->where([
                'question' => $question->id,
            ])->get();

            foreach ($possible_answers as $key => $possible_answer) {
                $answers_selected = DB::Table('answer_selected')->where([
                    'possible_answer' => $possible_answer->id,
                ])->delete();
            }
            $question->possible_answers()->delete();
        });
    }
}
