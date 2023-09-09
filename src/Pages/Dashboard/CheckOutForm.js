import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import { useState } from 'react';

const CheckOutForm = ({ booking }) => {
    const { resalePrice, email, user, _id } = booking;
    const price = resalePrice;
    console.log(booking);
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        }


        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user,
                        email: email,
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        console.log(paymentIntent);
        if (paymentIntent.status === 'succeeded') {




            const payment = {
                resalePrice,
                transactionId: paymentIntent.id,
                email,
                productId: _id,


            }

            fetch('http://localhost:5000/payment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {

                    if (data.insertedId) {
                        setSuccess('Congrats! Your payment is confirmed');
                        setTransactionId(paymentIntent.id);
                    }
                })


            fetch(`http://localhost:5000/products/${booking.productId}`, {
                method: 'PUT',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(productData => console.log(productData))

        }

        setProcessing(false)
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement className='px-80 mt-6'
                    options={{
                        style: {
                            base: {
                                backgroundColor: "#FFFFFF",
                                fontSize: '16px',
                                color: '#0F172A',
                                '::placeholder': {
                                    color: '#0F172A',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn bg-white w-1/6 mt-4 text-slate-900 hover:text-slate-900 hover:bg-slate-500' type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your Transaction Id: {transactionId}</p>
                </div>
            }
        </>
    );
};

export default CheckOutForm;