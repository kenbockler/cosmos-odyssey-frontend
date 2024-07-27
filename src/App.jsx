import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReservationPage from './pages/ReservationPage';
import './global.css';
import './App.css';
import './Form.css';
import './ProfileModal.css';
import './Dashboard.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Cosmos Odyssey</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/reserve" element={<ReservationPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
