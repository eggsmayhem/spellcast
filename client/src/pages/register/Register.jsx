import { useRef } from 'react'
import "./register.css"
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordVerify = useRef()

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    //hook to redirect user after a new user is created
    const navigate = useNavigate()

    //click handler is async so the newly made user can be sent to the server

    const handleClick = async (e) => {
        //prevent refresh
        e.preventDefault()
        //potentially only shows custom validy message on second click of Sign Up button? Verify
        if (passwordVerify.current.value !== password.current.value) {
            passwordVerify.current.setCustomValidity("passwords do no match")
        } 
        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post('/auth/register', user)
                navigate('/login')
            }
            catch(err) {
                console.log(err)
            }
            
        }
      } 

    //   const sendToLogin = () => {

    //   }
// login mechanism seems a bit buggy at times. Play around with this more
  return (
    <div className = "login">
        <div className="loginWrapper">
            <div className="loginLeft">
                {/* <h3 className="loginLogo">SpellCast</h3> */}
                <img src={PF + 'spellcasttitle.png'} alt="" className="loginLogo" />
                <img src={PF + 'orospinfast.gif'} alt="" className="snakeLogo"/>
                <span className="loginDesc">What spells are you casting today?</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Username" required ref= {username} className="loginInput" />
                    <input placeholder="Email" required ref= {email} className="loginInput" type="email" />
                    <input placeholder="Password" required ref= {password} className="loginInput" type="password" minLength="6"/>
                    <input placeholder="Verify Password" required ref= {passwordVerify} className="loginInput" type="password" minLength="6"/>

                    <button className="loginButton" type="submit">Sign Up</button>
                    <Link to = "/login" className = "loginLink">
                        <button className="loginRegister" >Log in</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
