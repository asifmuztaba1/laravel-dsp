<?php

use App\Http\Controllers\CampaignController;
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
Route::get('/campaign',[CampaignController::class,'index']);
Route::post('/addcampaign',[CampaignController::class,'store']);
Route::get('/edit-campaign/{id}',[CampaignController::class,'edit']);
Route::put('/update-campaign/{id}',[CampaignController::class,'update']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
