<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PokemonController;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'Pokemon API is running',
        'timestamp' => now()
    ]);
});

Route::prefix('pokemon')->group(function () {
    Route::get('/', [PokemonController::class, 'index']);
    Route::post('/', [PokemonController::class, 'store']);
    Route::get('/search', [PokemonController::class, 'search']);
    Route::get('/types', [PokemonController::class, 'types']);
    Route::get('/{id}', [PokemonController::class, 'show']);
    Route::put('/{id}', [PokemonController::class, 'update']);
    Route::patch('/{id}', [PokemonController::class, 'update']);
    Route::delete('/{id}', [PokemonController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});