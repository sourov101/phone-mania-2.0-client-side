import { useQuery } from 'react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { LuVerified } from 'react-icons/lu';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

const AllSellers = () => {

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            console.log(data);
            return data;
        }
    })

    const handelAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Admin confirmed')
                    refetch();
                }
            })
    }
    const handelVerify = id => {
        fetch(`http://localhost:5000/users/verify/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Verify confirmed')
                    refetch();
                }
            })
    }

    const handelDelete = id => {
        fetch(`http://localhost:5000/users/${id}`, {
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
            <h3 className="text-3xl mb-5">All Sellers</h3>
            <div className="overflow-x-auto">

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>


                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Verify</th>
                                <th>Delete</th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => <React.Fragment key={user._id}>
                                    {user.userType === 'Seller' &&
                                        <tr key={user._id}>


                                            <td className='flex'>{user.name} {
                                                user.verified === 'true' && <FaCheck className='text-primary mx-2' />
                                            }</td>
                                            <td>{user.email}</td>

                                            <td>
                                                {user.role !== 'admin' && <button onClick={() => handelAdmin(user._id)} className='btn btn-circle btn-outline btn-primary btn-sm'><MdOutlineAdminPanelSettings className='w-6 h-6' /></button>}

                                            </td>
                                            <td>
                                                {user.verified !== 'true' &&
                                                    <button onClick={() => handelVerify(user._id)} className='btn btn-circle btn-outline btn-secondary btn-sm text-white'><LuVerified className='w-6 h-6' /></button>}

                                            </td>
                                            <td>
                                                <button onClick={() => handelDelete(user._id)} className='btn btn-circle btn-outline btn-error btn-sm text-white'><RiDeleteBin2Line className='w-6 h-6' /></button>

                                            </td>
                                        </tr>
                                    }
                                </React.Fragment>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllSellers;