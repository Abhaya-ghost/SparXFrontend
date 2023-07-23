import './Message.css'
import {format} from 'timeago.js'

function Message({msg,own}) {
    const PF = process.env.REACT_APP_PUBLIC_URL
  return (
    <div className={own ? 'message own' : 'message'}>
        <div className="messageTop">
            <img src={PF+'/person/noAvatar.jpg'} alt="" className='messageImg'/>
            <p className='messageText'>{msg.text}</p>
        </div>
        <div className="messageBottom">{format(msg.createdAt)}</div>
    </div>
  )
}

export default Message