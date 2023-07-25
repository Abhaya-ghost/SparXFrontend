import './Rightbar.css'
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
import { Add, Remove } from '@mui/icons-material';

function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const [friends, setFriends] = useState([])
  //const { user: currentUser, dispatch } = useContext(AuthContext)
  const { dispatch } = useContext(AuthContext)
  const currentUser = localStorage.getItem('userDetails')
  const [followed, setFollowed] = useState(false)
  const navigate = useNavigate()

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const token = localStorage.getItem('jwt')
    if (!token) {
      navigate('/login')
    }

    useEffect(() => {
      (async () => {
        try {
          const friendList = await axios.get('/users/friends/' + user._id, { headers: { 'Authorization': JSON.parse(token) } })
          if(friendList.status == 401){
            navigate('/login')
          }
          setFriends(friendList.data)
        } catch (error) {
          console.log(error)
        }
      })()
    }, [user])

    useEffect(() => {
      if(currentUser==null){
        navigate('/login')
      }
    
      setFollowed(JSON.parse(currentUser).followings.includes(user?._id))
    }, [JSON.parse(currentUser), user._id])

    const handleClick = async () => {
      if(currentUser==null){
        navigate('/login')
      }
    
      try {
        if (followed) {
          const res = await axios.put('/users/' + user._id + '/unfollow', { userId: JSON.parse(currentUser)._id }, { headers: { 'Authorization': JSON.parse(token) } })
          if(res.status == 401){
            navigate('/login')
          }
          dispatch({ type: 'UNFOLLOW', payload: user._id })
        } else {
          const res = await axios.put('/users/' + user._id + '/follow', { userId: JSON.parse(currentUser)._id }, { headers: { 'Authorization': JSON.parse(token) } })
          if(res.status == 401){
            navigate('/login')
          }
          dispatch({ type: 'FOLLOW', payload: user._id })
        }
      } catch (error) {
        console.log(error)
      }
      setFollowed(!followed)
    }

    return (
      <>
        {user.username !== JSON.parse(currentUser).username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city || 'NA'}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from || 'NA'}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Married' : 'NA'}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends && friends.map((friend) => (
            <Link to={`/${friend.username}`} style={{ textDecoration: 'none' }} key={friend._id}>
              <div className="rightbarFollowing">
                <img
                  src={friend.profilePic ? PF + friend.profilePic : PF + 'person/noAvatar.jpg'}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar