<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\userEloquent;
use App\Models\human;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {   
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $usuario = DB::table('user')
        ->join('human', 'user.human', "=", "human.id")
        //->where('user.password', bcrypt($request->password))
        ->where('human.email', $request->email)
        ->first();    

        if ($usuario) {
            // $request->session()->regenerate();
            Auth::loginUsingId($usuario->id);
            $response = ['status' => 'A',
            'response' => 'Macaco'];

            return Auth::user();
        }

        $response = ['status' => 'A',
        'response' => 'Macaco triste'];

        
        return $response;

    //    return back()->withErrors([
    //        'email' => 'The provided credentials do not match our records.',
    //     ]);
    }
}