<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Pokemon API routes will go here
Route::prefix('pokemon')->group(function () {
    // Route::get('/', [PokemonController::class, 'index']);
    // Route::get('/{id}', [PokemonController::class, 'show']);
    // Route::post('/', [PokemonController::class, 'store']);
    // Route::put('/{id}', [PokemonController::class, 'update']);
    // Route::delete('/{id}', [PokemonController::class, 'destroy']);
});