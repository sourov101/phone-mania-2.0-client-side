import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const [Sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(user);
    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(data => {

                const brandData = data.data;

                setSellers(brandData);
                setLoading(false);
            })

    }, [])

    const handleProduct = (productData) => {
        console.log(productData);
        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(productData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {

                    toast.success('product added successfully');
                    navigate('/dashboard/myproduct')
                }
                console.log(data);
            })
    }



    return (
        <div className='my-10 mx-auto'>
            <h1 className='text-3xl mt-10'>Add Your Product</h1>
            <form onSubmit={handleSubmit(handleProduct)}>
                <div className='flex gap-2 mb-8'>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Seller Email</span></label>
                        <input type="email" defaultValue={user.email} readOnly {...register('email', {
                            required: "email is Required",

                        }

                        )}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Seller Name</span></label>
                        <input type="text" defaultValue={user.displayName} readOnly {...register('sellerName', {
                            required: "name is Required",

                        }

                        )}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Seller Verification</span></label>
                        {
                            Sellers.map(seller => <React.Fragment key={seller._id}>
                                {
                                    seller?.email === user?.email &&
                                    <React.Fragment>{
                                        seller?.verified === 'true' &&
                                        <input type="text" defaultValue={seller?.verified} readOnly {...register('verified', {
                                            required: "email is Required",

                                        }

                                        )}
                                            className="input input-bordered w-full " />

                                    }
                                        {seller?.verified !== 'true' && <input type="text" defaultValue={'false'} readOnly {...register('verified', {
                                            required: "email is Required",

                                        }

                                        )}
                                            className="input input-bordered w-full " />}

                                    </React.Fragment>



                                }
                            </React.Fragment>)
                        }
                    </div>
                </div>
                <div className='flex gap-2 mb-8'>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Product Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Image</span></label>
                        <input type="text" {...register("image", {
                            required: true
                        })} className="input input-bordered w-full " />
                    </div>
                </div>
                <div className='flex gap-2 mb-8'>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Resale Price</span></label>
                        <input type="text" {...register("resalePrice", {
                            required: true
                        })} className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Original Price</span></label>
                        <input type="text" {...register("originalPrice", {
                            required: true
                        })} className="input input-bordered w-full " />
                    </div>

                </div>
                <div className="form-control w-full mb-8">
                    <label className="label"> <span className="label-text text-xs">Select Brand Type: <span className='text-red-500 font-bold'>Note: samsung for: 1, apple for :2 , onePlus for: 3</span></span></label>
                    <select {...register("BrandId", { required: true })} className="select select-bordered w-full ">

                        <option >1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>


                </div>
                <div className='flex gap-2 mb-8'>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Product condition:</span> </label>
                        <select {...register("condition", { required: true })} className="select select-bordered w-full ">

                            <option >excellent</option>
                            <option>good</option>
                            <option>fair</option>
                        </select>


                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Availability :</span> </label>
                        <select {...register("availability", { required: true })} className="select select-bordered w-full ">

                            <option >available</option>
                            <option>false</option>

                        </select>


                    </div>
                </div>

                <div className='flex gap-2 mb-8'>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Mobile No:</span></label>
                        <input type="tel" {...register("mobile", {
                            required: true,

                        })} className="input input-bordered w-full " />

                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Location:</span></label>
                        <input type="text" {...register("location", {
                            required: true,

                        })} className="input input-bordered w-full " />

                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Description:</span></label>
                        <input type="text" {...register("description", {
                            required: true,

                        })} className="input input-bordered w-full " />

                    </div>
                </div>
                <div className='flex gap-2 mb-8'>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Year of purchase:</span></label>
                        <input type="date" {...register("yearofpurchase", {
                            required: true,

                        })} className="input input-bordered w-full " />

                    </div>

                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Post Time:  </span></label>
                        <input type="date" {...register("postTime", {
                            required: true,

                        })} className="input input-bordered w-full " />

                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Year of use: <span className='text-red-500 font-bold'>Example: '1y','1m'</span> </span></label>
                        <input type="text" {...register("yearOfUse", {
                            required: true,

                        })} className="input input-bordered w-full " />

                    </div>
                </div>
                <input className='btn bg-slate-900 w-full mt-4 text-white hover:text-slate-900' value="Submit" type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;