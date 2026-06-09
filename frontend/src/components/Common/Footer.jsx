import React from 'react'
import { FaMeta } from "react-icons/fa6";
import { FaInstagram, FaTwitter, FaPhoneAlt } from "react-icons/fa";


const Footer = () => {
    return (

        <footer className='border-t px-12 py-8'>



            <div className='container mx-auto grid   grid-cols-1   sm:grid-cols-2  md:grid-cols-4    gap-6 px-2 sm:gap-x-20  '>


                {/* newsletter */}
                <div>
                    <h3 className="text-2xl text-gray-800 mb-3  font-semibold">Newsletter</h3>
                    <p className=' mb-1 text-topbar text-sm '>
                        Tap in. Stay ahead. Experience new products, exclusive events, and online deals — before anyone else
                    </p>
                    <p className='text-sm font-semibold text-gray-600 mb-4 hover:text-gray-400'
                    > Sign up today and enjoy an exclusive 10% welcome reward!!!
                    </p>

                    {/* Newsletter form */}
                    <form className='flex mb-8 '>
                        <input type="email" placeholder='Enter your email' className='p-3 w-full text-sm border-y border-l border-gray-300 rounded-l-md  focus:ring-gray-500   transition-all required' />
                        <button
                            type="submit"
                            className='bg-topbar text-white px-6 py-3  text-sm rounded-r-md hover:bg-gray-800 transition-all hover:scale-105'>
                            Subscribe
                        </button>
                    </form>
                </div>




                {/* shop links */}
                <div>
                    <h3 className='text-xl font-semibold text-black mb-3'>Shop</h3>
                    <ul className='space-y-3 text-gray-600 text-sm cursor-pointer mb-8'>
                        <li
                            to="#"
                            className='hover:text-gray-400 transition-colors'>
                            Men's Top Wear
                        </li>
                        <li
                            to="#"
                            className='hover:text-gray-400 transition-colors'>
                            Women's Top Wear
                        </li>
                        <li
                            to="#"
                            className='hover:text-gray-400 transition-colors'>
                            Men's Bottom Wear
                        </li>
                        <li
                            to="#"
                            className='hover:text-gray-400 transition-colors'>
                            Women's Bottom Wear
                        </li>
                    </ul>
                </div>



                {/*Support links */}
                <div>
                    <h3 className='text-xl font-semibold text-black mb-3'>Support</h3>
                    <ul className='space-y-3 text-gray-600 text-sm cursor-pointer mb-8'>
                        <li
                            to="#"
                            className='hover:text-gray-400 transition-colors'>
                            Contact Us
                        </li>
                        <li
                            to="#"
                            className='hover:text-gray-400 transition-colors'>
                            About Us
                        </li>
                        <li
                            to="#"
                            className='hover:text-gray-400 transition-colors'>
                            FAQs
                        </li>
                        <li
                            to="#"
                            className='hover:text-gray-400 transition-colors'>
                            features
                        </li>
                    </ul>
                </div>



                {/*Follow us Links */}
                <div>

                    <h3 className='text-xl text-black mb-3 font-semibold '>Follow us</h3>


                    <div className='flex items-center space-x-3.5 mb-8'>
                        <a
                            href="https://www.facebook.com/"
                            target='_blank'
                            rel="noopener noreferrer" >
                            <FaMeta className='h-6 w-6 text-meta-icon hover:text-blue-300' />
                        </a>
                        <a
                            href="https://www.facebook.com/"
                            target='_blank'
                            rel="noopener noreferrer"  >
                            <FaInstagram className='h-6 w-6 text-insta-icon hover:text-pink-300' />
                        </a>
                        <a
                            href="https://www.facebook.com/"
                            target='_blank'
                            rel="noopener noreferrer">
                            <FaTwitter className='h-6 w-6 text-twitter-icon hover:text-blue-300' />
                        </a>
                    </div >


                    <p  >Call Us</p>
                    <p className='text-sm text-gray-600 mb-2'>
                        <FaPhoneAlt className='h-4 w-5 inline-block mr-2 ' />
                        0123-456-789
                    </p>


                </div>


            </div>



            {/* copyright */}
            <div className='container mx-auto mt-10 px-4 lg:px-0 border-t border-gray-200 pt-4'>
                <p className='text-gray-500 text-sm tracking-lighter text-center'>
                  &copy; 2026, Anjana. All Rights Reserved
                </p>
            </div>

        </footer>
    )
}

export default Footer
