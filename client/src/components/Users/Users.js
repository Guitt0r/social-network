import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/usersReducer";
import {useEffect} from "react";
import UserItem from "./UserItem/UserItem";
import s from './Users.module.css'

const Users = () => {
    const users = useSelector(state => state.usersPage.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [])
    const usersElements = users.map(user => <UserItem key={user._id} id={user.owner} fullName={user.fullName}
                                                      photo={user.photo}/>)
    return (
        <div className={s.users}>
            {usersElements}
        </div>
    )
}

export default Users