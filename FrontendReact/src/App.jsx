import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import EventPage from './components/EventPage';
import CategoryPage from './components/CategoryPage';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/style.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;