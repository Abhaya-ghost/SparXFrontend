import './Topbar.css'
import { Search, Person, Notifications, Chat } from '@mui/icons-material'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

function Topbar() {
    //const { user } = useContext(AuthContext)
    const user = localStorage.getItem('userDetails')
    const PF = process.env.REACT_APP_PUBLIC_URL
    const navigate = useNavigate()

    useEffect(() => {
        if(user==null){
            navigate('/login')
        }
    },[])

    const handleClick = () => {
        const jwtToken= localStorage.removeItem('jwt')
        const userDetails = localStorage.removeItem('userDetails')
        navigate('/login')
    }

    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span className="logo">SparX</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="search">
                    <Search className='searchIcon' />
                    <input placeholder="Search for friends, posts or vidoes" className='searchInput' />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <Link to='/messenger' style={{ textDecoration: 'none' ,color:'white'}}>
                        <div className="topbarIconItem">
                            <Chat />
                            <span className="topbarIconBadge">2</span>
                        </div>
                    </Link>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">4</span>
                    </div>
                </div>
                <div className="topbarLinks">
                    <span className="topbarLink" onClick={handleClick}>Logout</span>
                </div>
                <Link to={`/${JSON.parse(user).username}`}>
                    <img src={JSON.parse(user).profilePic ? PF + JSON.parse(user).profilePic : PF + 'person/noAvatar.jpg'} alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
    )
}

export default Topbar