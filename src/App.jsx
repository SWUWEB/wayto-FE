import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import FindId from "./pages/auth/FindId";
import FindPw from './pages/auth/FindPw';
import Signup from "./pages/auth/Signup";
import UserInfoPwError from './pages/mypage/UserInfoPwError';
import UserInfoPwCheck from './pages/mypage/UserInfoPwCheck';
import UserInfoEditSuccess from './pages/mypage/UserInfoEditSuccess';
import UserInfoEdit from './pages/mypage/UserInfoEdit';
import InquiryMain from './pages/mypage/InquiryMain';
import InquirySuccess from './pages/mypage/InquirySuccess';
import LeaveSuccess from './pages/mypage/LeaveSuccess';
import MeetingMinuteList from "./pages/team/MeetingMinutes/MeetingMinuteList";
import WhenToMeetList from "./pages/team/WhenToMeetList";
import WhenToMeetCreation from "./pages/team/WhenToMeetCreation";
import WhenToMeetVote from "./pages/team/WhenToMeetVote";
import Calendar from "./pages/home/Calendar";
import CreateMeetingMinute from "./pages/team/MeetingMinutes/CreateMeetingMinute/CreateMeetingMinute";
import MeetingMinuteView from "./pages/team/MeetingMinutes/MeetingMinuteView";
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
          <Route path="/userinfopwerror" element={<UserInfoPwError />} />
          <Route path="/userinfopwcheck" element={<UserInfoPwCheck />} />
          <Route path="/userinfoeditsuccess" element={<UserInfoEditSuccess />} />
          <Route path="/userinfoedit" element={<UserInfoEdit />} />
          <Route path="/inquirymain" element={<InquiryMain />} />
          <Route path="/inquirysuccess" element={<InquirySuccess />} />
          <Route path="/leavesuccess" element={<LeaveSuccess />} />

          <Route path="/team" element={<Navigate to="/team/meeting" replace />} />
          <Route path="/team/meeting" element={<MeetingMinuteList />} />
          <Route path="/team/wentomeet" element={<WhenToMeetList />} />
          <Route path="/team/wentomeet/wentomeetcreation" element={<WhenToMeetCreation />} />
          <Route path="/team/wentomeet/whentomeetvote" element={<WhenToMeetVote />} />

          {/* <Route path="/team/members" element={<MemberManagementPage />} />  */}

          <Route path="/createMeetingMinute" element={<CreateMeetingMinute />} />
          <Route path="/meeting-minute-view" element={<MeetingMinuteView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;