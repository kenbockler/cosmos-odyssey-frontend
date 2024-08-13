import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function RoutesPage() {
    const [routes, setRoutes] = useState([]);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [companyFilter, setCompanyFilter] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
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
                setFilteredRoutes(data);
            } catch (error) {
                console.error('Error fetching routes:', error);
            }
        };

        if (from && to) {
            fetchRoutes();
        }
    }, [from, to]);

    useEffect(() => {
        let filtered = routes.filter(route =>
            route.companyNames.toLowerCase().includes(companyFilter.toLowerCase())
        );

        if (sortField && sortOrder) {
            filtered.sort((a, b) => {
                let aValue = a[sortField];
                let bValue = b[sortField];

                if (sortField === 'firstFlightStart' || sortField === 'lastFlightEnd') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }

                if (sortOrder === 'asc') {
                    return aValue > bValue ? 1 : -1;
                } else if (sortOrder === 'desc') {
                    return aValue < bValue ? 1 : -1;
                } else {
                    return 0;
                }
            });
        }

        setFilteredRoutes(filtered);
    }, [companyFilter, sortField, sortOrder, routes]);

    const handleSort = (field) => {
        if (sortField === field) {
            if (sortOrder === 'asc') {
                setSortOrder('desc');
            } else if (sortOrder === 'desc') {
                setSortField('');
                setSortOrder('');
            } else {
                setSortOrder('asc');
            }
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const formatDateTime = (dateString) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        return new Date(dateString).toLocaleDateString('en-GB', options).replace(',', ''); // Eemaldab koma kuupäeva ja aja vahel
    };

    const formatDistance = (distance) => {
        return distance.toLocaleString().replace(/,/g, ' ');
    };

    return (
        <div className="routes-page">
            <h2>Routes from {from} to {to}</h2>
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Filter by company"
                    value={companyFilter}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                    className="filter-input"
                />
            </div>
            <div className="sort-container-mobile">
                <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                    className="sort-select"
                >
                    <option value="">Sort By...</option>
                    <option value="firstFlightStart">First Flight Start</option>
                    <option value="lastFlightEnd">Last Flight End</option>
                    <option value="totalPrice">Total Price</option>
                    <option value="totalTravelTime">Total Travel Time</option>
                    <option value="totalDistance">Total Distance</option>
                </select>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="sort-select"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div className="routes-container">
                <div className="routes-header">
                    <div>Company</div>
                    <div>Route</div>
                    <div onClick={() => handleSort('firstFlightStart')}>
                        First Flight Start {sortField === 'firstFlightStart' ? (sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : '') : ''}
                    </div>
                    <div onClick={() => handleSort('lastFlightEnd')}>
                        Last Flight End {sortField === 'lastFlightEnd' ? (sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : '') : ''}
                    </div>
                    <div onClick={() => handleSort('totalPrice')}>
                        Total Price {sortField === 'totalPrice' ? (sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : '') : ''}
                    </div>
                    <div onClick={() => handleSort('totalTravelTime')}>
                        Total Travel Time {sortField === 'totalTravelTime' ? (sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : '') : ''}
                    </div>
                    <div onClick={() => handleSort('totalDistance')}>
                        Total Distance {sortField === 'totalDistance' ? (sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : '') : ''}
                    </div>
                </div>
                {filteredRoutes.map((route) => (
                    <div key={route.combinedRouteId} className="route-card">
                        <div>{route.companyNames}</div>
                        <div>{route.route}</div>
                        <div>{formatDateTime(route.firstFlightStart)}</div>
                        <div>{formatDateTime(route.lastFlightEnd)}</div>
                        <div>€{route.totalPrice.toFixed(2)}</div>
                        <div>{(route.totalTravelTime / (1000 * 60 * 60)).toFixed(2)} hours</div>
                        <div>{formatDistance(route.totalDistance)} km</div>
                    </div>
                ))}
            </div>
            <div className="back-link">
                <Link to="/" className="back-button">Choose Another Route</Link>
            </div>
        </div>
    );
}

export default RoutesPage;
