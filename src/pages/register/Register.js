import { useRef } from 'react'
import './Register.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Register() {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(password.current.value !== passwordAgain.current.value){
      password.current.setCustomValidity(`Passwords don't match!`)
    }else{
      const user = {
        username:username.current.value,
        email:email.current.value,
        password:password.current.value
      }
      try {
        await axios.post('/auth/register',user)
        navigate('/login')
      } catch (error) {
        console.log(error)
      }
    }
    //loginCall({email:email.current.value ,password:password.current.value},dispatch)
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SparX</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" required ref={email} className="loginInput" type='email'/>
            <input placeholder="Password" required ref={password} className="loginInput" type='password'/>
            <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type='password'/>
            <button className="loginButton" type='submit'>Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register