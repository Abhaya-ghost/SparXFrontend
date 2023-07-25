import { useEffect, useState } from 'react'
import './Conversation.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Conversation({ convo, currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_URL
  const [user,setUser] = useState(null)
  const [busy,setBusy] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const friendId = convo.member.find(m => m !== currentUser._id)

    const getUser = async() => {
      try {
        const token = localStorage.getItem('jwt')
        if(!token){
          navigate('/login')
        }
        const res = await axios.get('/users?userId='+friendId, {headers:{'Authorization': JSON.parse(token)}})
        if(res.status === 401){
          navigate('/login')
        }
        setUser(res.data)
        setBusy(false)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  },[convo,currentUser])

  if(!busy){
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user.profilePic ? PF+user.profilePic : PF+'/person/noAvatar.jpg'}
        alt=""
      />
      <span className="conversationName">{user.username}</span>
    </div>
  )}
}

export default Conversation