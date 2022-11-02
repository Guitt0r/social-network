import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import s from './Header.module.css'
import {logout} from "../../redux/authReducer";

const Header = () => {
    const username = useSelector(state => state.auth.username)
    const isAuth = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()
    return (
        <div className={s.header}>
            <div>
                <h1>Header</h1>
            </div>
            <div>
                {isAuth
                    ?
                    <div>
                        Hello,{username} |
                        <button onClick={() => dispatch(logout())}>Logout</button>
                    </div>
                    :
                    <div>
                        <NavLink to='/login'>login</NavLink>
                        /
                        <NavLink to='/register'>register</NavLink>
                    </div>
                }
            </div>
        </div>
    )
}


export default Header