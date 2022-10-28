import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";
import {NavLink} from "react-router-dom";
import s from './Header.module.css'

const Header = ({username, isAuth, logout}) => {
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
                        <button onClick={logout}>Logout</button>
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

const mapStateToProps = (state) => ({
    username: state.auth.username,
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {logout})(Header)