import s from './Post.module.css'
import unlikeIcon from '../../../../assets/unlikeIcon.png'
import likeIcon from '../../../../assets/likeIcon.png'
import deleteIcon from '../../../../assets/deleteIcon.png'
import editIcon from '../../../../assets/editIcon.png'
import {useState} from "react";
import EditPostForm from "./EditPostForm/EditPostForm";
import {useDispatch} from "react-redux";
import {deletePost, likePost, updatePost} from "../../../../redux/postReducer";

const Post = ({id, text, likesCount, isUpdated, isOwner, profilePhoto, usersWhoLikes, authUserId}) => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = (text) => {
        setEditMode(false)
        dispatch(updatePost(id, text))
    }

    const onLike = () => {
        dispatch(likePost(id))
    }
    const onDelete = () => {
        dispatch(deletePost(id))
    }
    return (
        <div className={s.post}>
            <div className={s.postInfo}>
                <div>
                    <img src={profilePhoto} alt='userAvatar'/>
                </div>
                <div className={s.text}>
                    {editMode
                        ? <EditPostForm id={id} text={text} deactivateEditMode={deactivateEditMode}/>
                        : text
                    }
                </div>
                <div title='this post has been updated' className={s.updatedMark}>
                    {isUpdated && 'updated'}
                </div>
            </div>
            <div>
                <div className={s.likesWrapper}>
                    <img onClick={onLike} src={
                        usersWhoLikes.some(id => id === authUserId)
                            ? likeIcon
                            : unlikeIcon
                    } alt='like/unlike'/>
                    <div>
                        likes:{likesCount}
                    </div>
                </div>
                {isOwner &&
                    <div className={s.postOwnerActions}>
                        <div className={s.editWrapper}>
                            <img onClick={activateEditMode} src={editIcon} alt='edit' title='edit'/>
                        </div>
                        <div className={s.deleteWrapper}>
                            <img onClick={onDelete} src={deleteIcon} alt='delete' title='delete'/>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default Post