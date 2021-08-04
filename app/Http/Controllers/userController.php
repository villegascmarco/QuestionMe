<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Models\human;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class userController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = DB::table('user')
        ->join('human', 'user.human', "=", "human.id")
        ->join('user_role as role', 'user.role', "=", "role.id")
        ->select('user.id as id','user.name as nameUser', 'user.password', 'user.status as statusUser', 'user.role', 'user.human',
            'human.id as human', 'human.name as name', 'human.last_name', 'human.picture', 'human.date_birth',
            'human.email', 'human.status as status','user.creado_en',
            'role.id as role','role.name as roleName')->get();
     
      return response()->json($users);
                 
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
        $response = [];
        $validated = $request->validate([
            'name' => 'required',
            // 'last_name' => 'required',
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
                $Human = new human();
                $Human->name =  $request->name;
                $Human->last_name =  $request->last_name;
                $Human->picture =  $request->picture;
                $Human->date_birth =  $request->date_birth;
                $Human->email =  $request->email;
                $Human->status =  $request->status;
                $Human ->save(); 
                //creaccion del usuario obteniendo la id del humano
                $User = new User();
                $User->name =  $request->nameUser;
                $User->password = bcrypt($request->password);
                $User->creado_en = $request->creado_en;
                $User->status = $request->statusUser;
                $User->role =  $request->role;
                $User->human = $Human->id;
                $User->save(); 
    
                DB::commit();
            } catch (\Throwable $th) {
                $response = ['status' => 'error',
                             'response' => 'Ocurrió un error al insertar Usuario o Humano.',
                             'error' => $th];
                DB::rollback();
                return $response;                
            }
            $response = [
                'status' => 'OK',
                'user' => $User
            ];
            return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $model = User::find($id);
        return $model;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
       $model = User::find($id);
       return($model);
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
        $response = [];
        $validated = $request->validate([
            'name' => 'required',
            // 'last_name' => 'required',
            'date_birth' => 'required',
            'email' => 'required',
            'nameUser' => 'required',
            'password' => 'required',
        ]);
        $modelUser =  User::find($id);
        $modelHuman = human::find($request->human);

        //validacion del si el nombre de ususario ya existe
        $exists = User::where([
            'name' => $request->nameUser,
        ])
        ->where("id","!=", $request->id)
        ->exists();

        if ($exists) {
            $response = ['status' => 'error',
                         'response' => 'Ya existe un usuario con este nombre de usuario.'];
            return $response;
            return Redirect::back()->withErrors(['msg', 'Ya Exite un usuario con el mismo nombre.']);
        }
       
        //si el modelo humano no encuentra la id manda mensaje de error
        if (!isset($modelHuman)) {
             $response = ['status' => 'error',
                            'response' => 'No Existe la ID del humano'];
            return $response;
            return Redirect::back()->withErrors(['msg', 'No existe ese ID del Humano']);
        }
        //si el modelo de usuario no encuentra la id manda mensaje de error
        if (!isset($modelUser)) {
               $response = ['status' => 'error',
                           'response' => 'No Existe la ID del Usuario'];
           return $response;
           return Redirect::back()->withErrors(['msg', 'No existe ese ID del Usuario']);
       }

        try {
            DB::beginTransaction();

            $modelUser->name =  $request->nameUser;
            if($request -> paswword){
                $modelUser->password = bcrypt($request->password);
            }
            $modelUser->creado_en = $request->creado_en;
            $modelUser->status = $request->statusUser;
            $modelUser->role =  $request->role;
            $modelUser->human = $modelHuman->id;
            $modelUser->save();

            $modelHuman->name =  $request->name;
            $modelHuman->last_name =  $request->last_name;
            $modelHuman->picture =  $request->picture;
            $modelHuman->date_birth =  $request->date_birth;
            $modelHuman->email =  $request->email;
            $modelHuman->status =  $request->status;
            $modelHuman->save();
            DB::commit();
        } catch (\Throwable $th) {
            $response = ['status' => 'error',
                         'response' => 'Ocurrió un error al Modificar Usuario o Humano.',
                         'error' => $th];
            DB::rollback();
            return $response;            
        }
        $response = ['status' => 'OK'];
        return $response;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //No se usa este metodo
    }

    public function activate($id){
        $response = [];
        $model = User::find($id);
         //si el modelo de usuario no encuentra la id manda mensaje de error
         if (!isset($model)) {
            $response = ['status' => 'error',
                        'response' => 'No Existe la ID del Usuario'];
            return $response;            
        }
        $model->status = 1;
        
        try {
            $model->save();
        } catch (\Throwable $th) {
            $response = ['status' => 'error',
                         'response' => 'Ocurrió un error al activar Usuario.',
                         'error' => $th];
            return $response;            
        }
        $response = ['status' => 'OK'];
        return $response;
    }

    public function desactivate($id){
        $response = [];
        $model = User::find($id);
         //si el modelo de usuario no encuentra la id manda mensaje de error
         if (!isset($model)) {
            $response = ['status' => 'error',
                        'response' => 'No Existe la ID del Usuario'];
            return $response;            
        }
        $model->status = 0;
        
        try {
            $model->save();
        } catch (\Throwable $th) {
            $response = ['status' => 'error',
                         'response' => 'Ocurrió un error al desactivar Usuario.',
                         'error' => $th];
            return $response;            
        }
        $response = ['status' => 'OK'];
        return $response;
    }

    public function roleFind($role){

        $users = DB::table('user')
        ->join('human', 'user.human', "=", "human.id")
        ->join('user_role as role', 'user.role', "=", "role.id")
        ->select('user.id as id','user.name as nameUser', 'user.password', 'user.status as statusUser', 'user.role', 'user.human',
            'human.id as human', 'human.name as name', 'human.last_name', 'human.picture', 'human.date_birth',
            'human.email', 'human.status as status','user.creado_en',
            'role.id as role','role.name as roleName')
        ->where("role","=", $role)
        ->get();

        // $model = User::->get();
        return $users;
    }

    public function userNameTaken($name){
        try {

            $exists = User::where([
                'name' => $name,
            ])
            ->exists();
        } catch (\Throwable $th) {
            $response = ['status' => 'error',
                         'response' => 'Ocurrió un error al verificar el email.'];
            return $response;
        }

        $response = ['status' => 'OK',
        'response' => FALSE];
        if ($exists) {
            $response = ['status' => 'OK',
            'response' => TRUE];
        }
        return $response;
}

    public function emailUsed($email){
        try {
            $exists = human::where([
                'email' => $email,
            ])
            ->exists();

        } catch (\Throwable $th) {
            $response = ['status' => 'error',
                         'response' => 'Ocurrió un error al verificar el email.'];
            return $response;
        }

        $response = ['status' => 'OK',
        'response' => FALSE];
        if ($exists) {
            $response = ['status' => 'OK',
            'response' => TRUE];

        }
        return $response;
    }

    public function getUserPicture($id){
        try {
        $picture = DB::table('user')
         ->join('human', 'user.human', "=", "human.id")
         ->select('human.picture')
         ->where("user.id","=", $id)->first();
        
        $response = ['status' => 'OK',
        'picture' => $picture];
        return $response;
        
        } catch (\Throwable $th) {
             $response = ['status' => 'error',
                        'response' => 'Ocurrió un error al consultar fotografias.'];
        return $response;
        }

    }
}
