<?php

namespace App\Http\Controllers;

use App\Models\answer_selected;
use App\Models\question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        return (question::with('possible_answers')->where('quiz', $quiz)->get());
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

        $exists = question::where([
            'question' => $request->question,
            'quiz' => $quiz,
        ])->exists();

        if ($exists) {
            return ('Ya tienes una pregunta similar.');
            return Redirect::back()->withErrors(['msg', 'Ya tienes una pregunta similar.']);
        }

        DB::beginTransaction();

        $question = new question();
        $question->question = $request->question;
        $question->question_type = $request->question_type;
        $question->quiz = $quiz;

        try {
            $question->save();
        } catch (\Throwable $th) {
            DB::rollBack();
            return ('Ocurrió un error.');
            return Redirect::back()->withErrors(['msg', 'Ocurrió un error.']);
        }
        DB::commit();
        return $question;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id from
     * @return \Illuminate\Http\Response
     */
    public function show($quiz, $id)
    {
        return (question::with('possible_answers')->where([
            'quiz' => $quiz,
            'id' => $id,
        ])->firstOrFail());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\question  $question
     * @return \Illuminate\Http\Response
     */
    public function update($quiz, Request $request, $id)
    {
        $question =  question::where([
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
     * @param  \App\Models\question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy($quiz, $id)
    {
        $question =  question::where([
            'id' => $id,
            'quiz' => $quiz,
        ])->firstOrFail();

        DB::beginTransaction();

        $question->delete();

        DB::commit();
        Session::flash('message', 'Pregunta eliminada correctamente.');
        return ('Pregunta eliminada correctamente');
    }

    public static function copyAllFrom($oldQuiz, $newQuiz)
    {
        $oldQuestions = question::where('quiz', $oldQuiz)->get();

        foreach ($oldQuestions as $key => $value) {
            $newQuestion = question::find($value->id)->replicate();
            $newQuestion->quiz = $newQuiz;

            $newQuestion->save();
            PossibleAnswerController::copyAllFrom($value->id, $newQuestion->id);
        }
    }
}
