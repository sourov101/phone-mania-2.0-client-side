import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSeller from '../../hooks/UseSellers';
import { AuthContext } from '../../context/AuthProvider';
import { PacmanLoader } from "react-spinners";


const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, isLoading] = useSeller(user?.email)
    const location = useLocation();

    if (loading || isLoading) {
        return <PacmanLoader className=" mx-auto m-10"></PacmanLoader>
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;