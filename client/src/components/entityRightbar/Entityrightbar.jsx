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

    const PF = process.env.REACT_APP_PUBLIC_FOLDER


    const [syncretisms, setSyncretisms] = useState([])

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


   
        return (
            <div className="rightbar">
        <div className="rightbarWrapper">
            <>
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
                <h4 className = "rightbarTitle">Syncretisms</h4>
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
            </div>
    </div>
        )

}
