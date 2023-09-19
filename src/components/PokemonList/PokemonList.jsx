import { useEffect } from 'react';
import axios from 'axios';
function PokemonList() {
    async function downloadPokemons() {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        console.log(response);
    }
    useEffect(() => {
        downloadPokemons();
    }, []);
    return <div className="pokemon-list-wrapper">Pokemon List</div>;
}
export default PokemonList;
