import { useState } from 'react';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import PokemonList from '../PokemonList/PokemonList';
import Search from '../Search/Search';
import './Pokedex.css';
function Pokedex() {
    const [pokeName, setPokeName] = useState('');
    return (
        <div className="pokedex-wrapper">
            <Search setPokeName={setPokeName} />
            {pokeName.length > 0 ? (
                <PokemonDetails pokename={pokeName} />
            ) : (
                <PokemonList />
            )}
        </div>
    );
}
export default Pokedex;
