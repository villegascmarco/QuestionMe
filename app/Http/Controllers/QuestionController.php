<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($quiz)
    {
        $questions = Question::where('quiz', $quiz)->get();

        return ($questions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'question' => 'required|min:10|max:255',
            'order' => 'required|integer',
            'question_type' => 'required|exists:question_type,id',
            'quiz' => 'required|integer',
        ]);

        $exists = Question::where([
            'question' => $request->question,
        ])->exists();

        if ($exists) {
            return ('Ya tienes una pregunta similar.');
            return Redirect::back()->withErrors(['msg', 'Ya tienes una pregunta similar.']);
        }

        $exists = Question::where([
            'order' => $request->order,
            'quiz' => $request->quiz,
        ])->exists();

        if ($exists) {
            return ('Ya tienes una pregunta con el mismo índice.');
            return Redirect::back()->withErrors(['msg', 'Ya tienes una pregunta con el mismo índice.']);
        }

        $question = new Question();
        $question->question = $request->question;
        $question->order = $request->order;
        $question->question_type = $request->question_type;
        $question->quiz = $request->quiz;

        // $question->save();
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
    public function update(Request $request, Question $question)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        //
    }
}
