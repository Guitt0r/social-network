import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/usersReducer";
import {useEffect} from "react";
import UserItem from "./UserItem/UserItem";
import s from './Users.module.css'

const Users = () => {
    const users = useSelector(state => state.user.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [])
    const usersElements = users.map(user => <UserItem key={user._id} id={user._id} username={user.username}
                                                      photo={user.photo} followers={user.followers}/>)
    return (
        <div className={s.users}>
            {usersElements}
        </div>
    )
}

export default Users