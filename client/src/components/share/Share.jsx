import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CellTowerIcon from '@mui/icons-material/CellTower';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';

export default function Share() {

    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    //state to upload images
    const [file, setFile] = useState(null)

    const submitHandler = async e => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }
        if(file) {
            const data = new FormData()
            //create unique file name to avoid collision with other users
            const fileName = Date.now() + file.name
            data.append('name', fileName)
            data.append('file', file)
            newPost.img = fileName
            console.log(newPost)
            try {
                await axios.post('/upload', data)
            }
            catch(err) {
                console.log(err)
            }
        }
        try{
            await axios.post('/spells', newPost)
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
                <textarea placeholder ={`What magic are you casting today, ${user.username}?`} className="shareInput" ref={desc}/>
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
