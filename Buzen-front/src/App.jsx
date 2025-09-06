import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Nav from './components/Nav.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Footer from './components/Footer.jsx';
import Player from './components/Player.jsx';
import Login from './pages/Login.jsx';

function AppLayout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login"; // Ocultar en login

  return (
    <div
      className="overflow-hidden h-screen"
      style={{
        background: 'linear-gradient(to right, var(--color-deep-black), var(--color-dark-purple), var(--color-deep-black))',
        backgroundSize: '400% 100%',
        animation: 'seamlessFlow 120s linear infinite'
      }}
    >
      {!hideLayout && <Nav />}
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
