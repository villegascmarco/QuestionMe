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
        $title = "Inicio de sesión | QuestionMe!";
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

        SIGNUP

    */

    public function signup(){
        if(Auth::check()){
            return redirect('dashboard');
        }
        $title = "Registro | QuestionMe!";
        $styleSheets = [
            array('local'=>true,'route'=>'css/login/login.css')
        ];
        $jsDocs = [
            array('local'=>false,'route'=>'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.0/gsap.min.js'),            
            array('local'=>false,'route'=>'js/common/sweetalert2.all.min.js'),                                      
            array('local'=>true,'route'=>'js/common/formsvalidator.js'),
            array('local'=>true,'route'=>'js/modules/login/signup.js'),            
        ];
        return view('site.auth.signup',compact("title","styleSheets","jsDocs"));
    }

    /*
    
        DASHBOARD

    */

    public function dashboard(){
        $title = "Dashboard | QuestionMe!";
        $styleSheets = [
            array('local'=>true,'route'=>'css/dashboard.css'),
            array('local'=>true,'route'=>'css/module.css')
        ];
        $jsDocs = [
            array('local'=>true,'route'=>'js/modules/dashboard/dashboard.js')
        ];
        return view('dashboard',compact("title","styleSheets","jsDocs"));

    }

    /*
    
        USER 
    
    */
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
    /*
    
        USER CONFIG 
    
    */
    public function userConfig(){
        $title = "Mi cuenta";
        $styleSheets = [
            array('local'=>true,'route'=>'css/module.css'),
            array('local'=>true,'route'=>'css/user-config.css'),
            array('local'=>false,'route'=>'css/common/sweetalert2.min.css'),
        ];
        $jsDocs = [
            array('local'=>false,'route'=>'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.0/gsap.min.js'),            
            array('local'=>false,'route'=>'js/common/sweetalert2.all.min.js'),                          
            array('local'=>true,'route'=>'js/common/table.js'),
            array('local'=>true,'route'=>'js/common/formsvalidator.js'),
            array('local'=>true,'route'=>'js/modules/user/user-config.js'),
        ];
        return view('site.user-configuration.user-config',compact("title","styleSheets","jsDocs"));
    }
    /*

        CATEGORY

    */
    public function category(){
        $title = "Categorías | Administracion";
        $styleSheets = [
            array('local'=>true,'route'=>'css/module.css'),
            // array('local'=>true,'route'=>'css/user.css'),
            array('local'=>false,'route'=>'css/common/sweetalert2.min.css'),
        ];
        $jsDocs = [
            array('local'=>false,'route'=>'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.0/gsap.min.js'),            
            array('local'=>false,'route'=>'js/common/sweetalert2.all.min.js'),                          
            array('local'=>true,'route'=>'js/common/table.js'),
            array('local'=>true,'route'=>'js/common/formsvalidator.js'),
            array('local'=>true,'route'=>'js/modules/category/category.js'),
        ];
        return view('site.category-module.category',compact("title","styleSheets","jsDocs"));
    }

    public function quiz(){
        $title = "Encuestas | Administracion";
        $styleSheets = [            

            array('local'=>true,'route'=>'css/common.css'),
            array('local'=>false,'route'=>'css/navbar.css'),
            array('local'=>false,'route'=>'css/module.css'),
            array('local'=>false,'route'=>'css/common/sweetalert2.min.css')
        ];

        $jsDocs = [
            array('local'=>false,'route'=>'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.0/gsap.min.js'),                      
            array('local'=>true,'route'=>'js/modules/quiz/quiz-detail.js'),
            array('local'=>false,'route'=>'js/common/sweetalert2.all.min.js'),                          
            array('local'=>true,'route'=>'js/common/module.js'),
            array('local'=>true,'route'=>'js/common/formsvalidator.js'),            
        ];
        return view('site.quiz-module.quiz',compact("title","styleSheets","jsDocs"));
    }
  
    public function quizCreation(){
        $title = "Creando una encuesta";
        $styleSheets = [            
            array('local'=>true,'route'=>'css/common.css'),
            array('local'=>true,'route'=>'css/navbar.css'),
            array('local'=>true,'route'=>'css/module.css'),
            array('local'=>true,'route'=>'css/quiz.css'),
            array('local'=>true,'route'=>'css/common/sweetalert2.min.css')
        ];

        $jsDocs = [
            array('local'=>false,'route'=>'https://code.jquery.com/jquery-3.6.0.js'),      
            array('local'=>false,'route'=>'https://code.jquery.com/ui/1.12.1/jquery-ui.js'),
            array('local'=>false,'route'=>'js/common/sweetalert2.all.min.js'),        
            array('local'=>true,'route'=>'js/common/carousel.js'),
            array('local'=>true,'route'=>'js/common/wizard.js'),                          
            array('local'=>true,'route'=>'js/common/quiz.js'),
            array('local'=>true,'route'=>'js/common/formsvalidator.js'),            
        ];
        return view('site.quiz-module.quiz-creation',compact("title","styleSheets","jsDocs"));
    }

    public function quizReply(){
        $title = "Contestando una encuesta/cuestionario";
        $styleSheets = [            
            array('local'=>true,'route'=>'css/common.css'),
            array('local'=>true,'route'=>'css/navbar.css'),
            array('local'=>true,'route'=>'css/module.css'),
            array('local'=>true,'route'=>'css/quiz.css'),
            array('local'=>true,'route'=>'css/quiz-reply.css'),
            array('local'=>true,'route'=>'css/common/sweetalert2.min.css')
        ];

        $jsDocs = [
            array('local'=>false,'route'=>'https://code.jquery.com/jquery-3.6.0.js'),      
            array('local'=>false,'route'=>'https://code.jquery.com/ui/1.12.1/jquery-ui.js'),
            array('local'=>false,'route'=>'js/common/sweetalert2.all.min.js'),        
            array('local'=>true,'route'=>'js/common/carousel.js'),
            array('local'=>true,'route'=>'js/common/wizard.js'),                          
            array('local'=>true,'route'=>'js/common/formsvalidator.js'),            
        ];
        return view('site.quiz-module.quiz-reply',compact("title","styleSheets","jsDocs"));
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
