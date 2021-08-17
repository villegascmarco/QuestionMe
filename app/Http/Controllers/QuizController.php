<?php

namespace App\Http\Controllers;

use App\Models\quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $quiz = DB::Table('quiz')->where([
            'is_template' => true,
            'status' => 1,
        ])->get();
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
            'quiz_origin' => 'integer|nullable',
            'status' => 'required|integer',
            'category' => 'required|integer',
        ]);

        $userId = Auth::id();

        $exists = quiz::where([
            'name' => $request->name,
            'user' => $userId,
            'status' => 1,
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
        $quiz->user = $userId;

        $quiz->save();

        if ($quiz->quiz_origin) {
            QuestionController::copyAllFrom($quiz->quiz_origin, $quiz->id);
        }
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
        if (is_numeric($id)) {
            $quiz = DB::Table('quiz')->where([
                'user' => $id,
                'status' => 1,
            ])->get();
        } else {
            $quiz = DB::Table('quiz')->where([
                'id' => preg_replace("/[^0-9]/", "", $id),
                'status' => 1,
            ])->get();
        }


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
            'name' => 'min:10|max:255',
            'is_template' => 'boolean',
            'quality' => 'numeric|between:0,5.00',
            'status' => 'integer',
            'category' => 'integer',
            'user' => 'integer'
        ]);

        $userId = Auth::id();

        $quiz = Quiz::where([
            'id' => $id,
            'status' => 1,
        ])->firstOrFail();;


        $other_quiz = quiz::where([
            'name' => $request->name,
            'user' => $request->userId,
            'status' => 1,
        ])->first();


        if (isset($other_quiz)) {
            if ($id != $other_quiz->id) {
                return ('Ya tienes un quiz con ese nombre.');
                return Redirect::back()->withErrors(['msg', 'Ya tienes un quiz con ese nombre.']);
            }
        }

        if (isset($request->name)) {
            $quiz->name = $request->name;
        }
        if (isset($request->is_template)) {
            $quiz->is_template = $request->is_template;
        }
        if (isset($request->quality)) {
            $quiz->quality = $request->quality;
        }
        if (isset($request->status)) {
            $quiz->status = $request->status;
        }
        if (isset($request->category)) {
            $quiz->category = $request->category;
        }

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
        $quiz = Quiz::where([
            'id' => $id,
            'status' => 1,
        ])->firstOrFail();;

        $quiz->status = 0;

        $quiz->save();

        Session::flash('message', 'Quiz eliminado correctamente.
                                Si había quiz que usarón como plantilla este quiz, 
                                seguirán teniendo acceso al mismo.');
        return ('Eliminado');
    }

    public function encryptID($id)
    {
        return QuizController::encrypt_decrypt($id, 'encrypt');
    }
    public static function encrypt_decrypt($string, $action = 'encrypt')
    {
        $encrypt_method = "AES-256-CBC";
        $secret_key = 'AA74CDCC2BBRT935136HH7B63C27'; // user define private key
        $secret_iv = '5fgf5HJ5g27'; // user define secret key
        $key = hash('sha256', $secret_key);
        $iv = substr(hash('sha256', $secret_iv), 0, 16); // sha256 is hash_hmac_algo
        if ($action == 'encrypt') {
            $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
            $output = base64_encode($output);
        } else if ($action == 'decrypt') {
            $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
        }
        return $output;
    }
}
