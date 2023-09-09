import React from 'react';
import { AiOutlineArrowRight } from "react-icons/ai";

import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';


const BestSeller = () => {
    const { data: products = [], refetch, isLoading } = useQuery({

        queryKey: ['products'],
        queryFn: () => fetch(`http://localhost:5000/products`)
            .then(res => res.json())

    })


    return (
        <div>
            <div className='mt-32 lg:mt-16 ml-10 '>
                <h1 className='text-[50px] font-bold text-slate-900 '>Best Seller</h1>
            </div>

            <div className='grid my-8 gap-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products.map(product =>
                        <div key={product._id} className="card w-auto bg-slate-900 text-white shadow-xl rounded-none mt-12 mx-8">
                            <figure ><img src={product.image} alt="img" className='w-auto h-auto lg:h-[390px]' /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-sm lg:text-xl">
                                    {product.name}
                                    <div className="badge badge-secondary hidden lg:block md:block text-sm">NEW</div>
                                </h2>

                                <Link to={`/products/${product._id}`} key={product._id}>

                                    <div className="card-actions justify-end">


                                        <label
                                            className="btn btn-circle btn-outline text-white">
                                            <AiOutlineArrowRight />
                                        </label>


                                    </div>

                                </Link>




                            </div>

                        </div>

                    )
                }
            </div>

        </div >
    );
};

export default BestSeller;