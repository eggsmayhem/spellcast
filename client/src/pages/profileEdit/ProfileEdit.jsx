import "./profileEdit.css"
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
//enable dynamic fetching of users
import { useParams } from 'react-router'
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [user, setUser] = useState({})

  const {user: currentUser} = useContext(AuthContext)
  //we can use username as it is defined as parameter in App.jsx
  const username = useParams().username

  //state to handle image submissions
  const [file, setFile] = useState(null)
  
  

  useEffect(()=> {
    const fetchUser = async() => {
        const res = await axios.get(`/users?username=${currentUser.username}`)
        setUser(res.data)
        // const res = 6
        console.log(res)
    }
    // console.log('feed rendered')
    fetchUser()
},[username])

const updateCoverImg = async e => {
  e.preventDefault()
  const updateProfile = {
    userId: currentUser._id,
  }

  if(file) {
    const data = new FormData()
    const fileName = Date.now() + file.name 
    data.append('name', fileName)
    data.append('file', file)
    updateProfile.coverPicture = fileName
    console.log(updateProfile)

    try {
      await axios.post('/upload', data)
    }
    catch(err) {
      console.log(err)
    }
  }
  try {
    await axios.put(`/users/${currentUser._id}`, updateProfile)
    window.location.reload()
  }
  catch(err) {
    console.log(err)
  }
}

  return (
    <>
        <Topbar/>
        <div className = "profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img className = "profileCoverImg" src= {user.coverPicture ? PF + user.coverPicture : PF+"person/noCover.png"} alt="" />
                       
                        {/* <label htmlFor="file" className="shareOption" on>

                          <input style={{display:"none"}} type="file" id="file" accept=".png, .jpeg" onClick={e=>setFile(e.target.files[0])}/> */}
                          {/* <div className="editCoverImg" role="img" alt="change cover photo" onClick={updateCoverImg}>+</div> */}
                          <form className="editCoverImg" onSubmit={updateCoverImg}>
                            <label htmlFor="file">
                              <div>+</div>
                              <input style={{display:"none"}} type="file" id="file" accept=".png, .jpeg" onChange={e=>setFile(e.target.files[0])}/>
                              <button type="submit">update</button>
                            </label>
                          </form>
                        {/* </label> */}
                        <div className="editProfileImg" role="img" alt="change cover photo">+</div>
                        <img className = "profileUserImg" src={user.profilePicture ? PF + user.profilePicture : PF+"person/noProfile.png"} alt="" />
                    </div>
                    <div className="profileInfo">
                        <h4 className = "profileInfoName">{user.username}</h4>
                        <span className = "profileInfoDesc">{user.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    {/* compare to conditional logic making different Rightbars for Profile and Timeline */}
                    {/* <Feed username={username}/> */}
                    {/* profile argument lets us know to lead ProfileRightbar from Rightbar.jsx */}
                    <Rightbar user={user}/>
                </div>
            </div>
        </div>    
    </>
  )
}
