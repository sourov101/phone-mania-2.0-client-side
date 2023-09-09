import { useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"
import { Navigate, useLocation } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <PacmanLoader className=" mx-auto m-10"></PacmanLoader>
    }

    if (user) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>
}

export default PrivateRoute;