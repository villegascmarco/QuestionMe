<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\userController;
use App\Http\Controllers\humanController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\user_roleController;
use App\Http\Controllers\reportsController;
use App\Http\Middleware\Role;
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



//MainPage
Route::get('/', 'SiteController@frontpage');
//AUTH
Route::get('/login', 'SiteController@login')->name('login');
Route::get('/signup', 'SiteController@signup')->name('signup');
Route::post('/auth', [LoginController::class, 'authenticate']);
Route::post('/registration', [LoginController::class, 'signUp'])->name('registration');
Route::post('/authenticateWithSocialMedia', [LoginController::class, 'authenticateWithSocialMedia']);
Route::get('/logout', [LoginController::class, 'logout']);
//Main page
Route::get('/', 'SiteController@frontpage');
//Users
Route::get('/users/userNameTaken/{name}',  [userController::class, 'userNameTaken']);
Route::get('/users/userNameTakenExceptSelf/{id}/{name}',  [userController::class, 'userNameTakenExceptSelf']);
Route::get('/users/emailUsed/{name}',  [userController::class, 'emailUsed']);
Route::get('/users/emailUsedExceptSelf/{id}/{email}',  [userController::class, 'emailUsedExceptSelf']);

Route::group(['middleware' => ['auth']], function () {
    Route::post('/updateSelf', [userController::class, 'updateSelf']);
    Route::post('/updateSelfPicture', [userController::class, 'updateSelfPicture']);
    Route::get('/getSelfData', [userController::class, 'getSelfData']);

    Route::group(['middleware' => ['is.admin']], function () {
        //users
        Route::post('/users/desactivate/{id}', [userController::class, 'desactivate']);
        Route::post("/users/activate/{id}", [userController::class, 'activate']);
        Route::get('/users/roleFind/{role}',  [userController::class, 'roleFind']);
        Route::resource('users', 'userController', ["except" => ['destroy']]);
        Route::get('/user', 'SiteController@user');
        //user-role
        Route::post("/user_role/desactivate/{id}", [user_roleController::class, 'desactivate']);
        Route::resource('user_role', 'user_roleController', ["except" => ['destroy']]);
        //Category
        Route::post('/categories/desactivate/{id}', [categoryController::class, 'desactivate']);
        Route::post('/categories/activate/{id}', [categoryController::class, 'activate']);
        Route::get('/category', 'SiteController@category');
    });


    Route::resource('quizzes', 'QuizController');
    Route::resource('quizzes.answers', 'AnswerSelectedController');
    Route::resource('quizzes.questions', 'QuestionController');
    Route::resource('quizzes.questions.answers', 'PossibleAnswerController');

    Route::get('quizzesE/{id}', 'QuizController@encryptID');

    
    Route::resource('users.notifications', 'NotificationController');

    Route::resource('categories', 'categoryController', ["except" => ['destroy']]);
    // Route::resource('questions', 'questionController');        
    //Dashboard
    Route::get("/dashboard", 'SiteController@dashboard');
    // Resource::
    // Route::resource('questions', 'questionController');
    //Quiz
    Route::get('/quiz', 'SiteController@quiz');
    Route::get('/new-quiz', 'SiteController@quizCreation');
    Route::get('/quiz-reply', 'SiteController@quizReply');

    Route::get('/getUserPicture/{id}', [userController::class, 'getUserPicture']);
    Route::get('/my-account', 'SiteController@userConfig');
    Route::get('/testForNotification', 'userController@testForNotification');

    Route::get('/templateReport/{id}','reportsController@getReportTemplates');
    Route::get('/humanReport/{id}','reportsController@getReportPersonResponseQuiz');
    Route::get('/responseReport/{id}','reportsController@getReportRespose');
    
});

Route::resource('nonHuman', 'NonRegisteredHumanController');

//Route::resource('notifications', 'NotificationController');

// Route::group(['middleware'=>['auth']], function(){
// });
