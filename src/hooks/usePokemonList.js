import axios from 'axios';
import { useEffect, useState } from 'react';

function usePokemonList(url) {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: url,
        nextUrl: '',
        prevUrl: '',
    });

    async function downloadPokemons() {
        setPokemonListState((pokemonListState) => ({
            ...pokemonListState,
            isLoading: true,
        }));
        const response = await axios.get(pokemonListState.pokedexUrl);
        console.log(response);
        const pokemonResults = response.data.results;
        console.log(pokemonResults);

        setPokemonListState((pokemonListState) => ({
            ...pokemonListState,
            nextUrl: response.data.next,
            prevUrl: response.data.previous,
        }));

        const pokemonResultPromise = pokemonResults.map((pokemon) =>
            axios.get(pokemon.url)
        );
        const pokemonData = await axios.all(pokemonResultPromise);
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon?.sprites?.other?.dream_world?.front_default,
                types: pokemon.types,
            };
        });
        setPokemonListState((pokemonListState) => ({
            ...pokemonListState,
            pokemonList: res,
            isLoading: false,
        }));
    }
    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);
    return [pokemonListState, setPokemonListState];
}
export default usePokemonList;
