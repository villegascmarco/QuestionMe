<?php

namespace App\Http\Controllers;

use App\Models\answer_selected;
use App\Models\non_registered_human;
use Illuminate\Http\Request;

class NonRegisteredHumanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return (non_registered_human::all());
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
        ]);

        $nonHuman = new non_registered_human();

        $nonHuman->name = $request->name;
        $nonHuman->last_name = $request->last_name;
        $nonHuman->email = $request->email;

        $nonHuman->save();
        if (isset($request->answers)) {

            foreach ($request->answers as $value) {
                $answer = new answer_selected();
                $answer->possible_answer = $value;

                $nonHuman->answers()->save($answer);
            }
        } else {
            return ('nou');
        }

        return ($nonHuman);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\non_registered_human  $non_registered_human
     * @return \Illuminate\Http\Response
     */
    public function show(non_registered_human $non_registered_human)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\non_registered_human  $non_registered_human
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, non_registered_human $non_registered_human)
    {
        //
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
