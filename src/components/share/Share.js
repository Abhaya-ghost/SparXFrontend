import { useContext, useRef, useState } from 'react';
import './Share.css'
import {PermMedia, Label,Room, EmojiEmotions, Cancel} from '@mui/icons-material';
import { AuthContext } from '../../context/authContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Share() {
  //const {user}  = useContext(AuthContext)
  const user = localStorage.getItem('userDetails')
  const PF = process.env.REACT_APP_PUBLIC_URL
  const desc = useRef()
  const [file,setFile] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(user==null){
      navigate('/login')
    }

    const token = localStorage.getItem('jwt')
    if(!token){
      navigate('/login')
    }
    const newPost = {
      userId:JSON.parse(user)._id,
      desc:desc.current.value
    }
    if(file){
      const data = new FormData()
      const fileName =file.name
      data.append('file',file)
      data.append('name',fileName)
      newPost.img=fileName
      try {
        const res=await axios.post('/upload', data, {headers:{'Authorization': JSON.parse(token)}})
        window.location.reload()
        if(res.status == 401){
          navigate('/login')
        }
      } catch (error) {
        console.log(error)
      }
    }
    try {
      const res=await axios.post('/posts',newPost, {headers:{'Authorization': JSON.parse(token)}})
      window.location.reload()
      if(res.status == 401){
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={JSON.parse(user).profilePic ? PF+JSON.parse(user).profilePic : PF+'person/noAvatar.jpg'} alt="" />
          <input
            placeholder={"What's in your mind "+JSON.parse(user).username+'?'}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className='shareCancelImg' onClick={() => setFile(null)}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="shareOptions">
                <label htmlFor='file' className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display:'none'}} type="file" name='file' id='file' accept='.png,.jpeg,.jpg' onChange={(e) => {setFile(e.target.files[0])}}/>
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type='submit'>Share</button>
        </form>
      </div>
    </div>
  )
}

export default Share