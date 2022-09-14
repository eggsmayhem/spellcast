import "./makespell.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CellTowerIcon from '@mui/icons-material/CellTower';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';

export default function Makespell({entityname}) {

    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const materials = useRef()
    const schools = useRef()
    //state to upload images
    const [file, setFile] = useState(null)


    //get user Coordinates 
    //this works, but best solution is likely to get coordinates when they sign up as people are accustomed to approving that. Better to have lots of approximate data than a little more accurate? Not sure...
    const componentDidMount = () => {

        navigator.geolocation.getCurrentPosition(function(position) {
    
          console.log("Latitude is :", position.coords.latitude);
    
          console.log("Longitude is :", position.coords.longitude);
    
        });
      }
    componentDidMount()

    
      


    const submitHandler = async e => {
        e.preventDefault()
        const newSpell = {
            userId: user._id,
            desc: desc.current.value,
            entities: entityname,
            materials: materials.current.value,
            schools: schools.current.value,
        }
        if(file) {
            const data = new FormData()
            //create unique file name to avoid collision with other users
            const fileName = Date.now() + file.name
            data.append('name', fileName)
            data.append('file', file)
            newSpell.img = fileName
            console.log(newSpell)
            try {
                await axios.post('/upload', data)
            }
            catch(err) {
                console.log(err)
            }
        }
        try{
            await axios.post('/spells', newSpell)
            window.location.reload()
        }
        catch(err) {

        }
    }

  return (
    <div className ="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className = "shareProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF+'person/noProfile.png'} alt="" />
                <textarea placeholder ={`Main spell text`} className="shareInput" ref={desc}/>
                <textarea placeholder ={`Materials needed`} className="shareInput" ref={materials}/>
                <textarea placeholder ={`Schools of magic (e.g. Chaos, Golden Dawn)`} className="shareInput" ref={schools}/>
            </div>
            <hr className = "shareHr" />
            {/* if there is a file, render file before upload for user visual */}
            {file && (
                <div className="shareImgContainer">
                    <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                    <CancelIcon className="shareCancelImg" onClick={()=>setFile(null)} />
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    {/* label with input ID overrides default upload button with our desired icon */}
                    <label htmlFor="file" className="shareOption">
                        <PermMediaIcon htmlColor="tomato" className="shareIcon"/>
                        <span className = "shareOptionText">Photo or Video</span>
                        {/* hide ugly default upload button with inline CSS */}
                        <input style={{display:"none"}} type="file" id="file" accept=".png, .jpeg" onChange={e=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <PhoneInTalkIcon htmlColor="blue" className="shareIcon"/>
                        <span className = "shareOptionText">Social</span>
                    </div>
                    <div className="shareOption">
                        <CellTowerIcon htmlColor="goldenrod" className="shareIcon"/>
                        <span className = "shareOptionText">Spell</span>
                    </div>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}
