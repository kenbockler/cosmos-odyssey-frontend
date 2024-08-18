import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function RoutesPage() {
    // const apiUrl = "http://localhost:9090";
    const apiUrl = "cosmos-odyssey-core-ekf4hac5hweqcmhz.northeurope-01.azurewebsites.net";
    // const apiUrl = import.meta.env.VITE_API_URL;

    const [routes, setRoutes] = useState([]);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [companyFilter, setCompanyFilter] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from');
    const to = queryParams.get('to');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });


    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch(`${apiUrl}/routes?from=${from}&to=${to}`);
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
    }, [from, to, apiUrl]);

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
        return new Date(dateString).toLocaleDateString('en-GB', options).replace(',', '');
    };

    const formatDistance = (distance) => {
        return distance.toLocaleString().replace(/,/g, ' ');
    };

    const openReservationModal = (route) => {
        setSelectedRoute(route);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRoute(null);
    };

    const handleReservation = async () => {
        if (firstName.trim() === '' || lastName.trim() === '') {
            showNotification('Please fill in both your first and last name.', 'error');
            return;
        }

        let totalPrice = selectedRoute.totalPrice;
        if (typeof totalPrice === 'string') {
            totalPrice = totalPrice.replace('€', '').trim();
        }
        totalPrice = parseFloat(totalPrice).toFixed(2);

        let totalTravelTime = selectedRoute.totalTravelTime;
        if (typeof totalTravelTime === 'string') {
            totalTravelTime = totalTravelTime.replace(' hours', '').trim();
        }
        totalTravelTime = parseFloat(totalTravelTime).toFixed(2);

        const priceListId = selectedRoute.priceListId;
        if (!priceListId) {
            showNotification('Price list ID is missing.', 'error');
            return;
        }

        const reservationData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            route: selectedRoute.route,
            totalQuotedPrice: parseFloat(totalPrice),
            totalQuotedTravelTime: parseFloat(totalTravelTime),
            companyNames: selectedRoute.companyNames,
            priceList: {
                priceListId: priceListId
            }
        };

        console.log('Sending reservation data:', reservationData);

        try {
            const response = await fetch(`${apiUrl}/api/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.message) {
                    throw new Error(errorData.message);
                }
                throw new Error('Failed to make the reservation.');
            }

            showNotification('Reservation made successfully!', 'success');
            closeModal();
        } catch (error) {
            console.error('Reservation failed:', error);
            showNotification(`Reservation failed: ${error.message}`, 'error');

            setTimeout(() => {
                window.location.reload();
            }, 5000);
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 3000);
    };

    return (
        <div className="routes-page">
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
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
                    onChange={(e) => {
                        setSortField(e.target.value);
                        if (e.target.value) {
                            setSortOrder('asc');
                        } else {
                            setSortOrder('');
                        }
                    }}
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
                    disabled={!sortField}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <div className="routes-container">
                <table className="routes-table">
                    <thead>
                    <tr className="routes-header">
                        <th>Company</th>
                        <th>Route</th>
                        <th onClick={() => handleSort('firstFlightStart')}>
                            Departure Time {sortField === 'firstFlightStart' ? (sortOrder === 'asc' ? '▴' : '▾') : '▴▾'}
                        </th>
                        <th onClick={() => handleSort('lastFlightEnd')}>
                            Arrival Time {sortField === 'lastFlightEnd' ? (sortOrder === 'asc' ? '▴' : '▾') : '▴▾'}
                        </th>
                        <th onClick={() => handleSort('totalPrice')}>
                            Price {sortField === 'totalPrice' ? (sortOrder === 'asc' ? '▴' : '▾') : '▴▾'}
                        </th>
                        <th onClick={() => handleSort('totalTravelTime')}>
                            Travel Time {sortField === 'totalTravelTime' ? (sortOrder === 'asc' ? '▴' : '▾') : '▴▾'}
                        </th>
                        <th onClick={() => handleSort('totalDistance')}>
                            Distance {sortField === 'totalDistance' ? (sortOrder === 'asc' ? '▴' : '▾') : '▴▾'}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRoutes.map((route) => (
                        <tr
                            key={route.combinedRouteId}
                            className="route-card"
                            onClick={() => openReservationModal(route)}
                        >
                            <td>{route.companyNames}</td>
                            <td>{route.route}</td>
                            <td>{formatDateTime(route.firstFlightStart)}</td>
                            <td>{formatDateTime(route.lastFlightEnd)}</td>
                            <td>€{route.totalPrice.toFixed(2)}</td>
                            <td>{(route.totalTravelTime / (1000 * 60 * 60)).toFixed(2)} hours</td>
                            <td>{formatDistance(route.totalDistance)} km</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="back-link">
                <Link to="/" className="back-button">Choose Another Route</Link>
            </div>

            {isModalOpen && selectedRoute && (
                <div className="reservation-modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>×</button>
                        <h3>Reserve Your Trip</h3>
                        <form>
                            <div className="form-group">
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Route(s):</label>
                                <input type="text" value={selectedRoute.route} readOnly/>
                            </div>
                            <div className="form-group">
                                <label>Total Quoted Price:</label>
                                <input type="text" value={`€${selectedRoute.totalPrice.toFixed(2)}`} readOnly/>
                            </div>
                            <div className="form-group">
                                <label>Total Quoted Travel Time:</label>
                                <input type="text"
                                       value={`${(selectedRoute.totalTravelTime / (1000 * 60 * 60)).toFixed(2)} hours`}
                                       readOnly/>
                            </div>
                            <div className="form-group">
                                <label>Transportation Company Name(s):</label>
                                <input
                                    type="text"
                                    value={selectedRoute.companyNames}
                                    readOnly
                                    className="auto-height-input"
                                />
                            </div>
                            <button type="button" className="reserve-button" onClick={handleReservation}>
                                Reserve Trip
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RoutesPage;
