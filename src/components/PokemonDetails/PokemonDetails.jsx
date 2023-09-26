import { useParams } from 'react-router-dom';
import './PokemonDetails.css';
import usePokemonDetails from '../../hooks/usePokemonDetails';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon, sameTypePokemon, resultSameTypesPoke] =
        usePokemonDetails(id);
    return (
        <div className="pokemon-details-same-types-wrapper">
            <div className="top">
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
            <div className="bottom">
                <h2>Same Types of Pokemons: </h2>
                <div className="list-wrapper">
                    {console.log(sameTypePokemon)}
                    {sameTypePokemon.map((Pokemon) => (
                        <li key={Pokemon.pokemon.name}>
                            {Pokemon.pokemon.name}
                        </li>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default PokemonDetails;
