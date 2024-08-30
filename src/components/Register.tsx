import {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {registerAccount} from "../Api.ts";
import {AuthContext} from "../contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

export function Register() {
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");

    const {checkForToken, setLoginItems} = useContext(AuthContext)
    const navigate = useNavigate()
    function handleRegister(data) {
        if (data !== "") {
            registerAccount({username: data.username, email: data.email, password: data.password}).then(r => {
                if (!r) {
                    setError("Registration failed")
                } else {
                    setLoginItems(r.jwt, data.username)
                    checkForToken()
                }
            })
        }
    }

    return (
        <div className="h-[100vh] flex justify-center items-center">
            <div className="max-w-[428px] w-full border border-[#C7C7C7] rounded-[28px]">
                <div className="flex justify-center">
                    <form className="space-y-[23px] my-[18px] mx-[47px]"
                          onSubmit={handleSubmit((data) => handleRegister(data))}>
                        <p className="w-full text-center">Register</p>
                        <input
                            className="w-full py-[13px] px-[13px] text-[17px] border border-[#D2D2D2] rounded-[15px] bg-[#F2F2F2]" {...register("username")}
                            placeholder="Username"/>
                        <input
                            className="w-full py-[13px] px-[13px] text-[17px] border border-[#D2D2D2] rounded-[15px] bg-[#F2F2F2]" {...register("email")}
                            placeholder="Email"/>
                        <input
                            className="w-full py-[13px] px-[13px] text-[17px] border border-[#D2D2D2] rounded-[15px] bg-[#F2F2F2]" {...register("password")}
                            placeholder="Password"/>
                        <button
                            className="text-[#2400FF] py-[13px] px-[13px] border-[2px] border-[#2400FF] rounded-[15px] text-md w-full"
                            type="submit">Register
                        </button>
                        <div className="w-full text-center">
                            <p className="text-[#868686]">Already have an account? <button
                                className="text-black" type="button"
                                onClick={() => navigate('/login')}>Login</button></p>
                        </div>
                        {error ? <div className="w-full text-center">
                            <p className="text-red-500">{error}</p>
                        </div> : null}
                    </form>
                </div>
            </div>
        </div>
    )
}