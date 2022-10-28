import {connect} from "react-redux";
import {createPost, deletePost, likePost, updatePost} from "../../../redux/postReducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = ({isOwner, posts, createPost, updatePost, likePost,deletePost, profilePhoto, authUserId}) => {
    return (
        <div>
            <MyPosts isOwner={isOwner} profilePhoto={profilePhoto} posts={posts} createPost={createPost}
                     updatePost={updatePost} likePost={likePost} deletePost={deletePost} authUserId={authUserId}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    posts: state.post.posts
})

export default connect(mapStateToProps, {createPost, updatePost, deletePost, likePost})(MyPostsContainer)