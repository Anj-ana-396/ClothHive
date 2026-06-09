import { useEffect, useState } from 'react'
import registerImg from "../assets/register.webp"
import { registerUser } from "../redux/slices/authSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { mergeCart } from "../redux/slices/cartSlice.js"



const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId, loading } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart)



    // Get redirect parameter and check if it's checkout or something
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");




    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user })).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/")
                })
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : "/")
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch])



    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("User rGistered:",{name, email, password})
        dispatch(registerUser({ name, email, password }))
    }

    return (
        <div className='flex h-[95vh]'>


            {/* left side - for signup form */}
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 '>


                <form
                    onSubmit={handleSubmit}
                    className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>


                    <div className='flex justify-center  text-center mb-6'>
                        <h2 className='text-xl font-medium'>ClothHive</h2>
                    </div>


                    <h2 className='text-2xl font-bold text-center mb-6'>Join Us!!👋🏼</h2>


                    <p className='text-center mb-6 text-cornflower-blue-500'> Create Your Account Seamlessly  </p>


                    <div className='mt-4'>
                        <label className='block text-sm font-semibold mb-2 md:text-lg'>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full p-2 border rounded text-sm md:text-lg'
                            placeholder='Enter your name'
                            required
                        />
                    </div>

                    <div className='mt-4'>
                        <label className='block text-sm font-semibold mb-2 md:text-lg'>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border rounded text-sm md:text-lg'
                            placeholder='Enter your email address'
                            required
                        />
                    </div>


                    <div className='mt-4'>
                        <label className='block text-sm font-semibold mb-2 md:text-lg'>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border rounded text-sm md:text-lg'
                            placeholder='Enter your password'
                            required
                        />
                    </div>


                    <button
                        type="submit"
                        className='mt-6 w-full bg-blue-700 text-white p-2 rounded-lg font-bold hover:bg-topbar transition md:text-lg text-sm'>
                        {loading ? "Creating an account..." : "Sign Up"}
                    </button>


                    <p className='mt-6 text-center text-sm '>
                        Already have an account?{" "}
                        <Link
                            to={`/login?redirect=${encodeURIComponent(redirect)}`}
                            className="text-topbar hover:text-cornflower-blue-700 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>



            {/* Right side */}
            <div className='hidden md:block w-1/2  bg-cornflower-blue-200'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={registerImg}
                        alt="Login-side-Image"
                        className='h-full ' />
                </div>
            </div>
        </div>
    )
}

export default Register
