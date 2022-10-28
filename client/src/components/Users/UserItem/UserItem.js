import defaultAvatar from '../../../assets/dafaultAvatar.png'
import {NavLink} from "react-router-dom";
import s from './UserItem.module.css'

const UserItem = ({id, fullName, photo}) => {
    return (
        <div className={s.userItem}>
            <div className={s.userAvatar}>
                <NavLink to={`/profile/${id}`}>
                    <img src={photo || defaultAvatar} alt='User avatar'/>
                </NavLink>
            </div>
            <div>
                {fullName}
            </div>
        </div>
    )
}

export default UserItem