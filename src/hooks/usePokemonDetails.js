import axios from 'axios';
import { useEffect, useState } from 'react';

function usePokemonDetails(id, pokename = null) {
    const [pokemon, setPokemon] = useState({});
    const [sameTypePokemon, setSameTypePokemon] = useState([]);
    async function downloadPokemon() {
        let resOfPokeDet;
        try {
            if (pokename) {
                resOfPokeDet = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${pokename}`
                );
            } else {
                resOfPokeDet = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${id}`
                );
            }

            const resSameTypesPoke = await axios.get(
                `https://pokeapi.co/api/v2/type/${resOfPokeDet.data.types[0].type.name}`
            );
            const resultOfPokeDet = {
                name: resOfPokeDet.data.name,
                image: resOfPokeDet.data?.sprites?.other?.dream_world
                    ?.front_default,
                weight: resOfPokeDet.data.weight,
                height: resOfPokeDet.data.height,
                types: resOfPokeDet.data.types?.map((t) => t.type.name),
            };

            const resultSameTypesPoke = resSameTypesPoke.data.pokemon.slice(
                0,
                5
            );

            setPokemon(resultOfPokeDet);
            setSameTypePokemon(resultSameTypesPoke);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, [pokemon, sameTypePokemon]);
    return [pokemon, setPokemon, sameTypePokemon, setSameTypePokemon];
}
export default usePokemonDetails;
