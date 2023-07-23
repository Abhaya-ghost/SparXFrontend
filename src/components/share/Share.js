import { useContext, useRef, useState } from 'react';
import './Share.css'
import {PermMedia, Label,Room, EmojiEmotions, Cancel} from '@mui/icons-material';
import { AuthContext } from '../../context/authContext';
import axios from 'axios'

function Share() {
  const {user}  = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_URL
  const desc = useRef()
  const [file,setFile] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const newPost = {
      userId:user._id,
      desc:desc.current.value
    }
    if(file){
      const data = new FormData()
      const fileName =file.name
      data.append('file',file)
      data.append('name',fileName)
      newPost.img=fileName
      try {
        await axios.post('/upload', data)
      } catch (error) {
        console.log(error)
      }
    }
    try {
      await axios.post('/posts',newPost)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePic ? PF+user.profilePic : PF+'person/noAvatar.jpg'} alt="" />
          <input
            placeholder={"What's in your mind "+user.username+'?'}
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