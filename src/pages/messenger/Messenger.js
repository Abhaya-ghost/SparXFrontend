import { useContext, useEffect, useRef, useState } from 'react'
import Chatonline from '../../components/chatOnline/Chatonline'
import Conversation from '../../components/conversation/Conversation'
import Topbar from '../../components/topbar/Topbar'
import './Messenger.css'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import ChatBox from '../../components/chatBox/ChatBox'
import { useNavigate } from 'react-router-dom'


function Messenger() {
  const [convos, setConvos] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  //const { user } = useContext(AuthContext)
  const user = localStorage.getItem('userDetails')
  const [onlineUsers, setOnlineUsers] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (user == null) {
      navigate('/login')
    }
    const token = localStorage.getItem('jwt')
    if(!token){
      navigate('/register')
    }
    const getConvos = async () => {
      try {
        if (!token) {
          navigate('/login')
        }
        const res = await axios.get('/conversations/' + JSON.parse(user)._id, { headers: { 'Authorization': JSON.parse(token) } })
        if (res.status == 401) {
          navigate('/login')
        }
        setConvos(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConvos()
  }, [JSON.parse(user)._id])

  return (
    <div className='messengerWrap'>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder='Search for friends' className="chatMenuInput" />
            {convos.map(convo => (
              <div onClick={() => { setCurrentChat(convo) }} key={convo._id}>
                <Conversation convo={convo} currentUser={JSON.parse(user)} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? <ChatBox currentChat={currentChat} currentUser={JSON.parse(user)} setOnlineUsers={setOnlineUsers} /> : <span className='noConversationText'>Open a conversation to start a chat</span>}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {onlineUsers && <Chatonline onlineUsers={onlineUsers} currentId={JSON.parse(user)._id} setCurrentChat={setCurrentChat} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messenger