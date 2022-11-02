import Post from "./Post/Post";
import AddPostForm from "./AddPostForm/AddPostForm";
import {useDispatch, useSelector} from "react-redux";
import {createPost} from "../../../redux/postReducer";

const MyPosts = ({isOwner, profilePhoto}) => {
    const posts = useSelector(state => state.post.posts)
    const dispatch = useDispatch()
    const postElement = posts.map(post => <Post key={post._id}
                                                id={post._id}
                                                text={post.text}
                                                likesCount={post.likesCount}
                                                isUpdated={post.isUpdated}
                                                isLiked={post.isLiked}
                                                isOwner={isOwner}
                                                profilePhoto={profilePhoto}/>)
    return (
        <div>
            <div>
                <h3>Posts:</h3>
                {postElement}
                {postElement.length === 0 && <span>No posts yet</span>}
            </div>
            <div>
                {isOwner && <AddPostForm createPost={(post) => dispatch(createPost(post))}/>}
            </div>
        </div>
    )
}

export default MyPosts