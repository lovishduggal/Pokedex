import { Link } from 'react-router-dom';
import './Pokemon.css';

function Pokemon({ name, image, id }) {
    return (
        <div className="pokemon-wrapper">
            <Link to={`/pokemon/${id}`}>
                <h3 className="pokemon-name">{name}</h3>
                <div className="image-cont">
                    <img src={image} />
                </div>
            </Link>
        </div>
    );
}
export default Pokemon;
