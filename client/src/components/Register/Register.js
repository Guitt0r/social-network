import {Navigate, NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {register} from "../../redux/authReducer";
import RegisterForm from "./RegisterForm";
import {ToastContainer} from "react-toastify";

const Register = ({isAuth, register}) => {
    if (isAuth) return <Navigate to='/profile'/>
    return (
        <div>
            <h1>Register</h1>
            <RegisterForm registerNewUser={register}/>
            <div>
                Already have an account yet?
                <NavLink to='/login'>Login now!</NavLink>
                <ToastContainer/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {register})(Register)