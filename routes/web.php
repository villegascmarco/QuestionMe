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

Route::get('/','SiteController@frontpage');

// Resource::
Route::resource('questions', 'questionController');

//users
Route::get('/users/userNameTaken/{name}',  [userController::class, 'userNameTaken']);
Route::get('/users/emailUsed/{name}',  [userController::class, 'emailUsed']);
Route::post('/users/desactivate/{id}', [userController::class, 'desactivate']);
Route::post("/users/activate/{id}", [userController::class, 'activate']);
Route::get('/users/roleFind/{role}',  [userController::class, 'roleFind']);
Route::resource('users','userController',["except" => ['destroy']]);
Route::get('/user','SiteController@user');

//human
Route::post("/human/desactivate/{id}", [humanController::class, 'desactivate']);
Route::resource('human','humanController', ["except" => ['destroy']]);

//user-role
Route::post("/user_role/desactivate/{id}", [user_roleController::class, 'desactivate']);

Route::resource('user_role','user_roleController', ["except" => ['destroy']]);

Route::get('login/facebook', 'Auth\LoginFacebookController@redirect');
Route::get('login/facebook/callback', 'Auth\LoginFacebookController@callback');

//AUTH
Route::get('/login', 'SiteController@login')->name('login');
Route::get('/signin', 'SiteController@signin')->name('signin');



// Route::group(['middleware'=>['auth']], function(){
    // });

