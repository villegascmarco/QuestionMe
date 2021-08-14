<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\human;
use Illuminate\Support\Facades\DB;
use Hash;

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
        ->where('human.email', $request->email)
        ->first();
        
        
        if ($usuario && Hash::check($request->password,$usuario->password)) {            
            Auth::loginUsingId($usuario->id);
            
            session(['userPicture' => $usuario->picture]);

            $response = ['status' => 'OK',
                'response' => 'Login correcto'];            
            return $response;
        }

        $response = ['status' => 'error',
        'response' => 'No se ha podido autenticar, revisa las credenciales'];
        return $response;

    }
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticateWithSocialMedia(Request $request)
    {

        $credentials = $request->validate([
            'name' => 'required',            
            'date_birth' => 'required',
            'email' => 'required|email',
            'nameUser' => 'required'
        ]);

        $usuarioCheck = User::where('social_id',$request->id)->first();
        //Usuario registrado, actualizar con los datos provenientes de facebook        
        if ($usuarioCheck) {           
            try {
                
                DB::beginTransaction();
                $human = human::where('id',$usuarioCheck->human)->first();
                // return $human;
                $human->name = $request->name;
                $human->last_name =  $request->last_name;
                $human->picture =  $request->picture;
                $human->date_birth =  $request->date_birth;
                $human->email =  $request->email;
                $human->status =  $request->status;
                $human->save();
                

                $usuarioCheck->name =  $request->nameUser;            
                $usuarioCheck->creado_en = $request->creado_en;
                $usuarioCheck->status = $request->statusUser;                
                $usuarioCheck->human = $human->id;
                $usuarioCheck->save();
    
    
                DB::commit();

                Auth::loginUsingId($usuarioCheck->id);
                
                session(['userPicture' => $human->picture]);

                $response = ['status' => 'OK',
                    'response' => 'Login correcto'];            
                return $response;
                
            } catch (\Throwable $th) {
                $response = ['status' => 'error',
                         'response' => 'Ocurrió un error al autenticar.',
                         'error' => $th];
                DB::rollback();
                return $response;            
            } 

        }
        //Usuario no registrado, registrar con los datos provenientes de facebook
        try {
            DB::beginTransaction();            
            $human = new human();
            $human->name = $request->name;
            $human->last_name = $request->last_name;
            $human->picture = $request->picture;
            $human->date_birth = $request->date_birth;
            $human->email = $request->email;
            $human->status = $request->status;
            $human->save(); 
            
            $usuario = new User();
            $usuario->social_id = $request->id;
            $usuario->name = $request->nameUser;
            $usuario->password = bcrypt('no password');
            $usuario->creado_en = $request->creado_en;
            $usuario->status = $request->statusUser;
            $usuario->role =  $request->role;
            $usuario->human = $human->id;
            $usuario->save(); 
            DB::commit();

            Auth::loginUsingId($usuario->id);
            
            session(['userPicture' => $human->picture]);
    
            $response = ['status' => 'OK',
                'response' => 'Login correcto'];
            return $response;            

        } catch (\Throwable $th) {
            $response = ['status' => 'error',
                         'response' => 'Ocurrió un error al autenticar el Usuario.',
                         'error' => $th];
            DB::rollback();
            return $response;            
        }
        $response = ['status' => 'error',
        'response' => 'No se ha podido autenticar, revisa las credenciales'];
        return $response;

    }
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function signUp(Request $request)
    {
        $response = [];
        $validated = $request->validate([
            'name' => 'required',            
            'date_birth' => 'required',
            'email' => 'required|email',
            'nameUser' => 'required',
            'password' => 'required',
        ]);

        //validacion del si el nombre de ususario ya existe
        $exists = User::where([
            'name' => $request->nameUser,
        ])->exists();

        if ($exists) {
            $response = ['status' => 'error',
                         'response' => 'Ya existe un usuario con este nombre de usuario.'];
            return $response;
            return Redirect::back()->withErrors(['msg', 'Ya Exite un usuario con el mismo nombre.']);
        }
            try {
                DB::beginTransaction();
                // insercion de datos personales del humano
                $human = new human();
                $human->name =  $request->name;
                $human->last_name =  $request->last_name;
                $human->picture =  $request->picture;
                $human->date_birth =  $request->date_birth;
                $human->email =  $request->email;
                $human->status =  $request->status;
                $human ->save(); 
                //creaccion del usuario obteniendo la id del humano
                $usuario = new User();
                $usuario->name =  $request->nameUser;
                $usuario->password = bcrypt($request->password);
                $usuario->creado_en = $request->creado_en;
                $usuario->status = $request->statusUser;
                $usuario->role =  $request->role;
                $usuario->human = $human->id;
                $usuario->save();     
                DB::commit();
                
                Auth::loginUsingId($usuario->id);
                session(['userPicture' => $human->picture]);
                $response = ['status' => 'OK',
                    'response' => 'Login correcto'];
                return $response;   
            } catch (\Throwable $th) {
                $response = ['status' => 'error',
                             'response' => 'Ocurrió un error al insertar Usuario o Humano.',
                             'error' => $th];
                DB::rollback();
                return $response;                
            }
            
    }

    
    
    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::logout();
    
        $request->session()->forget('userPicture');

        $request->session()->invalidate();
    
        $request->session()->regenerateToken();
        
        return redirect('/');
    }
    
}