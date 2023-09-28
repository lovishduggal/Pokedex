import { useState } from 'react';
import './Search.css';
import useDebounce from '../../hooks/useDebounce';
function Search({ setPokeName }) {
    // const [input, setInput] = useState('');
    let id;
    return (
        <div className="search-wrapper">
            <input
                onChange={(e) => {
                    clearTimeout(id);
                    id = setTimeout(() => {
                        setPokeName(e.target.value);
                    }, 3000);
                }}
                id="pokemon-name-search"
                type="text"
                placeholder="pokemon name...."
            />
        </div>
    );
}
export default Search;
