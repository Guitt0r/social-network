import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Navigate, useParams} from "react-router-dom";
import {getProfile} from "../../redux/profileReducer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {getUsersPosts} from "../../redux/postReducer";
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    const profile = useSelector(state => state.profilePage.profile)
    const isAuth = useSelector(state => state.auth.isAuth)
    const authUserId = useSelector(state => state.auth.id)
    const dispatch = useDispatch()
    const getProfileWithPosts = (id) => {
        dispatch(getProfile(id))
        dispatch(getUsersPosts(id))
    }
    let {id} = useParams()
    useEffect(() => {
        if (id) {
            getProfileWithPosts(id)
        } else if (authUserId) {
            getProfileWithPosts(authUserId)
        }
    }, [id])
    if (!isAuth && !id) return <Navigate to='/login'/>
    if (!profile) return <div>loading</div>//TODO: make preloader
    return (
        <div>
            <ProfileInfo isOwner={!id} profile={profile}/>
            <MyPosts isOwner={!id} profilePhoto={profile.photo} authUserId={authUserId}/>
        </div>
    )
}

export default Profile