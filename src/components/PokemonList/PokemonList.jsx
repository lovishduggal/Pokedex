import { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';
import usePokemonList from '../../hooks/usePokemonList';
function PokemonList() {
    const [pokemonListState, setPokemonListState] = usePokemonList('https://pokeapi.co/api/v2/pokemon');
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
