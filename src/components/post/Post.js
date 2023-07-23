import './Post.css'
import {MoreVert} from '@mui/icons-material'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/authContext';

function Post({post}) {
  const [like,setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user,setUser] = useState({})
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const {user:currentUser} = useContext(AuthContext)

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])

  useEffect(() => {
    const fetchUser = async() =>{
      const res= await axios.get(`/users?userId=${post.userId}`)
      // console.log(PF+post.img)
      // console.log(PF+'person/noAvatar.jpg')
      setUser(res.data);
    };
    fetchUser();    
  },[post.userId])

  const likeHandler = () => {
    try {
      axios.put('/posts/'+post._id+'/like', {userId:currentUser._id})
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