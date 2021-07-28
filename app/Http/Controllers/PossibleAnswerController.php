<?php

namespace App\Http\Controllers;

use App\Models\possible_answer;
use App\Models\question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        question::where([
            'id' => $question,
            'quiz' => $quiz,
        ])->firstOrFail();

        $answers = possible_answer::where('question', $question)->get();

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
        $varQuestion =  question::where([
            'id' => $question,
            'quiz' => $quiz,
        ])->firstOrFail();

        if ($varQuestion->question_type == 2) {
            # Respuesta abierta
            return ('La pregunta no soporta posibles respuestas.');
            return Redirect::back()->withErrors(['msg', 'La pregunta no soporta posibles respuestas.']);
        }

        $request->validate([
            "data"    => "required|array|min:1",
            'data.*.answer' => 'required|min:1|max:255',
            'data.*.is_correct' => 'boolean',
        ]);

        DB::beginTransaction();
        foreach ($request->data as  $value) {
            $answer = new possible_answer();
            $answer->question = $question;
            $answer->answer = $value['answer'];
            $answer->is_correct = $value['is_correct'];

            try {
                $answer->save();
            } catch (\Throwable $th) {
                DB::rollBack();
                return ('Ocurrió un error.');
                return Redirect::back()->withErrors(['msg', 'Ocurrió un error.']);
            }
        }

        DB::commit();

        return $request;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\possible_answer  $possible_answer
     * @return \Illuminate\Http\Response
     */
    public function show(possible_answer $possible_answer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\possible_answer  $possible_answer
     * @return \Illuminate\Http\Response
     */
    public function update($quiz, $question, Request $request, $id)
    {
        $varQuestion =  question::where([
            'id' => $question,
            'quiz' => $quiz,
        ])->firstOrFail();

        $answer =  possible_answer::where([
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
     * @param  \App\Models\possible_answer  $possible_answer
     * @return \Illuminate\Http\Response
     */
    public function destroy($quiz, $question, $id)
    {
        $varQuestion =  question::where([
            'id' => $question,
            'quiz' => $quiz,
        ])->firstOrFail();

        $answer =  possible_answer::where([
            'id' => $id,
            'question' => $question,
        ])->firstOrFail();

        $answer->delete();
        Session::flash('message', 'Respuesta eliminada correctamente.');
        return ('Respuesta eliminada correctamente');
    }

    public static function destroyAll($question)
    {
        possible_answer::where('question', $question)->delete();
    }
    public static function copyAllFrom($oldQuestion, $newQuestion)
    {
        $oldAnswers = possible_answer::where('question', $oldQuestion)->get();

        foreach ($oldAnswers as $key => $value) {
            $newAnswer = possible_answer::find($value->id)->replicate();
            $newAnswer->question = $newQuestion;

            $newAnswer->save();
        }
    }
}
