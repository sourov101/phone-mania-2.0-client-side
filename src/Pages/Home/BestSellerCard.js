import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { BiMessageAdd } from 'react-icons/bi';
import { MdOutlineReportOff } from "react-icons/md";
import Modal from './Modal';
import { toast } from 'react-hot-toast';

const BestSellerCard = () => {
    const product = useLoaderData();
    const { name, image, resalePrice, originalPrice, yearOfUse, postTime, sellerName, location, availability } = product;

    const [book, setBook] = useState(null);

    const handleReport = (productData) => {
        console.log(productData);
        fetch('http://localhost:5000/reported/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {

                    toast.success('report confirmed')
                }
                console.log(data);
            })
    }
    console.log(product);
    return (
        <div >
            <div className='grid my-8 gap-0 grid-cols-1'>
                <div className="card w-1/4 mx-auto bg-slate-900 text-white shadow-xl rounded-none mt-12">
                    <figure><img src={image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-sm lg:text-xl">
                            {name}
                            <div className="badge badge-secondary hidden lg:block md:block text-sm">NEW</div>
                        </h2>
                        <p>Resale Price: {resalePrice}</p>
                        <p>Original Price: {originalPrice}</p>
                        <p>Year Of Use: {yearOfUse}</p>
                        <p>Post Time: {postTime}</p>
                        <p>Seller: {sellerName}</p>
                        <p>Seller Location: {location}</p>
                        <div className='flex justify-end items-baseline gap-4'>
                            {availability === 'false' ?
                                <span className='text-green-500'>Sold</span>


                                :
                                < div className="card-actions justify-end">

                                    <label
                                        htmlFor="modal"

                                        onClick={() => setBook(product)}
                                        className="btn btn-circle btn-outline text-white">
                                        <BiMessageAdd />
                                    </label>

                                </div>}
                            <div className="card-actions justify-end">

                                <button
                                    onClick={() => handleReport(product)}
                                    className="btn btn-circle btn-outline text-red-600">
                                    <MdOutlineReportOff />
                                </button>

                            </div>

                        </div>

                        <div>
                            {book &&


                                <Modal
                                    book={book}
                                    setBook={setBook}
                                >

                                </Modal>}
                        </div>
                    </div>

                </div>



            </div>

        </div>
    );
};

export default BestSellerCard;