import {useForm} from "react-hook-form";

const RegisterForm = ({registerNewUser}) => {
    const {reset, register, handleSubmit, formState: {errors, isValid}} = useForm({mode: "onChange"});
    //send data to server and check for errors
    const onSubmit = async (data) => {
        await registerNewUser(data)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input type='email' placeholder='email'
                       {...register("email", {required: true})} />
                {errors.email && <span>This field is required</span>}
            </div>
            <div>
                <input type='text' placeholder='username'
                       {...register("username", {required: true})} />
                {errors.username && <span>This field is required</span>}
            </div>
            <div>
                <input type='password' placeholder='password'
                       {...register("password", {required: true})} />
                {errors.password && <span>This field is required</span>}
            </div>

            <input type="submit" disabled={!isValid}/>
        </form>
    );
}
export default RegisterForm