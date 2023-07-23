import { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './Feed.css'
import axios from 'axios'
import { AuthContext } from '../../context/authContext'

function Feed({username}) {
  const [posts,setPosts]=useState([])
  const {user} = useContext(AuthContext)
  useEffect(() => {
    (async() =>{
      const res= username
                          ? await axios.get('posts/profile/'+username) 
                          : await axios.get('posts/timeline/' + user._id)
      setPosts(res.data.sort((p1,p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
    })();  
  },[username,user._id])
   
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          p._id && <Post key={p._id} post={p}/>
        ))}
      </div>
    </div>
  )
}

export default Feed