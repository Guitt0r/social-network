import Post from "./Post/Post";
import AddPostForm from "./AddPostForm/AddPostForm";
import {deletePost} from "../../../redux/postReducer";

const MyPosts = ({isOwner, posts, createPost, updatePost, likePost,deletePost, profilePhoto, authUserId}) => {
    const postElement = posts.map(post => <Post key={post._id}
                                                usersWhoLikes={post.usersWhoLikes}
                                                id={post._id}
                                                text={post.text}
                                                likesCount={post.likesCount}
                                                isUpdated={post.isUpdated}
                                                isOwner={isOwner}
                                                profilePhoto={profilePhoto}
                                                updatePost={updatePost}
                                                likePost={likePost}
                                                deletePost={deletePost}
                                                authUserId={authUserId}/>)
    return (
        <div>
            <div>
                <h3>Posts:</h3>
                {postElement}
                {postElement.length ===0 && <span>No posts yet</span>}
            </div>
            <div>
                {isOwner && <AddPostForm createPost={createPost}/>}
            </div>
        </div>
    )
}

export default MyPosts