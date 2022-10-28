import LoginForm from "./LoginForm";
import {Navigate, NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {ToastContainer} from "react-toastify";

const Login = ({isAuth, login}) => {
    if (isAuth) return <Navigate to='/profile'/>
    return (
        <div>
            <h1>Login</h1>
            <LoginForm login={login}/>
            <div>
                Don't have an account yet?
                <NavLink to='/register'>Register now!</NavLink>
                <ToastContainer/>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {login})(Login)