import axios from 'axios'
import "./spell.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { Users } from "../../dummyData"
import { useEffect, useState, useContext } from "react"
//don't need to import { Posts } because Feed.js is handling that 
//date format handling
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';


export default function Spell({spell}) {
    //use state to dynamically render likes 
    const [like, setLike] = useState(spell.likes.length)
    //defaults to false before a post has been liked
    const [isLiked, setIsLiked] = useState(false)

    const [user, setUser] = useState({})
    //give user a nickname to avoid clashing variable names
    const {user: currentUser} = useContext(AuthContext)

    //connect to public folder to serve assets
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    //check database so front end knows whether to render a like or a dislike
    useEffect(() =>{
        setIsLiked(spell.likes.includes(currentUser._id))
    }, [currentUser._id, spell.likes])

    //use effect to grab the posts we want (get the user who created each spell)
    useEffect(()=> {
        const fetchUser = async() => {
            const res = await axios.get(`/users?userId=${spell.userId}`)
            setUser(res.data)
            // const res = 6
            console.log(res)
        }
        // console.log('feed rendered')
        fetchUser()
    },[spell.userId])

    const likeHandler = () => {
        try {
            axios.put('/spells/'+spell._id+'/like', {userId: currentUser._id})
        }
        catch(err) {

        }
        setLike(isLiked ? like -1 : like + 1)
        //toggle between liked and disliked
        setIsLiked(!isLiked)
    }

    // const dislikeHandler = () = {
    //     try {

    //     }
    //     catch(err) {

    //     }
    // }
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                        <img className = "postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF+"person/noProfile.png"} alt="" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(spell.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVertIcon/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{spell?.desc}</span>
                <img className = "postImg" src={PF+spell.images[0]} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className = "likeIcon" src={`${PF}realeyenobg.png`} onClick={likeHandler} alt="" />
                    {/* heart will become dislike */}
                    <img className = "likeIcon" src={`${PF}realeyenobginvert.png`} onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like}</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{spell.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
