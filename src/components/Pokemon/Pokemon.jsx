import './Pokemon.css';

function Pokemon({ name, image }) {
    return (
        <div className="pokemon-wrapper">
            <h3 className="pokemon-name">{name}</h3>
            <div className='image-cont'>
                <img src={image} />
            </div>
        </div>
    );
}
export default Pokemon;
