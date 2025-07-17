import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import FindId from './pages/auth/FindId';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find-id" element={<FindId />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
