<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PokemonController extends Controller
{
public function index(Request $request): JsonResponse
{
    $page = (int) $request->get('page', 1);
    $limit = (int) $request->get('limit', 10);
    
    $offset = ($page - 1) * $limit;
    
    $page = max(1, $page); 
    $limit = min(max(1, $limit), 50);
    $url = "https://pokeapi.co/api/v2/pokemon?offset={$offset}&limit={$limit}";

    $pokemon = [];
    $response = file_get_contents($url);
    
    if ($response) {
        $data = json_decode($response, true);
        
        foreach ($data['results'] as $index => $item) {
            $pokemonResponse = file_get_contents($item['url']);
            
            if ($pokemonResponse) {
                $pokemonData = json_decode($pokemonResponse, true);
                
                $pokemon[] = [
                    'name' => ucfirst($pokemonData['name']),
                    'height' => $pokemonData['height'],
                    'weight' => $pokemonData['weight'],
                    'types' => array_map(function($type) {
                        return ucfirst($type['type']['name']);
                    }, $pokemonData['types']),

                    'image' => $pokemonData['sprites']['front_default'],
                ];
            } else {
                $pokemon[] = [
                    'id' => $index + 1,
                    'name' => ucfirst($item['name']),
                    'height' => null,
                    'weight' => null,
                    'types' => ['Unknown'],
                    'image' => null,
                ];
            }
        }
    }

    return response()->json([
        'success' => true,
        'data' => $pokemon,
        'total' => $data['count'] ?? 0
    ]);
}

    public function search(Request $request): JsonResponse
    {
        $query = strtolower($request->get('name', 'pikachu'));
        
        if (empty($query)) {
            return response()->json([
                'success' => false,
                'message' => 'Search query is required',
                'data' => []
            ], 400);
        }

        $url = "https://pokeapi.co/api/v2/pokemon/{$query}";
        $response = file_get_contents($url);

        if (!$response) {
            return response()->json([
                'success' => true,
                'query' => $query,
                'message' => 'No Pokemon found with that name',
                'data' => []
            ]);
        }

        $data = json_decode($response, true);
        
        $pokemon = [
            'name' => ucfirst($data['name']),
            'height' => $data['height'],
            'weight' => $data['weight'],
            'types' => array_map(function($type) {
                return ucfirst($type['type']['name']);
            }, $data['types']),
            'image' => $data['sprites']['front_default'],
        ];
        return response()->json([
            'success' => true,
            'query' => $query,
            'data' => $pokemon
        ]);

    }
}
