import "./login.css"
// import react hooks
import { useContext, useRef } from 'react'

import {loginCall} from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext"

import CircularProgress from '@mui/material/CircularProgress'

export default function Login() {
    const email = useRef()
    const password = useRef()
    const {user, isFetching, error, dispatch} = useContext(AuthContext)

  const handleClick = (e) => {
    //prevent refresh
    e.preventDefault()
    loginCall({email: email.current.value, password: password.current.value}, dispatch)
  }  
  console.log(user)
  return (
    <div className = "login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SpellCast</h3>
                <span className="loginDesc">What spells are you casting today?</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    {/* use ref to prevent re-rendering, which should be avoided whenever possible */}
                    <input placeholder="Email" type ="email" className="loginInput" ref={email} required/>
                    <input placeholder="Password" type="password" className="loginInput" ref = {password} required minLength="6"/>
                    <button className="loginButton" type="submit" disabled={isFetching}>
                        {/* check to verify circular progress is showing up after login */}
                        {isFetching ? <CircularProgress/> : "Log in"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegister">{isFetching ? <CircularProgress/> : "Create a New Account"}</button>
                </form>
            </div>
        </div>
    </div>
  )
}
