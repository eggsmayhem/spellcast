import "./profile.css"
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState } from 'react'
import axios from 'axios'
//enable dynamic fetching of users
import { useParams } from 'react-router'

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [user, setUser] = useState({})
  //we can use username as it is defined as parameter in App.jsx
  const username = useParams().username
  
  

  useEffect(()=> {
    const fetchUser = async() => {
        const res = await axios.get(`/users?username=${username}`)
        setUser(res.data)
        // const res = 6
        console.log(res)
    }
    // console.log('feed rendered')
    fetchUser()
},[username])

  return (
    <>
        <Topbar/>
        <div className = "profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img className = "profileCoverImg" src= {user.coverPicture ? PF + user.coverPicture : PF+"person/noCover.png"} alt="" />
                        <img className = "profileUserImg" src={user.profilePicture ? PF + user.profilePicture : PF+"person/noProfile.png"} alt="" />
                    </div>
                    <div className="profileInfo">
                        <h4 className = "profileInfoName">{user.username}</h4>
                        <span className = "profileInfoDesc">{user.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    {/* compare to conditional logic making different Rightbars for Profile and Timeline */}
                    <Feed username={username}/>
                    {/* profile argument lets us know to lead ProfileRightbar from Rightbar.jsx */}
                    <Rightbar user={user}/>
                </div>
            </div>
        </div>    
    </>
  )
}
