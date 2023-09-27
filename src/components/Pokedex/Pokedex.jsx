import PokemonDetails from '../PokemonDetails/PokemonDetails';
import PokemonList from '../PokemonList/PokemonList';
import Search from '../Search/Search';
import './Pokedex.css';
function Pokedex() {
    return (
        <div className="pokedex-wrapper">
            <Search PokemonDetails={<PokemonDetails pokename="metapod" />} />
            <PokemonList />
        </div>
    );
}
export default Pokedex;
