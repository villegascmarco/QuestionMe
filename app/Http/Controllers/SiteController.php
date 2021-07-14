<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class SiteController extends Controller
{
    public function login(){
        $title = "Inicio de sesión";
        $styleSheets = [
            array('local'=>true,'route'=>'css/login/login.css')
        ];
        $jsDocs = [];
        return view('site.auth.login',compact("title","styleSheets","jsDocs"));
    }
    
    public function user(){
        $title = "Usuarios | Administracion";
        $styleSheets = [
            array('local'=>true,'route'=>'css/module.css')
        ];
        $jsDocs = [
            array('local'=>true,'route'=>'js/table.js'),
            array('local'=>true,'route'=>'js/module.js'),
            array('local'=>true,'route'=>'js/user.js'),
            array('local'=>false,'route'=>'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.0/gsap.min.js')            
        ];
        return view('site.user-module.user',compact("title","styleSheets","jsDocs"));
    }

    public function register(){
        $title = "Registro";
        $styleSheets = [
            array('local'=>true,'route'=>'css/register/register.css')
        ];
        $jsDocs = [];
        return view('site.register.register',compact("title","styleSheets","jsDocs"));
    }

    public function loginPost(Request $request){

        // Ejecutar validaciones de la petición
        $validateData = $request->validate([
            'password' => 'required|min:5|max:10',
            'email' => 'required|email'
        ]);
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return redirect()->route('home');
        } else {
        return Redirect()->route('login')->withErrors(
            ["password"=>"Las credenciales no coinciden"]);
        }
    }




}
