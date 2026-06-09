import React from 'react'
import { Link } from 'react-router-dom'
import notfoundImg from "../../assets/PageNotFound-img-01.png"

const NotFound404 = () => {
  return (
    
        <div className='flex flex-col justify-center items-center h-[50vh] md:h-[77vh] md:m-10  m-3'>
            <img 
            src={notfoundImg} 
            alt="404-Page not found" 
            className='md:size-[90%]  '/>
            <h2 className='md:text-7xl text-3xl font-bold mb-1.5 text-orange-600'>PAGE NOT FOUND </h2>
            <p className='text-orange-400 text-sm mb-3 text-center'>Try refining your search or click below home button to return to the main page</p>
            <button className='bg-cornflower-blue-600 text-white font-semibold text-lg px-3 py-1.5 rounded-2xl  hover:opacity-55 mb-10'>
                <Link to="/">
                HOME
                </Link>
            </button>
        </div>
      
 
  )
}

export default NotFound404
