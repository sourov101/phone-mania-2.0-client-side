import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import Product from "../../Pages/Home/Product";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import BestSellerCard from "../../Pages/Home/BestSellerCard";
import DashBoardLayout from "../../Layout/DashBoard/DashBoardLayout";
import MyBookings from "../../Pages/Dashboard/MyBookings";
import AdminRoute from "./AdminRoute";
import AllUsers from "../../Pages/Dashboard/AllUsers";
import AllSellers from "../../Pages/Dashboard/AllSellers";
import ReportedItems from "../../Pages/Dashboard/ReportedItems";
import AddProduct from "../../Pages/Dashboard/AddProduct";
import SellerRoute from "./SellerRoute";
import MyProduct from "../../Pages/Dashboard/MyProduct";
import Blog from "../../Pages/Blog/Blog";
import Payment from "../../Pages/Dashboard/Payment";


export const router = createBrowserRouter([


    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/product/:BrandId',
                element: <PrivateRoute><Product></Product></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.BrandId}`)
            },
            {
                path: '/products/:id',
                element: <PrivateRoute><BestSellerCard /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/product/${params.id}`)
            },

        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>

            },
            {
                path: '/dashboard/reporteditems',
                element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            },
            {
                path: '/dashboard/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/myproduct',
                element: <SellerRoute><MyProduct></MyProduct></SellerRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`http://localhost:5000/booking/${params.id}`)
            },

        ]


    },
])