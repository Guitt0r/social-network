import './App.css'
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import {useEffect} from "react";
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Users from "./components/Users/Users";

const App = ({initializeApp, isInitialize}) => {
    useEffect(() => {
        initializeApp()
    }, [])
    if (!isInitialize) return <div>Loading...</div>//TODO:make preloader
    return (
        <div className='appWrapper'>
            <Header/>
            <Navbar/>
            <div className='contentWrapper'>
                <Routes>
                    <Route path='/profile/:id' element={<Profile/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/users' element={<Users/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isInitialize: state.app.isInitialize
})

export default connect(mapStateToProps, {initializeApp})(App)