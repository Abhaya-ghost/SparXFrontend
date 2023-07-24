import './Topbar.css'
import { Search, Person, Notifications, Chat } from '@mui/icons-material'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

function Topbar() {
    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_URL

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
                <div className="topbarLinks">
                    <Link to='/' style={{ textDecoration: 'none' ,color:'white'}}>
                        <span className="topbarLink">Home</span>
                    </Link>
                    <Link to={`/${user.username}`} style={{ textDecoration: 'none' ,color:'white'}}>
                        <span className="topbarLink">Timeline</span>
                    </Link>
                </div>
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
                <Link to={`/${user.username}`}>
                    <img src={user.profilePic ? PF + user.profilePic : PF + 'person/noAvatar.jpg'} alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
    )
}

export default Topbar