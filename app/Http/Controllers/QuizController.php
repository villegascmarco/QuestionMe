<?php

namespace App\Http\Controllers;

use App\Models\quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Session;
use Illuminate\Support\Facades\Redirect;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $quiz = DB::Table('quiz')->where('is_template', true)->get();
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
            'is_template' => 'boolean',
            'quality' => 'required|numeric|between:0,5.00',
            'quiz_origin' => 'integer',
            'status' => 'required|integer',
            'category' => 'required|integer',
            'user' => 'required|integer'
        ]);

        $exists = quiz::where([
            'name' => $request->name,
            'user' => $request->user
        ])->exists();

        if ($exists) {
            return ('Ya tienes un quiz con ese nombre.');
            return Redirect::back()->withErrors(['msg', 'Ya tienes un quiz con ese nombre.']);
        }

        $quiz = new quiz();
        $quiz->name = $request->name;
        $quiz->is_template = $request->is_template;
        $quiz->quality = $request->quality;
        $quiz->status = $request->status;
        $quiz->quiz_origin = $request->quiz_origin;

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
        $quiz = DB::Table('quiz')->where('user', $id)->get();

        return ($quiz);
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
        //No se debe poder modificar el campo quiz_origin
        $validateData = $request->validate([
            'name' => 'required|min:10|max:255',
            'is_template' => 'boolean',
            'quality' => 'required|numeric|between:0,5.00',
            'status' => 'required|integer',
            'category' => 'required|integer',
            'user' => 'required|integer'
        ]);

        $quiz = quiz::find($id);

        if (!isset($quiz)) {
            return ('No existe ese ID');
            return Redirect::back()->withErrors(['msg', 'No existe ese ID']);
        }

        $other_quiz = quiz::where([
            'name' => $request->name,
            'user' => $request->user
        ])->first();


        if (isset($other_quiz)) {
            if ($id != $other_quiz->id) {
                return ('Ya tienes un quiz con ese nombre.');
                return Redirect::back()->withErrors(['msg', 'Ya tienes un quiz con ese nombre.']);
            }
        }

        $quiz->name = $request->name;
        $quiz->is_template = $request->is_template;
        $quiz->quality = $request->quality;
        $quiz->status = $request->status;

        $quiz->category = $request->category;
        $quiz->user = $request->user;

        $quiz->save();
        return $quiz;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $object = quiz::find($id);
        if (isset($object)) {
            $object->delete();

            Session::flash('message', 'Quiz eliminado correctamente.
                                    Si había quiz que usarón como plantilla este quiz, 
                                    seguirán teniendo acceso al mismo.');
            return ('Eliminado');
        } else {
            return ('No existe el registro.');
        }
    }
}
