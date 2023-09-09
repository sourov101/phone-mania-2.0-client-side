import React, { useState } from 'react';
import { BiMessageAdd } from 'react-icons/bi';
import { MdOutlineReportOff } from "react-icons/md";
import Modal from './Modal';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
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



    return (
        <div className=''>



            {

                <div className="card w-auto bg-slate-900 text-white shadow-xl rounded-none mt-12 mx-12">
                    <figure><img src={image} alt="Shoes" className='h-auto lg:h-[390px]' /></figure>
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
                        <div className='flex justify-end items-center gap-4'>
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
            }
        </div >
    );
};

export default ProductCard;