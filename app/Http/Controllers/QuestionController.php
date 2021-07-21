<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($quiz)
    {
        return (Question::with('possible_answers')->where('quiz', $quiz)->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($quiz, Request $request)
    {
        $validateData = $request->validate([
            'question' => 'required|min:10|max:255',
            'question_type' => 'required|exists:question_type,id',
        ]);

        $exists = Question::where([
            'question' => $request->question,
            'quiz' => $quiz,
        ])->exists();

        if ($exists) {
            return ('Ya tienes una pregunta similar.');
            return Redirect::back()->withErrors(['msg', 'Ya tienes una pregunta similar.']);
        }

        $question = new Question();
        $question->question = $request->question;
        $question->question_type = $request->question_type;
        $question->quiz = $quiz;

        try {
            $question->save();
        } catch (\Throwable $th) {
            return ('Ocurrió un error.');
            return Redirect::back()->withErrors(['msg', 'Ocurrió un error.']);
        }
        return $question;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id from
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function update($quiz, Request $request, $id)
    {
        $question =  Question::where([
            'id' => $id,
            'quiz' => $quiz,
        ])->firstOrFail();

        $validateData = $request->validate([
            'question' => 'required|min:10|max:255',
            'question_type' => 'required|exists:question_type,id',
        ]);

        $question->question = $request->question;

        if ($question->question_type <> $request->question_type) {
            if ($request->question_type == 2) {
                PossibleAnswerController::destroyAll($id);
            }
        }
        $question->question_type = $request->question_type;

        try {
            $question->save();
        } catch (\Throwable $th) {
            return ('Ocurrió un error.');
            return Redirect::back()->withErrors(['msg', 'Ocurrió un error.']);
        }
        return $question;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy($quiz, $id)
    {
        $question =  Question::where([
            'id' => $id,
            'quiz' => $quiz,
        ])->firstOrFail();

        $question->delete();
        Session::flash('message', 'Pregunta eliminada correctamente.');
        return ('Pregunta eliminada correctamente');
    }
}
