import {Navigate, NavLink} from "react-router-dom";
import {register} from "../../redux/authReducer";
import RegisterForm from "./RegisterForm";
import {useDispatch, useSelector} from "react-redux";

const Register = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()
    if (isAuth) return <Navigate to='/profile'/>
    return (
        <div>
            <h1>Register</h1>
            <RegisterForm registerNewUser={(user) => dispatch(register(user))}/>
            <div>
                Already have an account yet?
                <NavLink to='/login'>Login now!</NavLink>
            </div>
        </div>
    )
}

export default Register