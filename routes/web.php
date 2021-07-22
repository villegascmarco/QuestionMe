<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\userController;
use App\Http\Controllers\humanController;
use App\Http\Controllers\user_roleController;

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

//users
Route::post('/users/desactivate/{id}', [userController::class, 'desactivate']);
Route::get('/users/roleFind/{role}',  [userController::class, 'roleFind']);
Route::resource('users','userController',["except" => ['destroy']]);

//human
Route::post("/human/desactivate/{id}", [humanController::class, 'desactivate']);
Route::resource('human','humanController', ["except" => ['destroy']]);

//user-role
Route::post("/user_role/desactivate/{id}", [user_roleController::class, 'desactivate']);
Route::resource('user_role','user_roleController', ["except" => ['destroy']]);

Route::get('login/facebook', 'Auth\LoginFacebookController@redirect');
Route::get('login/facebook/callback', 'Auth\LoginFacebookController@callback');

Route::get('/user','SiteController@user');
// Route::group(['middleware'=>['auth']], function(){
// });
