import {useState} from "react";
import ProfileInfoData from "./ProfileInfoData/ProfileInfoData";
import EditProfileInfoDataForm from "./ProfileInfoData/EditProfileInfoDataForm";
import defaultAvatar from '../../../assets/dafaultAvatar.png'
import s from './ProfileInfo.module.css'
import {useDispatch} from "react-redux";
import {savePhoto, saveProfile} from "../../../redux/profileReducer";

const ProfileInfo = ({isOwner, profile}) => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = (data) => {
        setEditMode(false)
        dispatch(saveProfile(data))
    }

    const onPhotoSelected = (e) => {
        dispatch(savePhoto(e.target.files[0]))
    }

    return (
        <div>
            <div className={s.userAvatar}>
                <img src={profile.photo || defaultAvatar} alt='User photo'/>
            </div>
            <div>
                {isOwner && <input type='file' onChange={onPhotoSelected}/>}
            </div>
            <div>
                {editMode
                    ? <EditProfileInfoDataForm deactivateEditMode={deactivateEditMode} profile={profile}/>
                    : <ProfileInfoData activateEditMode={activateEditMode} isOwner={isOwner} profile={profile}/>
                }
            </div>
        </div>
    )
}

export default ProfileInfo