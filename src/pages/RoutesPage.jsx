import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function RoutesPage() {
    const [routes, setRoutes] = useState([]);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from');
    const to = queryParams.get('to');

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch(`http://localhost:9090/routes?from=${from}&to=${to}`);
                const data = await response.json();
                setRoutes(data);
            } catch (error) {
                console.error('Error fetching routes:', error);
            }
        };

        if (from && to) {
            fetchRoutes();
        }
    }, [from, to]);

    return (
        <div className="routes-page">
            <h2>Routes from {from} to {to}</h2>
            <table className="routes-table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th>Route</th>
                    <th>First Flight Start</th>
                    <th>Last Flight End</th>
                    <th>Total Price</th>
                    <th>Total Travel Time</th>
                    <th>Total Distance</th>
                </tr>
                </thead>
                <tbody>
                {routes.map((route) => (
                    <tr key={route.combinedRouteId}>
                        <td>{route.companyNames}</td>
                        <td>{route.route}</td>
                        <td>{new Date(route.firstFlightStart).toLocaleString()}</td>
                        <td>{new Date(route.lastFlightEnd).toLocaleString()}</td>
                        <td>${route.totalPrice.toFixed(2)}</td>
                        <td>{(route.totalTravelTime / (1000 * 60 * 60)).toFixed(2)} hours</td>
                        <td>{route.totalDistance.toLocaleString()} km</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="back-link">
                <Link to="/" className="back-button">Choose Another Route</Link>
            </div>
        </div>
    );
}

export default RoutesPage;
