import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import ProfileEdit from "./pages/profileEdit/ProfileEdit";
import { AuthContext } from "./context/AuthContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { useContext } from "react";

function App() {
  //state to determine if person accessing site is logged in or not
  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home/> : <Register/>}/>
        <Route path="/login" element={user ? <Navigate to="/" />: <Login/>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
        <Route path="/register" element={user ? <Navigate to="/" />: <Register/>}/>
        <Route path="/messenger" element={!user ? <Navigate to="/" />: <Messenger/>}/>
        <Route path="/editprofile/:username" element={user ? <ProfileEdit/> : <Register/>}/>
      </Routes>
    </Router>
  )
}
export default App;
