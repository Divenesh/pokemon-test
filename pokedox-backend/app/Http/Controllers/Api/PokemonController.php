<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class PokemonController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $page = (int) $request->get('page', 1);
        $limit = (int) $request->get('limit', 10);
        
        $offset = ($page - 1) * $limit;
        $page = max(1, $page); 
        $limit = min(max(1, $limit), 20);
        $baseUrl = config('services.pokeapi.base_url');
        $url = "{$baseUrl}?offset={$offset}&limit={$limit}";

        try {
            $response = Http::timeout(10)->get($url);
            
            if ($response->failed()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to fetch Pokemon data'
                ], 500);
            }

            $data = $response->json();
            
            $pokemon = [];
            foreach ($data['results'] as $index => $item) {
                try {
                    $detailResponse = Http::timeout(5)->get($item['url']);
                    
                    if ($detailResponse->successful()) {
                        $pokemonData = $detailResponse->json();
                        
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
                        // Fallback for failed requests
                        $pokemon[] = [
                            'id' => $offset + $index + 1,
                            'name' => ucfirst($item['name']),
                            'height' => null,
                            'weight' => null,
                            'types' => ['Unknown'],
                            'image' => null,
                        ];
                    }
                } catch (\Exception $e) {
                    // Skip this Pokemon if request fails
                    continue;
                }
            }

            return response()->json([
                'success' => true,
                'data' => $pokemon,
                'total' => $data['count'],
                'pagination' => [
                    'current_page' => $page,
                    'per_page' => $limit,
                    'total' => $data['count'],
                    'last_page' => ceil($data['count'] / $limit)
                ]
            ]);

        } catch (\Exception $e) {
            error_log("Pokemon API Error: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Service temporarily unavailable'
            ], 503);
        }
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
        $baseUrl = config('services.pokeapi.base_url');
        $url = "{$baseUrl}/{$query}";

        try {
            $response = file_get_contents($url);
        } catch (\Exception $e) {
            error_log("Error fetching Pokemon data: " . $e->getMessage());
            return response()->json([
                'success' => true,
                'query' => $query,
                'message' => 'No Pokemon found with that name',
                'data' => []
            ]);
        };
        
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
