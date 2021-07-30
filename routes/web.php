<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\userController;
use App\Http\Controllers\humanController;
use App\Http\Controllers\user_roleController;
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

Route::get('/', 'SiteController@frontpage');

// Resource::
Route::get('/login', 'SiteController@login')->name('login');
Route::resource('nonHuman', 'NonRegisteredHumanController');
Route::resource('quizzes', 'QuizController');
Route::resource('quizzes.answers', 'AnswerSelectedController');
Route::resource('quizzes.questions', 'QuestionController');
Route::resource('quizzes.questions.answers', 'PossibleAnswerController');

//users
Route::post('/users/desactivate/{id}', [userController::class, 'desactivate']);
Route::post("/users/activate/{id}", [userController::class, 'activate']);
Route::get('/users/roleFind/{role}',  [userController::class, 'roleFind']);
Route::resource('users', 'userController', ["except" => ['destroy']]);

//human
Route::post("/human/desactivate/{id}", [humanController::class, 'desactivate']);
Route::resource('human', 'humanController', ["except" => ['destroy']]);

//user-role
Route::post("/user_role/desactivate/{id}", [user_roleController::class, 'desactivate']);

Route::resource('user_role', 'user_roleController', ["except" => ['destroy']]);

//Category
Route::post('/categories/desactivate/{id}', [categoryController::class, 'desactivate']);
Route::post('/categories/activate/{id}', [categoryController::class, 'activate']);
Route::resource('categories', 'categoryController', ["except" => ['destroy']]);



Route::get('login/facebook', 'Auth\LoginFacebookController@redirect');
Route::get('login/facebook/callback', 'Auth\LoginFacebookController@callback');

Route::get('/user', 'SiteController@user');

Route::get('/quiz', 'SiteController@quiz');

Route::get('/new-quiz', 'SiteController@quizCreation');

// Route::group(['middleware'=>['auth']], function(){
// });
