<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\userController;
use App\Http\Controllers\humanController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\user_roleController;
use App\Http\Middleware\Role;

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


Route::post('/test', [LoginController::class, 'authenticate']);


// Route::group(['middleware'=>['auth']], function(){

    //AUTH
    Route::get('/login', 'SiteController@login')->name('login');
    Route::get('/signin', 'SiteController@signin')->name('signin');

    Route::resource('questions', 'questionController');
    //users
    Route::post('/users/desactivate/{id}', [userController::class, 'desactivate']);
    Route::post("/users/activate/{id}", [userController::class, 'activate']);
    Route::get('/users/roleFind/{role}',  [userController::class, 'roleFind']);
    Route::resource('users','userController',["except" => ['destroy']]);
    //human
    Route::post("/human/desactivate/{id}", [humanController::class, 'desactivate']);
    Route::resource('human','humanController', ["except" => ['destroy']]);
    //user-role
    Route::post("/user_role/desactivate/{id}", [user_roleController::class, 'desactivate']);
    Route::resource('user_role','user_roleController', ["except" => ['destroy']]);

// });


// Route::group(['middleware'=>['auth']], function(){
// });


//Route::middleware(['auth:sanctum', 'verified'])->get('/', function () {
    
//})->name('home');
