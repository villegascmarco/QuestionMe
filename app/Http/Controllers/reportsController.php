<?php

namespace App\Http\Controllers;

use App\Models\quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class reportsController extends Controller
{
    //pendiente de revision
    public function getReportPersonResponseQuiz($user){
        $response = [];
        
        try {
        $quiz = DB::table('non_registered_human as nrh')
        
        ->join('answer_selected as ase', 'nrh.id', '=', 'ase.non_registered_human')
        ->join('question', 'ase.question', '=', 'question.id')
        ->join('quiz', 'question.quiz', '=', 'quiz.id')
        ->join('user', 'quiz.user', '=', 'user.id')
        ->select('nrh.id', 'nrh.name', 'nrh.last_name', 'nrh.email', 'ase.given_answer', 'ase.is_correct', 'question.question', 
        'question.question_type', 'quiz.name as QuizName', 'user.name as UserName')
        ->where("user.id","=", $user)
        ->groupBy('nrh.id')->get(); 

        } catch (\Throwable $th) {
        $response = ['status' => 'error',
                     'response' => 'Ocurrió un error al Consultar',
                     'error' => $th];
        return $response;

        }
        return response()->json($quiz);
    }


    //pendiente de revision
    public function getReportRespose($user){
        $response = [];

        try {
        $quiz = DB::table('non_registered_human as no_human')
        ->leftJoin('answer_selected', 'no_human.id', '=', 'answer_selected.non_registered_human')
        ->join('possible_answer', 'possible_answer.id', '=', 'answer_selected.possible_answer')
        ->join('question', 'question.id', '=', ' possible_answer.question')
        ->join('quiz', 'question.quiz', '=', 'quiz.id')
        ->select('quiz.id as quiz', 'quiz.name as quiz_name', 
        DB::raw("concat(no_human.name, ' ', persona.apellidoP, ' ', no_human.last_name) as human_name"), 'question.id as question', 
        'question.name as question_name', 'possible_answer.id as possible_answer', 'possible_answer.answer as possible_answer_name')
        ->where("quiz.user","=", $user)
        ->get();
       
        } catch (\Throwable $th) {
        $response = ['status' => 'error',
                     'response' => 'Ocurrió un error al Consultar',
                     'error' => $th];
        return $response;

        }
        
        return response()->json($quiz);
    }
    // pendiente de revisar
    public function getReportTemplates($user){
        $response = [];
       
        try {
        $quiz = DB::table('quiz')
        ->leftJoin('quiz as template', 'quiz.quiz_origin', '=', 'template.id')
        ->select(DB::raw('count(quiz.id) as totalTemplatesUsed'))
        ->where("template.user","=", $user)
        ->where("quiz.user","!=", $user)
        ->get();

        } catch (\Throwable $th) {
        $response = ['status' => 'error',
                     'response' => 'Ocurrió un error al Consultar',
                     'error' => $th];
        return $response;
        }
        return response()->json($quiz[0]);
    }
}
