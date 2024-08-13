import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoutesPage from "./pages/RoutesPage";
import Header from './components/Header';
import './styles/Global.css';
import './styles/Header.css';
import './styles/HomePage.css';
import './styles/RoutesPage.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header /> {}
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/routes" element={<RoutesPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
