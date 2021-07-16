<?php

namespace App\Http\Controllers;

use App\Models\quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class quizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $quiz = quiz::all();

        return ($quiz);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'name' => 'required|min:10|max:255',
            'is_template' => 'required|boolean',
            'quality' => 'required|numeric|between:0,5.00',
            'status' => 'required|integer',
            'quiz_origin' => 'required|integer',
            'category' => 'required|integer',
            'user' => 'required|integer'
        ]);

        $exists = quiz::where([
            'name' => $request->name,
            'user' => $request->user
        ])->exists();

        if ($exists) {
            return Redirect::back()->withErrors(['msg', 'Ya tienes un quiz con ese nombre.']);
        }

        $quiz = new quiz();
        $quiz->name = $request->name;
        $quiz->is_template = $request->is_template;
        $quiz->quality = $request->quality;
        $quiz->status = $request->status;

        if ($request->is_template) {
            $quiz->quiz_origin = $request->quiz_origin;
        }

        $quiz->category = $request->category;
        $quiz->user = $request->user;

        $quiz->save();
        return $quiz;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
