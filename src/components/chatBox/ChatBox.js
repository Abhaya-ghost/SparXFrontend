import { useEffect, useRef, useState } from 'react'
import './ChatBox.css'
import axios from 'axios'
import Message from '../message/Message'
import { io } from 'socket.io-client'

function ChatBox({ currentChat, currentUser, setOnlineUsers}) {
    const [msgs, setMsgs] = useState([])
    const [newMsg, setNewMsg] = useState('')
    const [arrivalMsg, setArrivalMsg] = useState(null)
    const socket = useRef()
    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io('https://sparxbackend.onrender.com')
    }, [])

    useEffect(() => {
        socket.current.emit('addUser', currentUser._id)
        socket.current.on('getUsers', (users) => {
            setOnlineUsers(currentUser.followings.filter((f) => users.some((u) => u.userId === f)))
        })
    }, [currentUser])

    useEffect(() => {
        const getMsgs = async () => {
            try {
                const res = await axios.get('/messages/' + currentChat._id)
                setMsgs(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMsgs()
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            sender: currentUser._id,
            text: newMsg,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.member.find(m => m !== currentUser._id)
        socket.current.emit('sendMessage', {
            senderId: currentUser._id,
            receiverId,
            text: newMsg
        })

        try {
            const res = await axios.post('/messages', message)
            setMsgs([...msgs, res.data])
            setNewMsg('')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setArrivalMsg({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMsg && currentChat?.member.includes(arrivalMsg.sender) && setMsgs((prev) => [...prev, arrivalMsg])
    }, [arrivalMsg, currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [msgs])

    return (
        <>
            <div className="chatBoxTop">
                {msgs.map(msg => (
                    <div ref={scrollRef} key={msg._id} >
                        <Message msg={msg} own={msg.sender === currentUser._id} />
                    </div>
                ))}
            </div>
            <div className="chatBoxBottom">
                <textarea
                    placeholder='Write something..'
                    className='chatMessageInput'
                    cols="30"
                    rows="10"
                    onChange={(e) => setNewMsg(e.target.value)}
                    value={newMsg}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
            </div>
        </>
    )
}

export default ChatBox