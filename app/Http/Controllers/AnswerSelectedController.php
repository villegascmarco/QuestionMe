<?php

namespace App\Http\Controllers;

use App\Models\answer_selected;
use App\Models\non_registered_human;
use App\Models\possible_answer;
use App\Models\question;
use Illuminate\Http\Request;
use stdClass;

class AnswerSelectedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($quiz)
    {
        $nonHumans = non_registered_human::with(['answers'])->get();
        $answers = new stdClass();

        foreach ($nonHumans as $nonHuman) {
            $loop = 0;
            foreach ($nonHuman->answers as $answer) {

                if (isset($answer->question)) {
                    $question = question::find($answer->question);

                    if ($question->quiz == $quiz) {

                        if (!isset($answers->user)) {
                            $answers->user = array();
                        }
                        if ($loop == 0) {
                            $newHuman = clone $nonHuman;
                            unset($newHuman->answers);
                            unset($newHuman->created_at);
                            unset($newHuman->updated_at);
                            array_push($answers->user, $newHuman);
                        }

                        $lastUserIndex = array_key_last($answers->user);
                        if (!isset($answers->user[$lastUserIndex]->questions)) {
                            $answers->user[$lastUserIndex]->questions = array();
                        }

                        $varQuestion = $answers->user[$lastUserIndex]->questions;
                        $question->answer_selected = $answer;
                        array_push($varQuestion, $question);
                        $answers->user[$lastUserIndex]->questions = $varQuestion;
                    }
                } else {
                    $possible_answer = possible_answer::find($answer->possible_answer);
                    $question = question::find($possible_answer->question);

                    if ($question->quiz == $quiz) {

                        if (!isset($answers->user)) {
                            $answers->user = array();
                        }
                        if ($loop == 0) {
                            $newHuman = clone $nonHuman;
                            unset($newHuman->answers);
                            unset($newHuman->created_at);
                            unset($newHuman->updated_at);
                            array_push($answers->user, $newHuman);
                        }

                        $lastUserIndex = array_key_last($answers->user);
                        if (!isset($answers->user[$lastUserIndex]->questions)) {
                            $answers->user[$lastUserIndex]->questions = array();
                        }

                        $varQuestion = $answers->user[$lastUserIndex]->questions;
                        $question->answer_selected = $possible_answer;
                        array_push($varQuestion, $question);
                        $answers->user[$lastUserIndex]->questions = $varQuestion;
                    }
                }

                $loop++;
            }
        }
        if (!is_null($answers)) {
            return (json_encode($answers));
        }
        return ('ñao');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\answer_selected  $answer_selected
     * @return \Illuminate\Http\Response
     */
    public function show(answer_selected $answer_selected)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\answer_selected  $answer_selected
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, answer_selected $answer_selected)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\answer_selected  $answer_selected
     * @return \Illuminate\Http\Response
     */
    public function destroy(answer_selected $answer_selected)
    {
        //
    }
}
