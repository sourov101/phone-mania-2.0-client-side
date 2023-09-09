import React, { useContext, useState } from 'react';
import bgimage from '../../assets/images/signup.jpg';
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthProvider';
import useAccessToken from '../../hooks/useAccessToken';
import { toast } from 'react-hot-toast';




const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [accessToken] = useAccessToken(createdUserEmail);
    const navigate = useNavigate();

    if (accessToken) {
        navigate('/');
    }

    const handelSignup = (data) => {
        console.log('data', data);
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);

                toast.success('User created successfully');

                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUserToDb(data.name, data.email, data.userType);
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });

        const saveUserToDb = (name, email, userType) => {
            const user = { name, email, userType };
            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    setCreatedUserEmail(email);
                    console.log(data);
                })
        }
    }


    const handelGoogleSignIn = () => {
        signInWithGoogle()
            .then(res => {
                const user = res.user;
                const userInfo = {
                    userType: 'User'
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUserToDb(user?.displayName, user?.email, userInfo.userType);
                    })
                console.log('inside google', user)

            })
            .catch(error => {
                console.error(error)
            })


        const saveUserToDb = (name, email, userType) => {
            const user = { name, email, userType };
            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {

                    toast.success('User created successfully');

                    setCreatedUserEmail(email);
                    console.log(data);
                })
        }

    }



    return (
        <div className="hero min-h-screen  bg-base-200 " style={{ backgroundImage: `url(${bgimage})` }}>
            <div className="hero-overlay bg-opacity-30"></div>

            <form onSubmit={handleSubmit(handelSignup)} className="card w-50 lg:w-96 rounded-none  shadow-2xl bg-white text-slate-900">

                <div className="card-body">
                    <div className="text-center">
                        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">Sign Up now!</h1>
                    </div>
                    <div className="form-control">
                        <label className="label"> <span className="label-text text-slate-900">Name</span></label>
                        <input type="text" placeholder="Name" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered  bg-slate-900 text-white " />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-slate-900">Email</span>
                        </label>
                        <input {...register("email", { required: "Email Address is required" })} type="email" name='email' placeholder="email" className="input input-bordered bg-slate-900 text-white" />
                        {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}

                    </div>

                    <div className="form-control">
                        <label className="label"> <span className="label-text">Select User Type</span></label>
                        <select {...register("userType", { required: true })} className="select select-bordered bg-slate-900 text-white ">

                            <option >User</option>
                            <option>Seller</option>
                        </select>


                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-slate-900">Password</span>
                        </label>
                        <input {...register("password", { required: "Password is required", minLength: { value: 6, message: 'Password must be 6 character or longer' } })} type="password" placeholder="password" className="input input-bordered bg-slate-900 text-white" />
                        <label className="label">

                        </label>
                        <label className="label">

                        </label>
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                    </div>


                    <div className="form-control">
                        <button type='submit' className="btn bg-slate-900 text-white hover:text-slate-900 text-lg font-bold">Sign Up</button>
                    </div>

                    <div>
                        <p className='text-slate-900 mt-6 label-text'>Already have an account !!  <Link className='text-slate-500 link-hover' to='/login'>Sign in !!</Link></p>
                        <div className="divider">OR</div>
                        <div className="form-control ">
                            <button onClick={handelGoogleSignIn} type='button' className="btn bg-slate-900 text-white hover:text-slate-900 text-lg font-bold"><BsGoogle /></button>
                        </div>
                    </div>


                </div>




            </form>






        </div >
    );
};

export default Signup;