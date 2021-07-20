<?php

namespace App\Http\Controllers;


use App\Models\userEloquent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use User;
use App\Models\human;

class userController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $table = userEloquent::all();
        return $table;
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
        //validacion del si el nombre de ususario ya existe
        $exists = userEloquent::where([
            'name' => $request->nameUser,
        ])->exists();

        if ($exists) {
            return ('Ya existe un usuario con este nombre de usuario.');
            return Redirect::back()->withErrors(['msg', 'Ya Exite un usuario con el mismo nombre.']);
        }

        // insercion de datos personales del humano
        $Human = new human();
        $Human->name =  $request->name;
        $Human->last_name =  $request->last_name;
        $Human->picture =  $request->picture;
        $Human->date_birth =  $request->date_birth;
        $Human->email =  $request->email;
        $Human->status =  $request->status;
        $Human->save();
        //creaccion del usuario obteniendo la id del humano
        $User = new userEloquent();
        $User->name =  $request->nameUser;
        $User->password = bcrypt($request->password);
        $User->status = $request->statusUser;
        $User->role =  $request->role;
        $User->human = $Human->id;
        $User->save();
        return response()->json($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $model = userEloquent::find($id);
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
       $model = userEloquent::find($id);
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
        $modelHuman = human::find($id);
        $modelHuman->name =  $request->name;
        $modelHuman->last_name =  $request->last_name;
        $modelHuman->picture =  $request->picture;
        $modelHuman->date_birth =  $request->date_birth;
        $modelHuman->email =  $request->email;
        $modelHuman->status =  $request->status;
        $modelHuman->save();

        $modelUser =  userEloquent::find($id);
        $modelUser->name =  $request->nameUser;
        if($request -> paswword){
            $modelUser->password = bcrypt($request->password);
        }
        $modelUser->status = $request->statusUser;
        $modelUser->role =  $request->role;
        $modelUser->human = $modelHuman->id;
        $modelUser->save();
        return response()->json($request);

       // userEloquent::where("human","=",$modelHuman->id)->update( 
        //[    
          //'name' => $request->nameUser,
          //'password' => bcrypt($request->password),
          //'status' => $request->status,
          //'role' => $request->role,
          //'human' =>$modelHuman->id,
        //]);
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

    public function desactivate($id){
        $model = userEloquent::find($id);
        $model->status = 0;
        $model->save();
        return response()->json($model);
    }

    public function roleFind($role){
        $model = userEloquent::where("role","=", $role)->get();
        return $model;
    }
}
