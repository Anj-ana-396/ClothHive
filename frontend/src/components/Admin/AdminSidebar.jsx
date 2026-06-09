import { FaClipboardList, FaUser, FaStore, FaBoxOpen } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { logout } from "../../redux/slices/authSlice.js"
import { clearCart } from "../../redux/slices/cartSlice.js"



const AdminSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
   
   
   
    const handleLogout = () => {
        dispatch(logout())
        dispatch(clearCart())
        navigate("/")
    }


    return (
        <div className="p-6">
            <div className="mb-3">
                <Link
                    to="/admin"
                    className="text-3xl font-bold text-teal-600">
                    ClothHive
                </Link>
            </div>
            <h2 className="text-xl font-semibold mb-8  text-topbar ">Admin Dashboard</h2>





            <nav className="flex flex-col space-y-2">


                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
                    }>
                    <FaUser />
                    <span>Users</span>
                </NavLink>



                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
                    }>
                    <FaBoxOpen />
                    <span>Products</span>
                </NavLink>




                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
                    }>
                    <FaClipboardList />
                    <span>Orders</span>
                </NavLink>
               

            </nav>

            <div >
                <button 
                onClick={handleLogout}
                className="my-6 w-full bg-topbar p-1.5 rounded-xl font-semibold text-white text-lg hover:bg-teal-600 hover:scale-105 transition-all duration-600">
                    Logout
                </button>
            </div>


            
        </div>
    )
}

export default AdminSidebar
