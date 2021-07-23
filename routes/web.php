<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\categoryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('main');
});

// Resource::
Route::get('/login', 'SiteController@login')->name('login');
Route::resource('questions', 'questionController');


//Category
Route::post('/categorys/desactivate/{id}', [categoryController::class, 'desactivate']);
Route::post('/categorys/activate/{id}', [categoryController::class, 'activate']);
Route::resource('categorys', 'categoryController', ["except" => ['destroy']]);



Route::get('login/facebook', 'Auth\LoginFacebookController@redirect');
Route::get('login/facebook/callback', 'Auth\LoginFacebookController@callback');


Route::group(['middleware'=>['auth']], function(){
    Route::get('/user','SiteController@user');
});
