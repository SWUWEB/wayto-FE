import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import FindId from "./pages/auth/FindId";
import MeetingMinuteList from "./pages/team/MeetingMinutes/MeetingMinuteList";
import WhenToMeetList from "./pages/team/WhenToMeetList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find-id" element={<FindId />} />

          <Route
            path="/team"
            element={<Navigate to="/team/meeting" replace />}
          />

          <Route path="/team/meeting" element={<MeetingMinuteList />} />

          <Route path="/team/wentomeet" element={<WhenToMeetList />} />
          {/*<Route path="/team/members" element={<MemberManagementPage />} />
          <Route path="/team/settings" element={<TeamSettingsPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
