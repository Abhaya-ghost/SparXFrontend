import './Login.css'
import {useContext, useRef} from 'react'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/authContext'
import {CircularProgress} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const email = useRef()
  const password = useRef()
  const navigate = useNavigate()
  // const {user,isFetching, error, dispatch} = useContext(AuthContext)

  const handleSubmit = async(e) =>{
    e.preventDefault()
    // loginCall({email:email.current.value ,password:password.current.value},dispatch)
    const userCredential = {
      email:email.current.value,
      password:password.current.value
    }
    try {
        const res=await axios.post('auth/login', userCredential)
        localStorage.setItem('jwt',JSON.stringify(res.data.token))
        localStorage.setItem('userDetails',JSON.stringify(res.data.user))
        if(JSON.parse(localStorage.getItem('jwt'))){
          navigate('/')
        }
    } catch (error) {
      console.log(error)
    }
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
            <input placeholder="Email" type='email' required className="loginInput" ref={email}/>
            <input placeholder="Password" type='password' required className="loginInput"  ref={password}/>
            <button className="loginButton" type='submit'>
              {/* <CircularProgress style={{color:'white',fontSize:'20px'}}/> :  */}
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to='/register'>
            <button className="loginRegisterButton">
              {/* <CircularProgress style={{color:'white',fontSize:'20px'}}/> :  */}
              Create a new account
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login