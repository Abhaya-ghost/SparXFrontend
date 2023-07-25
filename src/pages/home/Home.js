import React, { useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import './Home.css'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate=useNavigate()
    const [show,setShow] = useState(false)
    console.log(localStorage.getItem('jwt'))
    useEffect(() => {
        if(localStorage.getItem('jwt')){
            setShow(true)
        }else{
            navigate('/register')
        }
    },[])

    if(show){
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </>
    )}
}

export default Home