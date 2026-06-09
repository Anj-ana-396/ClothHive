import React from 'react'
import heroImg from "../../assets/hero_img_01.png"
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='md:h-full   h-[45vh] flex flex-row justify-evenly items-center p-2 bg-cornflower-blue-100 '>
      {/* left side */}
      <div className='w-1/3 sm:w-1/2  flex items-center justify-center p-2 m-6'>
        <div className='text-center text-indigo-950 p-4'>
          <h1 className='text-3xl md:text-8xl font-bold tracking-tighter uppercase mb-3'>
            Vacation <br />
            Ready
          </h1>
          <p className='text-sm tracking-tighter md:text-2xl mb-3  text-cornflower-blue-500'>
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <button className='bg-cornflower-blue-500 text-white  font-semibold px-4 py-2 rounded-sm text-sm hover:bg-cornflower-blue-900'>
            <Link to="collections/all">
              Shop Now
            </Link>
          </button>
        </div>
      </div>



      {/* right side */}
      <div className='w-2/3 sm:w-1/2 items-center flex justify-end mx-4'>
        <img src={heroImg} alt="hero-image" className='h-full w-full ' />
      </div>
    </section>
  )
}

export default Hero
