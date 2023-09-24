import { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
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

    return (
        <div className="pokemon-list-wrapper">
            <h2 className="pokemon-list-heading">Pokemon List</h2>
            <div className="loading-download">
                {pokemonListState.isLoading
                    ? 'Loading......'
                    : pokemonListState.pokemonList.map((pokemon) => (
                          <Pokemon
                              key={pokemon.id}
                              name={pokemon.name}
                              image={pokemon.image}
                              id={pokemon.id}
                          />
                      ))}
            </div>
            <div className="btn">
                <button
                    disabled={pokemonListState.prevUrl == null}
                    onClick={() => {
                        setPokemonListState((pokemonListState) => ({
                            ...pokemonListState,
                            pokedexUrl: pokemonListState.prevUrl,
                        }));
                    }}>
                    Prev
                </button>
                <button
                    disabled={pokemonListState.nextUrl == null}
                    onClick={() => {
                        setPokemonListState((pokemonListState) => ({
                            ...pokemonListState,
                            pokedexUrl: pokemonListState.nextUrl,
                        }));
                    }}>
                    Next
                </button>
            </div>
        </div>
    );
}
export default PokemonList;
