import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import FindId from './pages/auth/FindId';
import FindPw from './pages/auth/FindPw';
import Signup from "./pages/auth/Signup";
import MeetingMinuteList from './pages/mom/MeetingMinuteList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findpw" element={<FindPw />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/meeting-minutes" element={<MeetingMinuteList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
