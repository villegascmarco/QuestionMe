<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class reportsController extends Controller
{
    public function getReportPersonResponseQuiz($idUser){
        
        $quiz = DB::table('non_registered_human as nrh')
        
        ->join('answer_selected as ase', 'nrh.id', '=', 'ase.non_registered_human')
        ->join('question', 'ase.question', '=', 'question.id')
        ->join('quiz', 'question.quiz', '=', 'quiz.id')
        ->join('user', 'quiz.user', '=', 'user.id')
        ->select('nrh.id', 'nrh.name', 'nrh.last_name', 'nrh.email', 'ase.given_answer', 'ase.is_correct', 'question.question', 
        'question.question_type', 'quiz.name as QuizName', 'user.name as UserName')
        ->where("user.id","=", $idUser)
        ->groupBy('nrh.id')->get();

        return response()->json($quiz);
    }
}
