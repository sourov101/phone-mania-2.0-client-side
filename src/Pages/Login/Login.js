import React, { useContext, useState } from 'react';
import bgimage from '../../assets/images/login.jpg';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useAccessToken from '../../hooks/useAccessToken';


const Login = () => {
    const { reset, register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserMail, setLoginUserMail] = useState('');
    const [accessToken] = useAccessToken(loginUserMail);


    const navigate = useNavigate();




    if (accessToken) {
        navigate('/');
    }

    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserMail(data.email)
                reset();

            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }



    return (
        <div className="hero min-h-screen  bg-base-200 " style={{ backgroundImage: `url(${bgimage})` }}>
            <div className="hero-overlay bg-opacity-30"></div>

            <form onSubmit={handleSubmit(handleLogin)} className="card w-50 lg:w-96 rounded-none  shadow-2xl bg-white text-slate-900">

                <div className="card-body">
                    <div className="text-center">
                        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-slate-900">Email</span>
                        </label>
                        <input {...register("email", { required: "Email Address is required" })} type="email" name='email' placeholder="email" className="input input-bordered bg-slate-900 text-white" />
                        {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-slate-900">Password</span>
                        </label>
                        <input {...register("password", { required: "Password is required", minLength: { value: 6, message: 'Password must be 6 character or longer' } })} type="password" placeholder="password" className="input input-bordered bg-slate-900 text-white" />
                        <label className="label">
                            <a href="##" className="label-text-alt link link-hover text-slate-900">Forgot password?</a>
                        </label>
                        {errors.password && <p className='text-red-500' >{errors.password?.message}</p>}
                    </div>
                    <div className="form-control">
                        <button type='submit' className="btn bg-slate-900 text-white hover:text-slate-900 text-lg font-bold">Login</button>
                    </div>

                    <div>
                        <p className='text-slate-900 mt-6 label-text'>New to Phone Mania !! <Link className='text-slate-500 link-hover' to='/signup'>Create New Account</Link></p>
                    </div>


                </div>


            </form>




        </div >

    );
};

export default Login;