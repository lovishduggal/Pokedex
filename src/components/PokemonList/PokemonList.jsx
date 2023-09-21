import { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pokedexUrl, setPokedexUrl] = useState(
        'https://pokeapi.co/api/v2/pokemon'
    );
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    async function downloadPokemons() {
        setIsLoading(true);
        const response = await axios.get(pokedexUrl);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        const pokemonResults = response.data.results;
        console.log(pokemonResults);
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
        setPokemonList(res);
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokedexUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <h2 className="pokemon-list-heading">Pokemon List</h2>
            <div className="loading-download">
                {isLoading
                    ? 'Loading......'
                    : pokemonList.map((pokemon) => (
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
                    disabled={prevUrl == null}
                    onClick={() => setPokedexUrl(prevUrl)}>
                    Prev
                </button>
                <button
                    disabled={nextUrl == null}
                    onClick={() => setPokedexUrl(nextUrl)}>
                    Next
                </button>
            </div>
        </div>
    );
}
export default PokemonList;
