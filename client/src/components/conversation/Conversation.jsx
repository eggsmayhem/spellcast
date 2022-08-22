import axios from "axios"
import { useEffect, useState } from "react"
import "./conversation.css"

// bring in currentUser prop from Messenger

export default function Conversation({conversation, currentUser}) {

  const [user, setUser] = useState(null)

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(()=> {
    const friendId = conversation.members.find(u => u !== currentUser._id)
    
    const getUser = async () => {
      try {
        const res = await axios('/users?userId='+friendId)
        // setUser(res.data)
  
        // setUser(res.data)
        console.log(res.data)
        setUser(res.data)
      }
      catch(err) {
        console.log(err)
      }
    }
    getUser()
  }, [currentUser, conversation])
  return (
    <div className="conversation">
        <img src={user?.profilePicture ? PF+user.profilePicture : PF + 'person/noProfile.png'} alt="" className="conversationImg" />
        <span className="conversationName">{user?.username}</span>
    </div>
  )
}
