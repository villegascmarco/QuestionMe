<?php

namespace App\Http\Controllers;

use App\Models\human;
use Illuminate\Http\Request;

class humanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $table = human::all();
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
        $Human = new human();
        $Human->name =  $request->name;
        $Human->last_name =  $request->last_name;
        $Human->picture =  $request->picture;
        $Human->date_birth =  $request->date_birth;
        $Human->email =  $request->email;
        $Human->status =  $request->status;
        $Human->save();
        return response()->json($Human);


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $model = human::find($id);
        return response()->json($model);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
       $model = human::find($id);
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
        $model = human::find($id);
        $model->name =  $request->name;
        $model->last_name =  $request->last_name;
        $model->picture =  $request->picture;
        $model->date_birth =  $request->date_birth;
        $model->email =  $request->email;
        $model->status =  $request->status;
        $model->save();
        return response()->json($model);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // este metodo no se usa 
    }

    public function desactivate($id){
        $model = human::find($id);
        $model->status = 0;
        $model->save();
        return response()->json($model);
    }
}
