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
            $response = ['status' => 'OK',
                'response' => 'Login correcto'];            
            return response()->json($response);            
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
                $usuarioCheck->name =  $request->nameUser;            
                $usuarioCheck->creado_en = $request->creado_en;
                $usuarioCheck->status = $request->statusUser;
                $usuarioCheck->role =  $request->role;
                $usuarioCheck->human = $modelHuman->id;
                $usuarioCheck->save();
    
                $human = Human::where('id',$usuarioCheck->human);
    
                $human->name = $request->name;
                $human->last_name =  $request->last_name;
                $human->picture =  $request->picture;
                $human->date_birth =  $request->date_birth;
                $human->email =  $request->email;
                $human->status =  $request->status;
                $human->save();
                DB::commit();

                Auth::loginUsingId($usuarioCheck->id);
                $response = ['status' => 'OK',
                    'response' => 'Login correcto'];            
                return response()->json($response);            
                
            } catch (\Throwable $th) {
                $response = ['status' => 'error',
                         'response' => 'Ocurrió un error al autenticar.',
                         'error' => $th];
                DB::rollback();
                return response()->json($response);            
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
            $human ->save(); 
            
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
    
            $response = ['status' => 'OK',
                'response' => 'Login correcto'];   
            var_dump($response);
            return response()->json($response);            

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
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::logout();
    
        $request->session()->invalidate();
    
        $request->session()->regenerateToken();
    
        return redirect('/');
    }
    

}