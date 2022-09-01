import './entityrightbar.css' 
// import {Users} from '../../dummyData'
// import Online from "../online/Online"
import { useEffect, useState, useContext, useRef } from 'react'
// import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { LinearProgress } from '@mui/material'
import Add from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom'
import Person from '@mui/icons-material/Person'
// import io from 'socket.io-client'


export default function Entityrightbar({ entity }) {
    //the user parameter above refers to whomever the profile we are visiting belongs to (it is a param in the URL when we visit the profile, we get it from there). currentUser below refers to whomever is logged in and using the site. 

    //profile parameter determines which version of the rightbar below, written as arrow functions, is rendered
    const PF = process.env.REACT_APP_PUBLIC_FOLDER


    const [syncretisms, setSyncretisms] = useState([

    ])

    useEffect(() => {
        // nested async function as useEffect cannot directly be async
        //get the friends of the profile that is being visited
        const getSyncretisms = async () => {
            try {
                const syncretismsList = await axios.get('/entities/syncretisms/'+entity?._id)
                setSyncretisms(syncretismsList.data)
                console.log("Incoming friendList")
                console.log(syncretismsList.data)
            }
            catch(err) {
                console.log(err)
            }
        }
        
        getSyncretisms()
        
    }, [entity?._id])

   

    // useEffect(() => {
    //     setSyncretisms(.following.includes(user?._id))
    // }, [currentUser, user?._id])

    // useEffect(() => {
    //     const checkFollowing = async() => {
    //         const
    //     }
    // })

    // // fetch relevant friend info from API 
    // useEffect(() => {
    //     // nested async function as useEffect cannot directly be async
    //     //get the friends of the profile that is being visited
    //     const getFriends = async () => {
    //         try {
    //             const friendList = await axios.get('/users/friends/'+user?._id)
    //             setFriends(friendList.data)
    //             console.log("Incoming friendList")
    //             console.log(friendList.data)
    //         }
    //         catch(err) {
    //             console.log(err)
    //         }
    //     }
        
    //     getFriends()
        
    // }, [user?._id])

    // EXPERIMENTAL

    // END EXPERIMENTAL

    // Could do above, but send currentUser._id, check followings, and see if user._id is followed, and use that to set the state
    
    // const handleClick = async () => {
    //     try {
    //         if (followed){
    //             await axios.put('/users/'+user._id+'/unfollow', {userId: currentUser._id})
    //             dispatch({type:"UNFOLLOW", payload: user._id})
    //         }
            
    //         else {
    //             await axios.put('/users/'+user._id+'/follow', {userId: currentUser._id})
    //             dispatch({type:"FOLLOW", payload: user._id})
    //         }
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    //     setFollowed(!followed)
    // }


   
        return (
            <>
            {/* render add button only if not on user's own profile page */}
            {/* {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <RemoveIcon/> : <Add/>}
                </button>
            )} */}
                <h4 className = "rightbarTitle">Entity Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">School:</span>
                        <span className="rightbarInfoValue">{entity.schoolsOfMagic}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Origin</span>
                        <span className="rightbarInfoValue">{entity.placesOfOrigin}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Original language</span>
                        <span className="rightbarInfoValue">{entity.languageGroup}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Source Material</span>
                        <span className="rightbarInfoValue">{entity.textualSources}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Friendliness</span>
                        <span className="rightbarInfoValue">{entity.friendliness}</span>
                    </div>
                </div>
                <h4 className = "rightbarTitle">User friends</h4>
                {/* Could turn this into new componenent if so desired */}
                <div className="rightbarFollowings">
                    {syncretisms.map(entity => (
                    <Link to = {'/entities/'+entity.entityname} style={{textDecoration: "none"}}>
                        <div className="rightbarFollowing">
                            <img src={entity.profileImg ? PF+entity.profileImg : PF+'person/noProfile.png'} alt="" className="rightbarFollowingImg" />
                            <span className="rightbarFollowingName">{entity.entityname}</span>
                        </div>
                    </Link>
                    ))}
                   
                </div>
            </>
        )

}
