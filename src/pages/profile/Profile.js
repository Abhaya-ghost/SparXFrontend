import './Profile.css'
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const [user,setUser] = useState({})
  const [busy,setBusy] = useState(true)
  const username = useParams().username
  const navigate = useNavigate()

  const token = localStorage.getItem('jwt')
      if(!token){
        navigate('/login')
      }
  useEffect(() => {
    const fetchUser = async() =>{
      const res= await axios.get(`users/?username=${username}`,{headers:{'Authorization': JSON.parse(token)}})
      if(res.status === 401){
        navigate('/login')
      }
      setUser(res.data);
      setBusy(false)
    };
    fetchUser();  
  },[username])

  // console.log(user)
  if(!busy){
    return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPic || `${PF}person/noCover.jpg`}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePic || `${PF}person/noAvatar.jpg`}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user.username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  )}
}

export default Profile