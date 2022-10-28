import {useForm} from "react-hook-form";

const EditPostForm = ({deactivateEditMode, text,id}) => {
    const {reset, register, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm();
    //send data to server,reset form
    const onSubmit = (data) => {
        deactivateEditMode(data.text)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue={text} type='text'
                   placeholder='Post...' {...register("text", {required: true})}/>

            <input type="submit" disabled={!isValid || isSubmitting}/>

            <div>
                {errors.text && <span>required</span>}
            </div>
        </form>
    );
}


export default EditPostForm