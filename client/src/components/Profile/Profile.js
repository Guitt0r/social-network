import {connect} from "react-redux";
import {useEffect} from "react";
import {Navigate, useParams} from "react-router-dom";
import {getProfile, savePhoto, saveProfile} from "../../redux/profileReducer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {getUsersPosts} from "../../redux/postReducer";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = ({isAuth, getProfile, authUserId, profile, saveProfile, savePhoto, getUsersPosts}) => {
    let {id} = useParams()
    useEffect(() => {
        if (id) {
            getProfile(id)
            getUsersPosts(id)
        } else if (authUserId) {
            getProfile(authUserId)
            getUsersPosts(authUserId)
        }
    }, [id])
    if (!isAuth && !id) return <Navigate to='/login'/>
    if (!profile) return <div>loading</div>//TODO: make preloader
    return (
        <div>
            <ProfileInfo isOwner={!id} profile={profile} saveProfile={saveProfile} savePhoto={savePhoto}/>
            <MyPostsContainer isOwner={!id} profilePhoto={profile.photo} authUserId={authUserId}/>
        </div>
    )
}
const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    authUserId: state.auth.id,
    posts: state.post.posts
})

export default connect(mapStateToProps, {
    getProfile,
    saveProfile,
    savePhoto,
    getUsersPosts

})(Profile)