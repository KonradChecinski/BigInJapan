<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

//AUTH
Route::group(['prefix' => '/auth'], function () {
    Route::post('/register', [AuthController::class, 'createUser']);
    Route::post('/login', [AuthController::class, 'loginUser']);
});





Route::group(['middleware' => 'auth:sanctum'], function (){
    Route::get('/', function (Request $request) {
        return response()->json('Działa!');
    });

    Route::group(['prefix' => 'table'], function (){
        Route::get('/', [TableController::class, 'index']);
        Route::get('/get', [TableController::class, 'getUserTable']);

        Route::get('/info/{table}', [TableController::class, 'getTableInfo']);
        Route::put('/name/{table}', [TableController::class, 'updateName']);

        Route::post('/', [TableController::class, 'create']);
        Route::delete('/{id}', [TableController::class, 'destroy']);

        Route::post('/share', [TableController::class, 'shareTable']);
        Route::get('/shared/{table}', [TableController::class, 'getSharedUser']);
        Route::put('/shared/{table}', [TableController::class, 'updateSharedUser']);
        Route::delete('/shared/{table}', [TableController::class, 'deleteSharedUser']);
    });

    Route::group(['prefix' => 'panel'], function (){
       Route::get('/', [PanelController::class, 'index']);
    });

    Route::group(['prefix' => 'table/{table}/panel'], function (){
        Route::get('/', [PanelController::class, 'getTablePanels']);
        Route::post('/', [PanelController::class, 'create']);
        Route::delete('/{panel}', [PanelController::class, 'destroy']);
        Route::put('/{panel}', [PanelController::class, 'update']);
    });

    Route::group(['prefix' => 'tasks'], function (){
        Route::get('/', [TaskController::class, 'index']);
    });
    Route::group(['prefix' => 'table/{table}/panel/{panel}/task'], function (){
        Route::get('/', [TaskController::class, 'getPanelTasks']);
        Route::post('/', [TaskController::class, 'create']);
        Route::delete('/{task}', [TaskController::class, 'destroy']);
        Route::put('/{task}', [TaskController::class, 'update']);
        Route::put('/{task}/changePanel', [TaskController::class, 'changePanel']);
        Route::put('/{task}/changeOrder', [TaskController::class, 'changeOrder']);
    });
});
