import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../hooks/UseAdmin';
import { AuthContext } from '../../context/AuthProvider';
import { PacmanLoader } from "react-spinners";


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isLoading] = useAdmin(user?.email)
    const location = useLocation();

    if (loading || isLoading) {
        return <PacmanLoader className=" mx-auto m-10"></PacmanLoader>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;