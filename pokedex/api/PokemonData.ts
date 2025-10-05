/* eslint-disable @typescript-eslint/no-explicit-any */
import {Pokemon} from "../types/PokeTypes";
import { API_BASE_URL } from "../config";


const fetchPokemonData = async (page: number): Promise<{Pokemon: Pokemon[], Total: number}> => {
    
    const response = await fetch(`${API_BASE_URL}?page=${page}&limit=24`);
    const data = await response.json();
    const pokemon = data.data.map((item: any) => ({
        name: item.name,
        image: item.image,
        type: item.types,
        height: item.height,
        weight: item.weight,
    }));
    const total = data.total || 0;
    return { Pokemon: pokemon, Total: total};

};

const searchPokemon = async (name: string): Promise<{Pokemon: Pokemon[]}> => {
    const response = await fetch(`${API_BASE_URL}/search?name=${name}`);
    const data = await response.json();
    const pokemon = {
        name: data.data.name,
        image: data.data.image,
        type: data.data.types,
        height: data.data.height,
        weight: data.data.weight,
    };

    return { Pokemon: [pokemon] };
};


export {fetchPokemonData, searchPokemon};
