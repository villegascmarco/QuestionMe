<?php

namespace App\Http\Controllers;

use App\Models\PossibleAnswer;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class PossibleAnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($quiz, $question)
    {
        Question::where([
            'id' => $question,
            'quiz' => $quiz,
        ])->firstOrFail();

        $answers = PossibleAnswer::where('question', $question)->get();

        return ($answers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($quiz, $question, Request $request)
    {
        $varQuestion =  Question::where([
            'id' => $question,
            'quiz' => $quiz,
        ])->firstOrFail();

        if ($varQuestion->question_type == 2) {
            # Respuesta abierta
            return ('La pregunta no soporta posibles respuestas.');
            return Redirect::back()->withErrors(['msg', 'La pregunta no soporta posibles respuestas.']);
        }

        $validateData = $request->validate([
            'answer' => 'required|min:10|max:255',
            'is_correct' => 'boolean',
        ]);

        $answer = new PossibleAnswer();
        $answer->question = $question;
        $answer->answer = $request->answer;
        $answer->is_correct = $request->is_correct;

        $answer->save();
        return ($answer);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PossibleAnswer  $possibleAnswer
     * @return \Illuminate\Http\Response
     */
    public function show(PossibleAnswer $possibleAnswer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PossibleAnswer  $possibleAnswer
     * @return \Illuminate\Http\Response
     */
    public function update($quiz, $question, Request $request, $id)
    {
        $varQuestion =  Question::where([
            'id' => $question,
            'quiz' => $quiz,
        ])->firstOrFail();

        $answer =  PossibleAnswer::where([
            'id' => $id,
            'question' => $question,
        ])->firstOrFail();

        if ($varQuestion->question_type == 2) {
            # Respuesta abierta
            return ('La pregunta no soporta posibles respuestas.');
            return Redirect::back()->withErrors(['msg', 'La pregunta no soporta posibles respuestas.']);
        }

        $validateData = $request->validate([
            'answer' => 'required|min:10|max:255',
            'is_correct' => 'boolean',
        ]);

        $answer->answer = $request->answer;
        $answer->is_correct = $request->is_correct;

        $answer->save();
        return ($answer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PossibleAnswer  $possibleAnswer
     * @return \Illuminate\Http\Response
     */
    public function destroy($quiz, $question, $id)
    {
        $varQuestion =  Question::where([
            'id' => $question,
            'quiz' => $quiz,
        ])->firstOrFail();

        $answer =  PossibleAnswer::where([
            'id' => $id,
            'question' => $question,
        ])->firstOrFail();

        $answer->delete();
        Session::flash('message', 'Respuesta eliminada correctamente.');
        return ('Respuesta eliminada correctamente');
    }

    public static function destroyAll($question)
    {
        PossibleAnswer::where('question', $question)->delete();
    }
}
