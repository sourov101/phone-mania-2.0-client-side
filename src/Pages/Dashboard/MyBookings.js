import { useQuery } from 'react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { MdPayment } from 'react-icons/md';
import { FcPaid } from 'react-icons/fc';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { toast } from 'react-hot-toast';


const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/bookings/${user?.email}`;

    const { data: bookedItems = [], refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });


            const data = await res.json();

            return data;

        }

    })

    const handelDelete = id => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success('Delete confirmed')
                    refetch();
                }
            })
    }

    return (
        <div>
            <h3 className="text-3xl m-4">My Ordered Items</h3>
            {bookedItems == 0 ?

                <div className='mx-auto'>
                    <h3 className="text-2xl mt-20 text-center">No Items Found</h3>
                </div>

                :
                < div className="overflow-x-auto mx-10">
                    <table className="table w-full">
                        <thead>
                            <tr>

                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Pay</th>
                                <th>Delete</th>




                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookedItems.map((Item) => <tr key={Item._id}>

                                    <td><div className="avatar">
                                        <div className="w-24 mask mask-squircle">
                                            <img src={Item?.image} alt='' />
                                        </div>
                                    </div>
                                    </td>
                                    <td>{Item.productName}</td>
                                    <td>{Item.resalePrice}</td>

                                    <td>
                                        {user && Item.resalePrice && !Item.paid && <Link to={`/dashboard/payment/${Item._id}`}><button className='btn btn-circle btn-outline btn-info btn-sm'><MdPayment className='w-6 h-6' /></button></Link>}
                                        {
                                            Item.resalePrice && Item.paid && <span className='text-green-500'><FcPaid className='w-6 h-6' /></span>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handelDelete(Item._id)} className='btn btn-circle btn-outline btn-error btn-sm text-white'><RiDeleteBin2Line className='w-6 h-6' /></button>

                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>

            }
        </div >
    );
};

export default MyBookings;