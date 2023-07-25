import { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './Feed.css'
import axios from 'axios'
import { AuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

function Feed({username}) {
  const [posts,setPosts]=useState([])
  //const {user} = useContext(AuthContext)
  const user = localStorage.getItem('userDetails')
  const navigate = useNavigate()

  useEffect(() => {
    (async() =>{
      const token = localStorage.getItem('jwt')
      if(user==null){
        navigate('/login')
      }
      if(!token){
        navigate('/login')
      }
      const res= username
                          ? await axios.get('posts/profile/'+username, {headers:{'Authorization': JSON.parse(token)}}) 
                          : await axios.get('posts/timeline/' + JSON.parse(user)._id, {headers:{'Authorization': JSON.parse(token)}})
      if(res.status == 401){
        navigate('/login')
      }
      setPosts(res.data.sort((p1,p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
    })();  
  },[username,JSON.parse(user)._id])
   
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === JSON.parse(user).username) && <Share />}
        {posts.map((p) => (
          p._id && <Post key={p._id} post={p}/>
        ))}
      </div>
    </div>
  )
}

export default Feed