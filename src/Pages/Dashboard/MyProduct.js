import { useQuery } from 'react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';
import { RiDeleteBin2Line } from 'react-icons/ri';

const MyProduct = () => {
    const { user } = useContext(AuthContext);
    const url = 'http://localhost:5000/products';

    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ['products'],
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
    }





    return (
        <div>
            <h3 className="text-3xl mb-5">My Products</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>

                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Delete</th>



                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts.map((myProduct) => <React.Fragment key={myProduct._id}>
                                {
                                    myProduct?.email === user?.email &&
                                    <tr>

                                        <td><div className="avatar">
                                            <div className="w-24 mask mask-squircle">
                                                <img src={myProduct?.image} alt='' />
                                            </div>
                                        </div>
                                        </td>
                                        <td>{myProduct.name}</td>
                                        <td>{myProduct.resalePrice}</td>
                                        <td>{myProduct.availability}</td>

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
    );
};

export default MyProduct;