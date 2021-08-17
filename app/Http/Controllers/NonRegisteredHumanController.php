<?php

namespace App\Http\Controllers;

use App\Models\answer_selected;
use App\Models\category;
use App\Models\non_registered_human;
use App\Models\question;
use App\Models\quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NonRegisteredHumanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return (non_registered_human::with('answers')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:255',
            'last_name' => 'required|min:3|max:255',
            'email' => 'required|email',
            'open_ended' => 'required_without_all:closed_ended|array', //al menos uno de open_ended y closed_ended es necesario.
            'closed_ended' => 'required_without_all:open_ended|array', //al menos uno de open_ended y closed_ended es necesario.
        ]);

        $nonHuman = new non_registered_human();

        $nonHuman->name = $request->name;
        $nonHuman->last_name = $request->last_name;
        $nonHuman->email = $request->email;

        $nonHuman->save();

        foreach ($request->closed_ended as $value) {
            $answer = new answer_selected();
            $answer->possible_answer = $value;

            $nonHuman->answers()->save($answer);
        }

        foreach ($request->open_ended as $value) {
            $answer = new answer_selected();
            $answer->question = $value['question'];
            $answer->given_answer = $value['answer'];

            $nonHuman->answers()->save($answer);
        }

        return (non_registered_human::with('answers')->where('id', $nonHuman->id)->get());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\non_registered_human  $non_registered_human
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $id_dec = QuizController::encrypt_decrypt($id, 'decrypt');

        $quiz = quiz::where([
            'id' => preg_replace("/[^0-9]/", "", $id_dec),
            'status' => 1,
        ])->firstOrFail();

        $quiz->category = category::where('id', $quiz->category)->first()->name;

        $quiz->questions = question::with('possible_answers')->where([
            'quiz' => $quiz->id
        ])->get();

        return view('site.quiz-module.quiz-reply', compact($quiz));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\non_registered_human  $non_registered_human
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'answers' => 'required|array|min:1',
        ]);

        DB::beginTransaction();

        foreach ($request->answers as  $value) {

            if (isset($value['question'])) {
                $answer_selected =  answer_selected::where([
                    'id' => $value['id'],
                    'non_registered_human' => $id,
                ])->firstOrFail();

                $answer_selected->is_correct = $value['is_correct'];
                $answer_selected->save();
            }
        }

        DB::commit();

        return ($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\non_registered_human  $non_registered_human
     * @return \Illuminate\Http\Response
     */
    public function destroy(non_registered_human $non_registered_human)
    {
        //
    }
}
