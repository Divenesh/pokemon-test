/* eslint-disable @typescript-eslint/no-explicit-any */
import {Pokemon} from "../types/PokeTypes";


const fetchPokemonData = async (page: number): Promise<{Pokemon: Pokemon[], Total: number}> => {
    const response = await fetch(`http://localhost:8002/api/pokemon?page=${page}&limit=12`);
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


export {fetchPokemonData};
