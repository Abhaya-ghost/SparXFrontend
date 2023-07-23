import './CloseFriend.css'

function CloseFriend({user}) {
    const PF = process.env.REACT_APP_PUBLIC_URL;
    return (
        <li className="sidebarFriend">
            <img src={PF+user.profilePicture} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}

export default CloseFriend