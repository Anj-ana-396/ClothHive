import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import PaypalButton from "./MyPaypalButton.jsx"
import MyPaypalButton from './MyPaypalButton.jsx';
import { useDispatch, useSelector } from "react-redux"
import { createCheckout } from "../../redux/slices/checkoutSlice.js"
import axios from "axios"






const Checkout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { cart, loading, error } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);




    const [checkoutId, setCheckOutId] = useState(null)
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    })



    //Ensure cart is leaded before proceeding
    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate("/");// redirect to home page is there is no product in cart
        }
    }, [cart, navigate]);




    // this function will fetch datat from backend through paypal....and then this function worls
    const handleCreateCheckout = async (e) => {
        e.preventDefault()
        // setCheckOutId(1234)
        if (cart && cart.products.length > 0) {
            const res = await dispatch(createCheckout({
                checkoutItems: cart.products,
                shippingAddress,
                paymentMethod: "Paypal",
                totalPrice: cart.totalPrice,
            }))
            if (res.payload && res.payload._id) {
                setCheckOutId(res.payload._id) // set checki=out id if checkout was suvvessful
            }
        }
    }



    // handle payment sucess for paypal develoepr account
    const handlePaymentSuccess = async (details) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                { paymentStatus: "paid", paymentDetails: details },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            )
                await handleFinalizeCheckout(checkoutId); // Finalize checkout if payment is successful 
        } catch (error) {
            console.error(error)
        }
    }



    const handleFinalizeCheckout = async (checkoutId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            )
                navigate("/order-confirmation")
        } catch (error) {
            console.error(error)
        }
    }



    if (loading) return <p>Loading cart ... </p>
    if (error) return <p>Error: {error} </p>
    if (!cart || !cart.products || cart.products.length === 0) {
        return <p>Your cart is empty</p>
    }




    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8  py-10 px-6 tracking-tighter mb-12 '>

            {/* Left section for form */}
            <div className="bg-white rounded-lg px-8 py-12 border-amber-400 border-3 md:mx-16 mx-3">
                <h2 className="md:text-5xl text-3xl font-bold text-cornflower-blue-500 mb-2 text-center ">CHECKOUT</h2>

                <form onSubmit={handleCreateCheckout}>
                    <h3 className="md:text-2xl text-xl mb-6 font-semibold text-center text-amber-600">Contact Details</h3>



                    {/* for email */}
                    <div className="mb-4">
                        <label className="block text-gray-500 font-semibold pb-0.5 text-xl ">Email</label>
                        <input
                            type="email"
                            value={user? user.email : ""}
                            className="w-full py-1 px-3  border-2  border-gray-300  text-topbar text-base rounded font-semibold cursor-pointer "
                            disabled
                        />
                    </div>



                    {/* For firstname + lastName */}
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        {/* For First name */}
                        <div>
                            <label className="block text-gray-500 font-semibold pb-0.5 text-lg ">First Name</label>
                            <input
                                type="text"
                                value={shippingAddress.firstName}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        firstName: e.target.value,
                                    })
                                }
                                className="w-full py-1 px-3 border-2  border-gray-300 text-topbar text-base rounded font-semibold cursor-pointer "
                                required />


                            {/* for last name */}
                        </div>
                        <div>
                            <label className="block text-gray-500 font-semibold pb-0.5 text-lg ">Last Name</label>
                            <input
                                type="text"
                                value={shippingAddress.lastName}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        lastName: e.target.value,
                                    })
                                }
                                className="w-full py-1 px-3  border-2 border-gray-300 text-topbar text-base rounded font-semibold cursor-pointer "
                                required />
                        </div>
                    </div>





                    {/* for address */}
                    <div className="mb-4 ">
                        <div>
                            <label className="block text-gray-500 font-semibold pb-0.5 text-lg ">Address</label>
                            <input
                                type="text"
                                value={shippingAddress.address}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        address: e.target.value,
                                    })
                                }
                                className="w-full py-1 px-3  border-2 border-gray-300 text-topbar text-base rounded font-semibold cursor-pointer "
                                required />
                        </div>
                    </div>




                    {/* For city + postal code */}
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        {/* For city */}
                        <div>
                            <label className="block text-gray-500 font-semibold pb-0.5 text-lg ">City</label>
                            <input
                                type="text"
                                value={shippingAddress.city}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        city: e.target.value,
                                    })
                                }
                                className="w-full py-1 px-3  border-2 border-gray-300 text-topbar text-base rounded font-semibold cursor-pointer "
                                required />


                            {/* for postal code */}
                        </div>
                        <div>
                            <label className="block text-gray-500 font-semibold pb-0.5 text-lg ">Postal Code</label>
                            <input
                                type="text"
                                value={shippingAddress.postalCode}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        postalCode: e.target.value,
                                    })
                                }
                                className="w-full py-1 px-3  border-2 border-gray-300 text-topbar text-base rounded font-semibold cursor-pointer "
                                required />
                        </div>
                    </div>


                    {/* for country */}
                    <div className="mb-4 ">
                        <div>
                            <label className="block text-gray-500 font-semibold pb-0.5 text-lg ">Country</label>
                            <input
                                type="text"
                                value={shippingAddress.country}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        country: e.target.value,
                                    })
                                }
                                className="w-full py-1 px-3  border-2 border-gray-300 text-topbar text-base rounded font-semibold cursor-pointer "
                                required />
                        </div>
                    </div>



                    {/* for Phone number */}
                    <div className="mb-4 ">
                        <div>
                            <label className="block text-gray-500 font-semibold pb-0.5 text-lg ">Phone Number</label>
                            <input
                                type="tel"
                                value={shippingAddress.phone}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        phone: e.target.value,
                                    })
                                }
                                className="w-full py-1 px-3  border-2 border-gray-300 text-topbar text-base rounded font-semibold cursor-pointer "
                                required />
                        </div>
                    </div>

                    {/* continue to Payment button */}
                    <div className='mt-6'>
                        {!checkoutId ? (
                            <button
                                type="submit"
                                className='w-full py-2 px-4 hover:bg-amber-600 bg-topbar text-white font-semibold text-lg  rounded-xl cursor-pointer'>
                                Continue to Payment
                            </button>) :
                            (
                                <div>
                                    <h3 className='text-lg mb-4'>Pay with Paypal</h3>

                                    {/* paypalButton component */}
                                    <MyPaypalButton
                                        amount={cart.totalPrice}
                                        onSuccess={handlePaymentSuccess}
                                        onError={(err) => alert("Paypal Payment failed. Try again.")}
                                    />
                                </div>
                            )}
                    </div>
                </form>
            </div>




            {/* right section - order summary */}
            <div className="bg-gray-100 p-6 rounded-lg lg:w-[90%] w-full">
                <h3 className="md:text-4xl text-2xl my-5 font-bold text-center ">ORDER SUMMARY</h3>
                <div className="border-t  mb-3">
                    {cart.products.map((product, index) => (
                        <div
                            key={index}
                            className="flex items-start justify-between py-3 border-b" >
                            <div className="flex items-start">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-30 h-30 object-cover mr-4 rounded-2xl" />
                                <div>
                                    <h3 className="text-md text-bold">{product.name}</h3>
                                    <p className="text-gray-400 text-sm font-semibold">Size: {product.size}</p>
                                    <p className="text-topbar text-sm font-semibold">Color: {product.color}</p>
                                </div>
                            </div>
                            <p className='text-xl text-cornflower-blue-500'>${product.price?.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center text-lg mb-4  text-teal-600'>
                    <p className='font-bold md:text-xl text-lg'>Subtotal</p>
                    <p >${cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center text-lg text-teal-600">
                    <p className='font-bold md:text-xl text-lg '>Shipping</p>
                    <p >Free</p>
                </div>
                <div className="flex justify-between items-center text-lg mt-4 border-t pt-4 border-black text-amber-600">
                    <p className=' font-bold md:text-2xl text-xl'>Total</p>
                    <p className='text-xl font-semibold'>${cart.totalPrice?.toLocaleString()}</p>
                </div>
            </div>



        </div >
    )
}

export default Checkout
