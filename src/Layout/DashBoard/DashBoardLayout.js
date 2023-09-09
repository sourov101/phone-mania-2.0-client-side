import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';


import Navbar from '../../Pages/Shared/Navbar/Navbar';
import { AuthContext } from '../../context/AuthProvider';
import useAdmin from '../../hooks/UseAdmin';
import useSeller from '../../hooks/UseSellers';

const DashBoardLayout = () => {

    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);

    return (
        <div>
            <Navbar></Navbar>

            <div className="drawer drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content w-auto p-5">

                    <Outlet />

                </div>
                <div className="drawer-side">

                    <ul className="menu pt-2 w-60 min-h-full bg-slate-900 text-white ">
                        <li ><Link to="/dashboard">My Orders</Link></li>
                        {isAdmin && <>

                            <li><Link to="/dashboard/allusers">All Buyers</Link></li>
                            <li><Link to="/dashboard/allsellers">All Sellers</Link></li>
                            <li><Link to="/dashboard/reporteditems">Reported Items</Link></li>
                        </>}


                        {
                            isSeller && <>
                                <li><Link to="/dashboard/addproduct">Add A Product</Link></li>
                                <li><Link to="/dashboard/myproduct">My Products</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>

            {/* <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet />


                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                        <li><Link to="/dashboard">My Orders</Link></li>
                        {isAdmin && <>

                            <li><Link to="/dashboard/allusers">All Buyers</Link></li>
                            <li><Link to="/dashboard/allsellers">All Sellers</Link></li>
                            <li><Link to="/dashboard/reporteditems">Reported Items</Link></li>
                        </>}


                        {
                            isSeller && <>
                                <li><Link to="/dashboard/addproduct">Add A Product</Link></li>
                                <li><Link to="/dashboard/myproduct">My Products</Link></li>
                            </>
                        }



                    </ul>

                </div>
            </div> */}

        </div>
    );
};

export default DashBoardLayout;