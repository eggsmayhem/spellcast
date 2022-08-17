import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css' 
// import {Posts} from "../../dummyData"


export default function Feed({username}) {
    //hooks to return appropriate posts
    //use state hook
    const [posts, setPosts] = useState([])
    const {user} = useContext(AuthContext)
    //use effect hook
    useEffect(()=> {
        const fetchPosts = async() => {
            //change user :id to be dynamic after login is fully implemented
            const res = username ?
            await axios.get("/spells/profile/"+username)
            : await axios.get("/spells/timeline/" + user._id)
            setPosts(res.data.sort((p1,p2)=> {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
            // const res = 6
            console.log(res)
        }
        // console.log('feed rendered')
        fetchPosts()
    },[username, user._id])

    return (
        <div className = "feed">
            {/* <input type="text" onChange={e=>setTexts(e.target.value)} /> */}
            <div className="feedWrapper">
                {/* Dummy data plugin for model testing */}
                {/* {Posts.map((p)=> (
                    <Post key = {p.id} post = {p} />
                ))} */}
                {/* only render Share bar if user is on their own profile */}
                {(!username || username === user.username) && <Share/>}
                 {posts.map((p)=> (
                    <Post key = {p._id} post = {p} />
                ))}
            </div>
        </div>
    )
}
