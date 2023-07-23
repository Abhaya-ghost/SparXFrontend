import { useEffect, useState } from 'react'
import './Chatonline.css'
import axios from 'axios'

function Chatonline({ onlineUsers, currentId, setCurrentChat }) {
  const PF = process.env.REACT_APP_PUBLIC_URL
  const [friends, setFriends] = useState([])
  const [onlinefriends, setOnlineFriends] = useState([])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get('/users/friends/' + currentId)
        setFriends(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getFriends()
  }, [currentId])

  useEffect(() => {
    setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)))
  }, [friends, onlineUsers])
  
  const handleClick = async(user) => {
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${user._id}`)
      setCurrentChat(res.data)  
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="chatOnline">
      {onlinefriends.map(online => (
        <div className="chatOnlineFriend" key={online._id} onClick={() => handleClick(online)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={online?.profilePic ? PF+online.profilePic : PF + "person/noAvatar.jpg"}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{online?.username}</span>
        </div>
      ))}
    </div>
  )
}

export default Chatonline