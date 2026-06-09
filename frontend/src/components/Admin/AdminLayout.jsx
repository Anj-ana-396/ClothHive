import { useState } from 'react'
import { FaBars } from "react-icons/fa";
import {Outlet} from "react-router-dom"
import AdminSidebar from "./AdminSidebar.jsx";
import {Link} from "react-router-dom"



const AdminLayout = () => {

    const [isSidebarOpen, setisSidebarOpen] = useState(false)

    const toggleSideBar = () => {
        setisSidebarOpen(!isSidebarOpen)
    }
    return (
        <div className="min-h-screen flex flex-col md:flex-row relative">
            {/* Mobile Toggle Button */}
            <div className="flex md:hidden p-4 bg-teal-700  text-teal-100 z-30 ">
                <button onClick={toggleSideBar}>
                    <FaBars className="size-5" />
                </button>
                <h1 className="ml-4 text-lg font-medium  ">Admin Dashboard</h1>
            </div>



            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-10 md:hidden bg-gray-400 "
                    onClick={toggleSideBar}
                ></div>
            )}


            {/* Sidebar */}
            <div
                className={`bg-gray-900 w-[55%] md:w-1/3 lg:w-1/4  min-h-screen text-white absolute md:relative transform
                           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                            transition-transform duration-300
                            md:translate-x-0 md:static md:block z-30`}>
                <AdminSidebar />
            </div>


            {/* Main Content */}
            <div className='grow p-6 overflow-auto'>
                <Outlet />
            </div>

         
        </div>
    )
}

export default AdminLayout
