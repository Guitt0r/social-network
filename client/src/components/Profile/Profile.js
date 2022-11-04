import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Navigate, useParams} from "react-router-dom";
import {getUserProfile} from "../../redux/usersReducer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    const profile = useSelector(state => state.user.userProfile)
    const authUserId = useSelector(state => state.auth.id)
    const dispatch = useDispatch()
    let {id} = useParams()
    useEffect(() => {
        if (id) {
            dispatch(getUserProfile(id))
        } else if (authUserId) {
            dispatch(getUserProfile(authUserId))
        }
    }, [id])
    if (!authUserId && !id) return <Navigate to='/login'/>
    if (!profile) return <div>loading</div>//TODO: make preloader
    return (
        <div>
            <ProfileInfo isOwner={!id} profile={profile}/>
            <MyPosts isOwner={!id} profilePhoto={profile.photo} authUserId={authUserId}/>
        </div>
    )
}

export default Profile