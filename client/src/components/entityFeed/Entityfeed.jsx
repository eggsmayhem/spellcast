import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Spell from '../spell/Spell'
import Share from '../share/Share'
import Makespell from '../makespell/Makespell'
import './entityfeed.css' 
// import {Posts} from "../../dummyData"


export default function Entityfeed({entityname}) {
    //hooks to return appropriate posts
    //use state hook
    const [spells, setSpells] = useState([])
    const {user} = useContext(AuthContext)
    //use effect hook
    useEffect(()=> {
        const fetchSpells = async() => {
            //change user :id to be dynamic after login is fully implemented
            const res = await axios.get("/spells/allspells/"+entityname)
            setSpells(res.data.sort((s1,s2)=> {
                return new Date(s2.createdAt) - new Date(s1.createdAt)
            }))
            // const res = 6
            console.log(res)
        }
        // console.log('feed rendered')
        fetchSpells()
    },[entityname])

    return (
        <div className = "feed">
            {/* <input type="text" onChange={e=>setTexts(e.target.value)} /> */}
            <div className="feedWrapper">
                {/* Dummy data plugin for model testing */}
                {/* {Posts.map((p)=> (
                    <Post key = {p.id} post = {p} />
                ))} */}
                {/* only render Share bar if user is on their own profile */}
                {/* {(!username || username === user.username) && <Share/>} */}
                <Makespell entityname = {entityname}/>
                 {spells.map((s)=> (
                    <Spell key = {s._id} spell = {s} />
                ))}
            </div>
        </div>
    )
}
