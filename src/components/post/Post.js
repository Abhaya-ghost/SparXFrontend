import './Post.css'
import {MoreVert} from '@mui/icons-material'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import {format} from 'timeago.js'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/authContext';

function Post({post}) {
  const [like,setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user,setUser] = useState({})
  const PF = process.env.REACT_APP_PUBLIC_URL;
  //const {user:currentUser} = useContext(AuthContext)
  const currentUser = localStorage.getItem('userDetails')
  const navigate=useNavigate()

  const token = localStorage.getItem('jwt')
  if(!token){
    navigate('/login')
  }

  useEffect(() => {
    if(currentUser==null){
      navigate('/login')
    }
    setIsLiked(post.likes.includes(JSON.parse(currentUser)._id))
  },[JSON.parse(currentUser)._id,post.likes])

  useEffect(() => {
    const fetchUser = async() =>{
      const res= await axios.get(`/users?userId=${post.userId}`, {headers:{'Authorization': JSON.parse(token)}})
      if(res.status == 401){
        navigate('/login')
      }
      // console.log(PF+post.img)
      // console.log(PF+'person/noAvatar.jpg')
      setUser(res.data);
    };
    fetchUser();    
  },[post.userId])

  const likeHandler = () => {
    if(currentUser==null){
      navigate('/login')
    }
    try {
      const res=axios.put('/posts/'+post._id+'/like', {userId:JSON.parse(currentUser)._id}, {headers:{'Authorization': JSON.parse(token)}})
      if(res.status == 401){
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
    setLike(isLiked ? like-1 : like+1);
    setIsLiked(!isLiked);
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePic? PF + user.profilePic : PF+'person/noAvatar.jpg'}
              alt=""
              />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF+post.img} alt="" crossOrigin='anonymous'/>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`}  onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post