import "./online.css"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

export default function Online({user, onlineUsers, currentId}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  // TEST
  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])

  useEffect(() => {
    const getFriends = async () => {
        const res = await axios.get('/users/friends/'+ currentId)
        setFriends(res.data)
    }
    getFriends()
}, [currentId])

useEffect(() => {
  setOnlineFriends(friends.filter(f=> onlineUsers.includes(f._id)))
}, [friends, onlineUsers])
  // END TEST
  return (
    <div>
      {onlineFriends.map(o =>(
        <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
            <img className = "rightbarProfileImg" src={o?.profilePicture ? PF+o.profilePicture : PF + "/person/noProfile.png"} alt="" />
            <span className="rightbarOnline"></span>
        </div>
            <span className="rightbarUsername">{o.username}</span>
      </li>
      ))}
        
    </div>
  )
}
