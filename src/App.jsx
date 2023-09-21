import { Link } from 'react-router-dom';
import './App.css';
import Pokedex from './components/Pokedex/Pokedex';
import CustomRoutes from './routes/customRoutes';

function App() {
    return (
        <div className="outer-pokedex">
            <Link to="/">
                <h1 id="pokedex-heading">Pokedex</h1>
            </Link>
            <CustomRoutes />
        </div>
    );
}

export default App;
