import {useForm} from "react-hook-form";

const EditProfileInfoDataForm = ({deactivateEditMode, profile}) => {
    const {reset, register, handleSubmit, formState: {errors,isValid, isSubmitting}} = useForm();
    //send data to server,reset form
    const onSubmit = (data) => {
        deactivateEditMode(data)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <b>Full name:</b><input defaultValue={profile.fullName} type='text'
                                        placeholder='Full name' {...register("fullName",{maxLength:15})}/>
                {errors.fullName && <span>Max length is 15</span>}
            </div>
            <div>
                <b>Status: </b><input defaultValue={profile.status} type='text'
                                      placeholder='Status' {...register("status")}/>
            </div>
            <div>
                <b>About me:</b><input defaultValue={profile.aboutMe} type='text'
                                       placeholder='AboutMe' {...register("aboutMe")}/>
            </div>
            <div>
                <b>Contacts:</b>{Object.keys(profile.contacts).map(key => <EditContacts key={key}
                                                                                        contactKey={key}
                                                                                        contactValue={profile.contacts[key]}
                                                                                        register={register}/>)}
            </div>
            <input type="submit" disabled={!isValid || isSubmitting}/>
        </form>
    );
}

const EditContacts = ({contactKey, contactValue, register}) => {
    return (
        <div style={{paddingLeft: "10px"}}>
            <b>{contactKey}:</b><input defaultValue={contactValue} {...register(`contacts.${contactKey}`)}/>
        </div>
    )
}

export default EditProfileInfoDataForm