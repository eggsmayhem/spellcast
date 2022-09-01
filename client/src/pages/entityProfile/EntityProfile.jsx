import "./entityProfile.css"
import Entityfeed from "../../components/entityFeed/Entityfeed";
import Entityrightbar from "../../components/entityRightbar/Entityrightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState } from 'react'
import axios from 'axios'
//enable dynamic fetching of users
import { useParams } from 'react-router'

export default function EntityProfile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [entity, setEntity] = useState({})
  //we can use username as it is defined as parameter in App.jsx
  const entityname = useParams().entityname
  
  

  useEffect(()=> {
    const fetchEntity = async() => {
        const res = await axios.get(`/entities?entityname=${entityname}`)
        setEntity(res.data)
        // const res = 6
        console.log(res)
    }
    // console.log('feed rendered')
    fetchEntity()
},[entityname])

  return (
    
    <>
        <Topbar/>
        <div className = "profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img className = "profileCoverImg" src= {entity.coverImg ? PF + entity.coverImg : PF+"person/noCover.png"} alt="" />
                        <img className = "profileUserImg" src={entity.profileImg ? PF + entity.profileImg : PF+"person/noProfile.png"} alt="" />
                    </div>
                    <div className="profileInfo">
                        <h4 className = "profileInfoName">{entity.entityname}</h4>
                        <span className = "profileInfoDesc">{entity.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    {/* compare to conditional logic making different Rightbars for Profile and Timeline */}
                    <Entityfeed entityname={entityname}/>
                    {/* profile argument lets us know to lead ProfileRightbar from Rightbar.jsx */}
                    {/* <Rightbar user={user}/> */}
                    <Entityrightbar entity={entity}/>
                </div>
            </div>
        </div>    
    </>
   
  )
}
