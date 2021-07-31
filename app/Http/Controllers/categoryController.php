<?php

namespace App\Http\Controllers;

use App\Models\category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

class categoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $table = category::all();
        return $table;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       
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
        ]);
        //validacion del si el nombre de la categoria ya existe
        $exists = category::where([
            'name' => $request->name,
        ])->exists();

        if ($exists) {
            $response = ['status' => 'error',
                         'response' => 'Ya existe una categoria con el mismo nombre.'];
            return $response;
            return Redirect::back()->withErrors(['msg', 'Ya existe una categoria con el mismo nombre.']);
        }

        try {  
        $category = new category();
        $category->name = $request->name;
        $category->status = 1;
        $category->save();
        } catch (\Throwable $th) {
            $response = ['status' => 'error',
                        'response' => 'Ocurrió un error al insertar Una nueva categoria.',
                        'error' => $th];
            return $response;
            return Redirect::back()->withErrors(['msg', 'Ocurrió un error al insertar Una nueva categoria']);
        }
        $response = ['status' => 'OK',
                    'category' => $category];
        return $response;
    }
     /** Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $modelCategory = category::find($id);
        return $modelCategory;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
       $modelCategory = category::find($id);
       return($modelCategory);
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
        ]);

        $modelCategory = category::find($id);
        //validacion del si el nombre de la categoria ya existe
        $exists = category::where([
            'name' => $request->name,
        ])->exists();

        if ($exists) {
            $response = ['status' => 'error',
                         'response' => 'Ya existe una categoria con el mismo nombre.'];
            return $response;
            return Redirect::back()->withErrors(['msg', 'Ya existe una categoria con el mismo nombre.']);
        }

         //si el modelo categoria no se encuentra
         if (!isset($modelCategory)) {
            $response = ['status' => 'error',
                           'response' => 'No Existe la ID de la categoria'];
           return $response;
           return Redirect::back()->withErrors(['msg', 'No existe ese ID de la categoria']);
       }

       try{
           $modelCategory->name = $request->name;
           $modelCategory->save();

       }catch (\Throwable $th) {
            $response = ['status' => 'error',
                         'response' => 'Ocurrió un error al Modificar la categoria.',
                         'error' => $th];
            return $response;
            return Redirect::back()->withErrors(['msg', 'Ocurrió un error al Modificar la categoria']);
        }
        $response = ['status' => 'OK',
                     'category' => $modelCategory];
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
        //
    }

    public function desactivate($id){
        $response = [];
        $model = category::find($id);
         //si el modelo de la Categoria no encuentra la id manda mensaje de error
         if (!isset($model)) {
            $response = ['status' => 'error',
                        'response' => 'No Existe la ID del la Categoria'];
        return $response;
        return Redirect::back()->withErrors(['msg', 'No existe ese ID del la categoria']);
        }
        $model->status = 0;
        try {
            $model->save();
        } catch (\Throwable $th) {
            $response = ['status' => 'error',
                         'response' => 'Ocurrió un error al desactivar Categoria.',
                         'error' => $th];
            return $response;
            return Redirect::back()->withErrors(['msg', 'Ocurrió un error al desactivar Categoria']);
        }
        $response = ['status' => 'OK'];
        return $response;
    }

    public function activate($id){
        $response = [];
        $model = category::find($id);
         //si el modelo de la categoria  no encuentra la id manda mensaje de error
         if (!isset($model)) {
            $response = ['status' => 'error',
                        'response' => 'No Existe la ID del la Categoria '];
        return $response;
        return Redirect::back()->withErrors(['msg', 'No existe ese ID del Categoria']);
        }
        $model->status = 1;
        try {
            $model->save();
        } catch (\Throwable $th) {
            $response = ['status' => 'error',
                         'response' => 'Ocurrió un error al Activar Categoria.',
                         'error' => $th];
            return $response;
            return Redirect::back()->withErrors(['msg', 'Ocurrió un error al Activar Categoria.']);
        }
        $response = ['status' => 'OK'];
        return $response;
    }
}
