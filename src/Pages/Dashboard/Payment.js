import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);

const Payment = () => {
    const booking = useLoaderData();
    console.log(booking);

    return (
        <div className='mx-auto'>

            <div className="card bg-slate-900 text-white py-14 shadow-xl rounded-none mt-12 text-center">

                <h2 className="text-sm lg:text-2xl font-bold">
                    Payment for {booking.productName}
                </h2>

                <h2 className="text-sm mt-4">
                    Pay <strong>${booking.resalePrice}</strong> to purchase the product
                </h2>

                <div className="mt-16">
                    <div className='flex justify-evenly align-middle'>
                        <p>Debit/Credit Card</p>
                        <div className='flex gap-2'>
                            <FaCcMastercard className='w-6 h-6' />
                            <FaCcVisa className='w-6 h-6' />
                        </div>
                    </div>
                </div>

                <div className=''>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm booking={booking} />
                    </Elements>
                </div>

            </div>

        </div>
    );
};

export default Payment;