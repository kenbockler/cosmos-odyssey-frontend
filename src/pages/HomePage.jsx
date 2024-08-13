import { Link } from 'react-router-dom';
import { useState } from 'react';

function HomePage() {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');

    const planets = [
        'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'
    ];

    return (
        <div className="home-page">
            <h2>Find the Best Route</h2>
            <form className="route-form">
                <label>
                    Departure:
                    <select value={departure} onChange={(e) => setDeparture(e.target.value)}>
                        <option value="">Select a planet</option>
                        {planets.map((planet) => (
                            <option key={planet} value={planet}>{planet}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Destination:
                    <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                        <option value="">Select a planet</option>
                        {planets.map((planet) => (
                            <option key={planet} value={planet}>{planet}</option>
                        ))}
                    </select>
                </label>
                <Link to={`/routes?from=${departure}&to=${destination}`}>
                    <button type="button" disabled={!departure || !destination}>
                        Search Routes
                    </button>
                </Link>
            </form>
        </div>
    );
}

export default HomePage;
