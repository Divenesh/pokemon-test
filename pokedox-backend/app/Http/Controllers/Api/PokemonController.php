<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PokemonController extends Controller
{
public function index(): JsonResponse
{
    $url = 'https://pokeapi.co/api/v2/pokemon?limit=10';

    $pokemon = [];
    $response = file_get_contents($url);
    
    if ($response) {
        $data = json_decode($response, true);
        
        foreach ($data['results'] as $index => $item) {
            $pokemonResponse = file_get_contents($item['url']);
            
            if ($pokemonResponse) {
                $pokemonData = json_decode($pokemonResponse, true);
                
                $pokemon[] = [
                    'id' => $pokemonData['id'],
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
                    'abilities' => [],
                    'stats' => [],
                    'sprite' => null,
                    'url' => $item['url']
                ];
            }
        }
    }

    return response()->json([
        'success' => true,
        'data' => $pokemon,
        'total' => count($pokemon)
    ]);
}

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'hp' => 'required|integer|min:1|max:999'
        ]);

        // In a real app, you'd save to database here
        $pokemon = array_merge(['id' => rand(152, 999)], $validated);

        return response()->json([
            'success' => true,
            'message' => 'Pokemon created successfully',
            'data' => $pokemon
        ], 201);
    }

    /**
     * Display the specified pokemon
     */
    public function show(string $id): JsonResponse
    {
        // Fetch individual Pokemon data from PokeAPI
        $url = "https://pokeapi.co/api/v2/pokemon/{$id}";
        $response = file_get_contents($url);

        if (!$response) {
            return response()->json([
                'success' => false,
                'message' => 'Pokemon not found'
            ], 404);
        }

        $data = json_decode($response, true);
        $pokemon = [
            'id' => $data['id'],
            'name' => ucfirst($data['name']),
            'height' => $data['height'],
            'weight' => $data['weight'],
            'types' => array_map(function($type) {
                return ucfirst($type['type']['name']);
            }, $data['types']),
            'abilities' => array_map(function($ability) {
                return ucfirst($ability['ability']['name']);
            }, $data['abilities']),
            'stats' => [
                'hp' => $data['stats'][0]['base_stat'],
                'attack' => $data['stats'][1]['base_stat'],
                'defense' => $data['stats'][2]['base_stat'],
                'speed' => $data['stats'][5]['base_stat']
            ],
            'sprite' => $data['sprites']['front_default']
        ];

        return response()->json([
            'success' => true,
            'data' => $pokemon
        ]);
    }

    /**
     * Update the specified pokemon
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|string|max:255',
            'hp' => 'sometimes|integer|min:1|max:999'
        ]);

        // In a real app, you'd update the database here
        return response()->json([
            'success' => true,
            'message' => 'Pokemon updated successfully',
            'data' => array_merge(['id' => (int)$id], $validated)
        ]);
    }

    /**
     * Remove the specified pokemon
     */
    public function destroy(string $id): JsonResponse
    {
        // In a real app, you'd delete from database here
        return response()->json([
            'success' => true,
            'message' => "Pokemon with ID {$id} deleted successfully"
        ]);
    }

    /**
     * Search pokemon by name
     */
    public function search(Request $request): JsonResponse
    {
        $query = strtolower($request->get('q', ''));
        
        if (empty($query)) {
            return response()->json([
                'success' => false,
                'message' => 'Search query is required',
                'data' => []
            ], 400);
        }

        // Search in PokeAPI
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
            'id' => $data['id'],
            'name' => ucfirst($data['name']),
            'types' => array_map(function($type) {
                return ucfirst($type['type']['name']);
            }, $data['types']),
            'sprite' => $data['sprites']['front_default']
        ];

        return response()->json([
            'success' => true,
            'query' => $query,
            'data' => [$pokemon]
        ]);
    }

    /**
     * Get Pokemon types
     */
    public function types(): JsonResponse
    {
        $url = 'https://pokeapi.co/api/v2/type';
        $response = file_get_contents($url);

        if (!$response) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch Pokemon types'
            ], 500);
        }

        $data = json_decode($response, true);
        $types = array_map(function($type) {
            return [
                'name' => ucfirst($type['name']),
                'url' => $type['url']
            ];
        }, $data['results']);

        return response()->json([
            'success' => true,
            'data' => $types
        ]);
    }
}