import { useEffect, useState } from 'react'
import loginImg from "../assets/login.webp"
import { loginUser } from "../redux/slices/authSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { mergeCart } from "../redux/slices/cartSlice.js"




const Login = () => {
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
        // console.log("User login:",{ email, password})
        dispatch(loginUser({ email, password }))
    }



    return (
        <div className='flex h-[95vh]'>


            {/* Left side */}
            <div className='hidden md:block w-1/2  bg-cornflower-blue-200'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={loginImg}
                        alt="Login-side-Image"
                        className='h-full ' />
                </div>
            </div>






            {/* right side - for login form */}
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>


                <form
                    onSubmit={handleSubmit}
                    className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>


                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl font-medium'>ClothHive</h2>
                    </div>


                    <h2 className='text-2xl font-bold text-center mb-6'>Welcome Back!!👋🏼</h2>


                    <p className='text-center mb-6 text-cornflower-blue-500'> Provide login credentials to access account </p>


                    <div className='mt-4'>
                        <label className='block text-sm font-semibold mb-2 md:text-lg'>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border rounded text-sm md:text-lg'
                            placeholder='Enter your email address'
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
                        />
                    </div>


                    <button
                        type="submit"
                        className='mt-6 w-full bg-blue-700 text-white p-2 rounded-lg font-bold hover:bg-topbar transition md:text-lg text-sm'>
                        {loading ? "Loading..." : "Sign In"}
                    </button>


                    <p className='mt-6 text-center text-sm '>
                        Don't have an account?{" "}
                        <Link
                            to={`/register?redirect=${encodeURIComponent(redirect)}`}
                            className="text-topbar hover:text-cornflower-blue-700 hover:underline">
                            Register
                        </Link>
                    </p>
                </form>
            </div>




        </div>
    )
}

export default Login
