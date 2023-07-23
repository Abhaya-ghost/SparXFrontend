import { useContext, useEffect, useRef, useState } from 'react'
import Chatonline from '../../components/chatOnline/Chatonline'
import Conversation from '../../components/conversation/Conversation'
import Topbar from '../../components/topbar/Topbar'
import './Messenger.css'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import ChatBox from '../../components/chatBox/ChatBox'


function Messenger() {
  const [convos, setConvos] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const { user } = useContext(AuthContext)
  const [onlineUsers,setOnlineUsers] = useState(null)

  useEffect(() => {
    const getConvos = async () => {
      try {
        const res = await axios.get('/conversations/' + user._id)
        setConvos(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConvos()
  }, [user._id])

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder='Search for friends' className="chatMenuInput" />
            {convos.map(convo => (
              <div onClick={() => { setCurrentChat(convo)}} key={convo._id}>
                <Conversation convo={convo} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? <ChatBox currentChat={currentChat} currentUser={user} setOnlineUsers={setOnlineUsers}/> : <span className='noConversationText'>Open a conversation to start a chat</span>}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {onlineUsers && <Chatonline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger