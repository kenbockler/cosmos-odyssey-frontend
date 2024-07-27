import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="home-page">
            <h1>Cosmos Odyssey</h1>
            <h2>Find Your Route</h2>
            <form className="route-form">
                <label>
                    Departure:
                    <input type="text" placeholder="Enter departure location" />
                </label>
                <label>
                    Destination:
                    <input type="text" placeholder="Enter destination" />
                </label>
                <Link to="/reserve">
                    <button type="button">Search Routes</button>
                </Link>
            </form>
        </div>
    );
}

export default HomePage;
