import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import FindId from "./pages/auth/FindId";
import FindPw from './pages/auth/FindPw';
import Signup from "./pages/auth/Signup";
import UserInfoPwCheck from './pages/mypage/userinfo/UserInfoPwCheck';
import UserInfoEdit from './pages/mypage/userinfo/UserInfoEdit';
import InquiryMain from './pages/mypage/Inquiry/InquiryMain';
import MeetingMinuteList from './pages/team/MeetingMinutes/MeetingMinuteList';
import WhenToMeetList from "./pages/team/whentomeet/WhenToMeetList";
import WhenToMeetCreation from "./pages/team/whentomeet/WhenToMeetCreation";
import WhenToMeetVote from "./pages/team/whentomeet/WhenToMeetVote";
import Calendar from "./pages/home/Calendar";
import CreateMeetingMinute from "./pages/team/MeetingMinutes/CreateMeetingMinute/CreateMeetingMinute";
import MeetingMinuteView from "./pages/team/MeetingMinutes/MeetingMinuteView";
import MemberList from "./pages/team/MemberList/MemberList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />

          <Route path="/login" element={<Login />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findpw" element={<FindPw />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/mypage/userInfo/pwCheck" element={<UserInfoPwCheck />} />
          <Route path="/mypage/userInfo/edit" element={<UserInfoEdit />} />
          <Route path="/mypage/Inquiry" element={<InquiryMain />} />

          <Route path="/meeting-minutes" element={<MeetingMinuteList />} />
          <Route path="/team" element={<Navigate to="/team/meeting" replace />} />
          <Route path="/team/meeting" element={<MeetingMinuteList />} />
          <Route path="/team/wentomeet" element={<WhenToMeetList />} />
          <Route path="/team/wentomeet/wentomeetcreation" element={<WhenToMeetCreation />} />
          <Route path="/team/wentomeet/whentomeetvote" element={<WhenToMeetVote />} />
          <Route path="/team/members" element={<MemberList />} />

          {/* <Route path="/team/members" element={<MemberManagementPage />} />  */}

          <Route path="/createMeetingMinute" element={<CreateMeetingMinute />} />
          <Route path="/meetings/:meeting_id" element={<MeetingMinuteView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;