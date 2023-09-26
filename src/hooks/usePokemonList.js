import axios from 'axios';
import { useEffect, useState } from 'react';

function usePokemonList() {
    console.log('PokemonList component-2');
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
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
            //* re-render here
            ...pokemonListState,
            nextUrl: response.data.next,
            prevUrl: response.data.previous,
        }));

        const pokemonResultPromise = pokemonResults.map((pokemon) =>
            axios.get(pokemon.url)
        );
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon?.sprites?.other?.dream_world?.front_default,
                types: pokemon.types,
            };
        });

        console.log(res);
        setPokemonListState((pokemonListState) => ({
            //* re-render
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
