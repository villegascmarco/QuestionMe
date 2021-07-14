<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiteController;

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

Route::get('/login','SiteController@login')->name('login');

Route::group(['middleware'=>['auth']], function(){
    Route::get('/user','SiteController@user');
});
