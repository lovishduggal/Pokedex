import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemon() {
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        console.log(response.data);
        const res = {
            name: response.data.name,
            image: response.data?.sprites?.other?.dream_world?.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types?.map((t) => t.type.name),
        };
        setPokemon(res);
    }

    useEffect(() => {
        downloadPokemon();
    }, []);

    return (
        <div className="pokemon-details-wrapper">
            <h2 className="pokemon-details-name">{pokemon.name}</h2>
            <img src={pokemon.image} className="pokemon-details-img" />
            <div>Height: {pokemon.height}</div>
            <div>Weight: {pokemon.weight}kg</div>
            <div className="pokemon-details-types">
                {pokemon.types?.map((t) => (
                    <div key={t}>{t}</div>
                ))}
            </div>
        </div>
    );
}
export default PokemonDetails;
