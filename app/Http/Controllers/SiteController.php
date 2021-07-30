<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class SiteController extends Controller
{

    /*

        FRONTPAGE

    */
      
    public function frontpage(){
        $title = "QuestionnMe!";
        $styleSheets = [
            array('local'=>true,'route'=>'css/frontpage.css')
        ];
        $jsDocs = [
            array('local'=>false,'route'=>'https://code.jquery.com/jquery-3.6.0.js'),
            array('local'=>true,'route'=>'js/frontpage.js')
        ];
        return view('frontpage',compact("title","styleSheets","jsDocs"));
    }
    

    /*

        LOGIN

    */

    public function login(){

        if(Auth::check()){
            return redirect('dashboard');
        }
        $title = "Inicio de sesión";
        $styleSheets = [
            array('local'=>true,'route'=>'css/module.css'),
            array('local'=>true,'route'=>'css/login/login.css')
        ];
        $jsDocs = [
            array('local'=>false,'route'=>'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.0/gsap.min.js'),            
            array('local'=>false,'route'=>'js/common/sweetalert2.all.min.js'),                                      
            array('local'=>true,'route'=>'js/common/formsvalidator.js'),
            array('local'=>true,'route'=>'js/modules/login/login.js'),            
        ];
        return view('site.auth.login',compact("title","styleSheets","jsDocs"));
    }
    /*

        SIGNIN

    */

    public function signin(){
        $title = "Inicio de sesión";
        $styleSheets = [
            array('local'=>true,'route'=>'css/login/login.css')
        ];
        $jsDocs = [
            array('local'=>false,'route'=>'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.0/gsap.min.js'),            
            array('local'=>false,'route'=>'js/common/sweetalert2.all.min.js'),                                      
            array('local'=>true,'route'=>'js/common/formsvalidator.js'),
            array('local'=>true,'route'=>'js/modules/login/login.js'),            
        ];
        return view('site.auth.signin',compact("title","styleSheets","jsDocs"));
    }

    /*
    
        DASHBOARD

    */

    public function dashboard(){
        $title = "Dashboard | QuestionMe!";
        $styleSheets = [];
        $jsDocs = [];
        return view('dashboard',compact("title","styleSheets","jsDocs"));

    }



    public function user(){
        $title = "Usuarios | Administracion";
        $styleSheets = [
            array('local'=>true,'route'=>'css/module.css'),
            array('local'=>true,'route'=>'css/user.css'),
            array('local'=>false,'route'=>'css/common/sweetalert2.min.css'),
        ];
        $jsDocs = [
            array('local'=>false,'route'=>'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.0/gsap.min.js'),            
            array('local'=>false,'route'=>'js/common/sweetalert2.all.min.js'),                          
            array('local'=>true,'route'=>'js/common/table.js'),
            array('local'=>true,'route'=>'js/common/formsvalidator.js'),
            array('local'=>true,'route'=>'js/modules/user/user.js'),
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
