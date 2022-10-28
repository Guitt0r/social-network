const ProfileInfoData = ({activateEditMode, profile, isOwner}) => {
    return (
        <div>
            <div>
                {isOwner && <button onClick={activateEditMode}>EditProfile</button>}
            </div>
            <div>
                <b>Full Name:</b>{profile.fullName}
            </div>
            <div>
                <b>Status:</b>{profile.status}
            </div>
            <div>
                <b>About me:</b>{profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b>{Object.keys(profile.contacts).map(key => <Contacts key={key} contactKey={key}
                                                                                    contactValue={profile.contacts[key]}/>)}
            </div>
        </div>
    )
}

const Contacts = ({contactKey, contactValue}) => {
    return (
        <div style={{paddingLeft: "10px"}}>
            <b>{contactKey}:</b>{contactValue || '---'}
        </div>
    )
}

export default ProfileInfoData