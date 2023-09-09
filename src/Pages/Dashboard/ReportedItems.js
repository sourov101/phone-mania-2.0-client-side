import { useQuery } from 'react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { RiDeleteBin2Line } from 'react-icons/ri';


const ReportedItems = () => {

    const url = 'http://localhost:5000/reported';

    const { data: reportedItems = [], refetch } = useQuery({
        queryKey: ['reported'],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })

    const handelDelete = id => {
        fetch(`http://localhost:5000/products/${id}`, {
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
        fetch(`http://localhost:5000/reported/${id}`, {
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

                    refetch();
                }
            })
    }






    console.log(reportedItems);
    return (
        <div>
            <h3 className="text-3xl mb-5">Reported Items</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Delete</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedItems.map((Item, i) => <tr key={Item._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-24 mask mask-squircle">
                                        <img src={Item?.image} alt='' />
                                    </div>
                                </div>
                                </td>
                                <td>{Item.name}</td>
                                <td>{Item.resalePrice}</td>

                                <td>
                                    <button onClick={() => handelDelete(Item._id)} className='btn btn-circle btn-outline btn-error btn-sm text-white'><RiDeleteBin2Line className='w-6 h-6' /></button>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedItems;