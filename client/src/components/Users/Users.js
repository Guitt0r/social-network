import {connect} from "react-redux";
import {getUsers} from "../../redux/usersReducer";
import {useEffect} from "react";
import UserItem from "./UserItem/UserItem";
import s from './Users.module.css'

const Users = ({getUsers, users}) => {
    useEffect(() => {
        getUsers()
    }, [])
    const usersElements = users.map(user => <UserItem key={user._id} id={user.owner} fullName={user.fullName}
                                                      photo={user.photo}/>)
    return (
        <div className={s.users}>
            {usersElements}
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.usersPage.users,
})

export default connect(mapStateToProps, {getUsers})(Users)