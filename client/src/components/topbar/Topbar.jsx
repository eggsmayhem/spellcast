import './topbar.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Topbar() {
    // hook to get current user's topbar from Context API
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const logoutHandler = () => {
        window.localStorage.clear()
        window.location.reload()
    }
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to= "/" style={{textDecoration:"none"}}>
                    <span className="logo">SpellCast</span>
                </Link>     
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className="searchIcon"/>
                    <input placeholder="search for spells, magicians, or school" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    {user && <button className="topbarLogoutButton" onClick={logoutHandler}>Log Out</button>}
                    <div className="topbarIconItem">
                        <PersonIcon/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Link to = "/messenger" style={{color:"white"}}>
                            <ChatIcon/>
                        </Link>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsIcon/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to= {`/profile/${user.username}`}>
                <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noProfile.png"} alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
    )
}