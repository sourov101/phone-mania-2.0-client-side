import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-hot-toast';

const Modal = ({ book, setBook }) => {


    const { name, resalePrice, image, _id } = book;

    const { user } = useContext(AuthContext);


    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const meetingLocation = form.meetingLocation.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const productName = form.productName.value;
        const resalePrice = form.resalePrice.value;
        const booking = {


            user: name,
            meetingLocation,
            email,
            phone,
            productName,
            resalePrice,
            image,
            productId: _id

        }
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.acknowledged) {
                    toast.success('Booking confirmed');
                    setBook(null);
                }
                else {
                    toast.success(data.message);
                }
            })
    }

    return (
        <div>
            <>
                <input type="checkbox" id="modal" className="modal-toggle " />
                <div className="modal ">
                    <div className="modal-box bg-white">
                        <h3 className="font-bold text-lg text-slate-900">{name}</h3>
                        <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10 rounded-none bg-white text-slate-900'>
                            <input type="text" name="productName" readOnly value={name} className="input w-full input-bordered bg-slate-900 text-white" />
                            <input type="text" name="resalePrice" readOnly value={resalePrice} className="input w-full input-bordered bg-slate-900 text-white" />

                            <input name="name" defaultValue={user?.displayName} readOnly type="text" placeholder="Your Name" className="input w-full input-bordered bg-slate-900 text-white" />
                            <input name="email" defaultValue={user?.email} readOnly type="email" placeholder="Email Address" className="input w-full input-bordered bg-slate-900 text-white" />
                            <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered bg-slate-900 text-white" />
                            <input name="meetingLocation" type="text" placeholder="meeting location" className="input w-full input-bordered bg-slate-900 text-white" />
                            <br />
                            <input className='btn bg-slate-900 hover:text-slate-900 text-white w-full' type="submit" value="Submit" />
                        </form>

                    </div>
                    <label className="modal-backdrop" htmlFor="modal">Close</label>
                </div>

            </>
        </div>
    );
};

export default Modal;