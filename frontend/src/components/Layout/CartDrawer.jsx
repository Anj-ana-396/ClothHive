import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import CartContents from '../Cart/CartContents'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"



const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {

    const { user, guestId } = useSelector((state) => state.auth)
    const { cart } = useSelector((state) => state.cart)
    const userId = user ? user._id : null

    const navigate = useNavigate()


    const handleCheckOut = (e) => {
        toggleCartDrawer() 
        if (!user) {
            navigate("/login?redirect=checkout") 
        }
        else {
            navigate("/checkout")
        }
    }


    return (
        <div className={`fixed top-0 right-0 w-3/5 sm:w-2/5 md:w-[28%]  h-full bg-gray-200 shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}>

            {/* cross icon in upper corner */}
            <div>
                <button onClick={toggleCartDrawer} className='p-4'>
                    <IoMdClose className="h-6 w-6 text-gray-600" />
                </button>
            </div>



            {/* cart content with scrollable area */}
            <div className='grow p-2 overflow-y-auto'>

                <h2 className='text-2xl font-bold mb-2 border-b'>Your Cart</h2>

                {/*  Add CardContents.jsx */}
                {cart && cart?.products?.length > 0 ? (
                    <CartContents cart={cart} userId={userId} guestId={guestId} />
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>


            {/* Checkout button */}
            <div className='p-4 bg-white sticky botton-0'>
                {cart && cart?.products?.length > 0 && (
                    <>
                        <button
                            onClick={handleCheckOut}
                            className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>
                            Checkout
                        </button>
                        <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>
                            Your final price assembles itself at checkout—shipping, taxes, and savings in perfect sync.
                        </p>
                    </>
                )}
            </div>


        </div>
    )
}

export default CartDrawer
