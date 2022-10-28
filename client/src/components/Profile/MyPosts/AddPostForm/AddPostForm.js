import {useForm} from "react-hook-form";

const AddPostForm = ({createPost}) => {
    const {reset, register, handleSubmit, formState: {errors, isValid}} = useForm();
    //send data to server and check for errors
    const onSubmit = async (data) => {
        await createPost(data.text)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea placeholder='Add Post...'
                          {...register("text", {required: true})} />
                {errors.text && <span>This field is required</span>}
            </div>
            <input type="submit"/>
        </form>
    );
}
export default AddPostForm