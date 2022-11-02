import LoginForm from "./LoginForm";
import {Navigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/authReducer";

const Login = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()
    if (isAuth) return <Navigate to='/profile'/>
    return (
        <div>
            <h1>Login</h1>
            <LoginForm login={(data) => dispatch(login(data))}/>
            <div>
                Don't have an account yet?
                <NavLink to='/register'>Register now!</NavLink>
            </div>
        </div>
    )
}

export default Login