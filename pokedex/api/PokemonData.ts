/* eslint-disable @typescript-eslint/no-explicit-any */
import {Pokemon} from "../types/PokeTypes";


const fetchPokemonData = async (): Promise<Pokemon[]> => {
    const response = await fetch('http://localhost:8002/api/pokemon');
    const data = await response.json();
    return data.data.map((item: any) => ({
        name: item.name,
        image: item.image,
        type: item.types,
        height: item.height,
        weight: item.weight,
    }));
};


export {fetchPokemonData};
