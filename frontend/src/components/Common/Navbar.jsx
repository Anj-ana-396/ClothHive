import { Link } from "react-router-dom"
import { HiOutlineUserCircle, HiShoppingBag } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";
import Searchbar from './Searchbar';
import CartDrawer from '../Layout/CartDrawer';
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";



const Navbar = () => {


    // for cart dot icon
    const { cart } = useSelector((state) => state.cart)
    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0
    const { user } = useSelector((state) => state.auth)

    // for sidecartDrawer
    const [drawerOpen, setDrawerOpen] = useState(false)
    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }


    //for hamburger menu
    const [navDrawerOpen, setNavDrawerOpen] = useState(false)
    const handleToggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen)
    }

    return (
        <>
            <nav className='container mx-auto flex items-center justify-between py-4 px-5'>



                {/* left -- for logo */}
                <div>
                    <Link to="/" className='sm:text-4xl text-2xl font-bold'>
                        ClothHive
                    </Link>
                </div>




                {/* Center - for navigation links */}
                <div className='hidden md:flex space-x-4 mx-12'>
                    <Link
                        to="collections/all"
                        className='text-gray-600 hover:text-topbar text-sm font-medium uppercase'>
                        All
                    </Link>
                    <Link
                        to="collections/all?gender=Men"
                        className='text-gray-600 hover:text-topbar text-sm font-medium uppercase'>
                        Men
                    </Link>
                    <Link
                        to="collections/all?gender=Women"
                        className='text-gray-600 hover:text-topbar text-sm font-medium uppercase'>
                        Women
                    </Link>
                    <Link
                        to="collections/all?category=Top Wear"
                        className='text-gray-600 hover:text-topbar text-sm font-medium uppercase '>
                        TopWear
                    </Link>
                    <Link
                        to="collections/all?category=Bottom Wear"
                        className='text-gray-600 hover:text-topbar text-sm font-medium uppercase'>
                        BottomWear
                    </Link>
                </div>




                {/* Right-for icons */}
                <div className='flex items-center space-x-4'>



                    {/* for admin link in navbar..only visible if logged in with admin username...else remains invisible */}
                    {user && user.role === "admin" && (
                        <Link
                            to="/admin"
                            className=" mx-4 lg:text-lg  md:text-sm text-xs block lg:px-4 lg:py-2 px-2.5 py-1.5  rounded-lg bg-teal-500 text-white font-semibold hover:opacity-55">Admin</Link>
                    )}



                    <Link to="/profile" className='hover:text-topbar'>
                        <HiOutlineUserCircle className='h-6 w-6 text-gray-600' />
                    </Link>


                    {/* shopping bag with notification dots */}
                    <button onClick={toggleCartDrawer}
                        className='relative hover:text-topbar'>
                        <HiShoppingBag className='h-6 w-6 text-gray-600' />
                        {cartItemCount > 0 && (<span className=' absolute -top-1 bg-topbar text-white text-xs rounded-full px-1.5 py-0.45'>
                            {cartItemCount}
                        </span>)}
                    </button>


                    {/* Search icon */}
                    <div className="overflow-hidden">
                        <Searchbar />
                    </div>


                    {/* Hamburger icon in navbar - for mobile navigation */}
                    <button
                        onClick={handleToggleNavDrawer}
                        className='md:hidden'>
                        <GiHamburgerMenu className='h-6 w-6 text-gray-600' />
                    </button>


                </div>
            </nav>


            {/* for cartdrawer */}
            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />


            {/*  Hamburger side drawer - Mobile navigation  */}
            <div className={`fixed top-0 left-0 w-2/5   h-full  bg-white shadow-lg transform transition-transform duration-200 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-end p-4">
                    <button onClick={handleToggleNavDrawer}>
                        <IoMdClose className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-5">MENU</h2>
                    <nav className="space-y-2">
                        <Link
                            to="collections/all"
                            onClick={handleToggleNavDrawer}
                            className="block text-gray-600 hover:text-topbar" >
                            All Collections
                        </Link>
                        <Link
                            to="collections/all?gender=Men"
                            onClick={handleToggleNavDrawer}
                            className="block text-gray-600 hover:text-topbar" >
                            Men
                        </Link>
                        <Link
                            to="collections/all?gender=Women"
                            onClick={handleToggleNavDrawer}
                            className="block text-gray-600 hover:text-topbar" >
                            Women
                        </Link>
                        <Link
                            to="collections/all?category=Top Wear"
                            onClick={handleToggleNavDrawer}
                            className="block text-gray-600 hover:text-topbar" >
                            Topwear
                        </Link>
                        <Link
                            to="collections/all?category=Bottom Wear"
                            onClick={handleToggleNavDrawer}
                            className="block text-gray-600 hover:text-topbar" >
                            Bottomwear
                        </Link>
                    </nav>
                </div>
            </div>

        </>
    )
}

export default Navbar
