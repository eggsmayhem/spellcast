import './rightbar.css' 
import {Users} from '../../dummyData'
import Online from "../online/Online"
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { LinearProgress } from '@mui/material'
import Add from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom'
import Person from '@mui/icons-material/Person'


export default function Rightbar({ user }) {
    //the user parameter above refers to whomever the profile we are visiting belongs to (it is a param in the URL when we visit the profile, we get it from there). currentUser below refers to whomever is logged in and using the site. 

    //profile parameter determines which version of the rightbar below, written as arrow functions, is rendered
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    //use state to get friends of Profile user
    const [friends, setFriends] = useState([])

    const {user: currentUser, dispatch} = useContext(AuthContext)

    const [followed, setFollowed] = useState(currentUser.following.includes(user?._id))
    // TEST BEGIN
    
    // TEST END
    // const [followed, setFollowed] = useState(currentUser.following.includes(user?._id))

    useEffect(() => {
        setFollowed(currentUser.following.includes(user?._id))
    }, [currentUser, user?._id])

    // useEffect(() => {
    //     const checkFollowing = async() => {
    //         const
    //     }
    // })

    // fetch relevant friend info from API 
    useEffect(() => {
        // nested async function as useEffect cannot directly be async
        const getFriends = async () => {
            try {
                const friendList = await axios.get('/users/friends/'+user?._id)
                setFriends(friendList.data)
            }
            catch(err) {
                console.log(err)
            }
        }
        getFriends()
    }, [user?._id])

    // Could do above, but send currentUser._id, check followings, and see if user._id is followed, and use that to set the state
    
    const handleClick = async () => {
        try {
            if (followed){
                await axios.put('/users/'+user._id+'/unfollow', {userId: currentUser._id})
                dispatch({type:"UNFOLLOW", payload: user._id})
            }
            
            else {
                await axios.put('/users/'+user._id+'/follow', {userId: currentUser._id})
                dispatch({type:"FOLLOW", payload: user._id})
            }
        }
        catch(err){
            console.log(err)
        }
        setFollowed(!followed)
    }

    const HomeRightbar = () => {
        return (
            <>
             <div className="birthdayContainer">
                    <img className = "birthdayImg" src={`${PF}/gift.png`} alt ="" />
                    <span className="birthdayText">
                        <b>Rodney Man </b>and <b>3 other friends</b> have a birthday today
                    </span>
                </div>
                <img className = "rightbarAd" src={`${PF}/ad.png`} alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u=>(
                    <Online key = {u.id} user={u} />
                     ))}
                </ul>
            </>
        )
    }
    const ProfileRightbar = () => {
        return (
            <>
            {/* render add button only if not on user's own profile page */}
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <RemoveIcon/> : <Add/>}
                </button>
            )}
                <h4 className = "rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship === 0 ? "Single" : user.relationship === 1 ? "In a relationship" : "it's ambiguous"}</span>
                    </div>
                </div>
                <h4 className = "rightbarTitle">User friends</h4>
                {/* Could turn this into new componenent if so desired */}
                <div className="rightbarFollowings">
                    {friends.map(friend => (
                    <Link to = {'/profile/'+friend.username} style={{textDecoration: "none"}}>
                        <div className="rightbarFollowing">
                            <img src={friend.profilePicture ? PF+friend.profilePicture : PF+'person/noProfile.png'} alt="" className="rightbarFollowingImg" />
                            <span className="rightbarFollowingName">{friend.username}</span>
                        </div>
                    </Link>
                    ))}
                   
                </div>
            </>
        )
    }
    return (
        <div className = "rightbar">
            <div className="rightbarWrapper">
               {user ? <ProfileRightbar/> : <HomeRightbar/>}
            </div>
        </div>
    )
}
