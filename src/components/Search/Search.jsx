import { useState } from 'react';
import './Search.css';
function Search({ PokemonDetails }) {
    console.log(PokemonDetails);
    const [input, setInput] = useState('');
    return (
        <div className="search-wrapper">
            <input
                onChange={(e) =>
                    setTimeout(() => {
                        setInput(e.target.value);
                    }, 2000)
                }
                id="pokemon-name-search"
                type="text"
                placeholder="pokemon name...."
            />
            {PokemonDetails} //! start from here
            {console.log(input)}
        </div>
    );
}
export default Search;
