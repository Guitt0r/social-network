import {useForm} from "react-hook-form";

const LoginForm = ({login}) => {
    const {reset, register, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm({mode: "onChange"});
    //send data to server,reset form
    const onSubmit = async (data) => {
        await login(data)
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
                <input type='password' placeholder='password'
                       {...register("password", {required: true})} />
                {errors.password && <span>This field is required</span>}
            </div>
            <input type="submit" disabled={!isValid || isSubmitting}/>
        </form>
    );
}
export default LoginForm