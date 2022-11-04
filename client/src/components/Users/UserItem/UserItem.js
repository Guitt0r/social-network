import defaultAvatar from '../../../assets/dafaultAvatar.png'
import {NavLink} from "react-router-dom";
import s from './UserItem.module.css'
import {useDispatch, useSelector} from "react-redux";
import {toggleFollowUser} from "../../../redux/usersReducer";

const UserItem = ({id, username, photo, followers}) => {
    const authUserId = useSelector(state => state.auth.id)
    const dispatch = useDispatch()
    return (
        <div className={s.userItem}>
            <div className={s.userAvatar}>
                <NavLink to={`/profile/${id}`}>
                    <img src={photo || defaultAvatar} alt='User avatar'/>
                </NavLink>
            </div>
            <div>
                {username}
            </div>
            <div>
                <button onClick={() => dispatch(toggleFollowUser(id))}>
                    {followers.includes(authUserId)
                        ? `unfollow`
                        : `follow`
                    }
                </button>
            </div>
        </div>
    )
}

export default UserItem