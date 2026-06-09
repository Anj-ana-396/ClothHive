import {Link} from "react-router-dom"
import featuredImg from "../../assets/featured-image-Home.jpg"

const FeaturedCollection = () => {
  return (
     <section className=" flex justify-center items-center lg:my-16 lg:mx-10 m-10">
    
     <div className='w-full  flex lg:flex-row flex-col-reverse justify-evenly items-center  bg-teal-100  rounded-2xl '>
     

      {/* left side */}
      <div className=' w-1/2 flex items-center justify-center p-3 '>
        <div className='text-center text-teal-600 p-2'>
          <h1 className='text-2xl  lg:text-5xl font-bold tracking-tighter uppercase mb-3 lg:mb-8'>
           Dress like you mean everyday
          </h1>
          <p className='text-sm md:text-xl tracking-tighter  mb-3 lg:mb-8  text-slate-600'>
          Style that moves with you. Comfort that stays with you. Discover a collection designed to keep you looking sharp and feeling unstoppable, every single day.
          </p>
          <button className='bg-teal-800 text-white  font-semibold px-4 py-2 rounded-sm text-sm md:text-xl hover:bg-cornflower-blue-600'>
            <Link to="collections/all">
              Shop Now
            </Link>
          </button>
        </div>
      </div>



      {/* right side */}
      <div className='lg:w-3/5  w-full overflow-hidden    items-center flex lg:justify-end  justify-center m-4 md:m-8 lg:m-0'>
        <img src={featuredImg} alt="featured-image" className=' h-[80%] w-[90%]  lg:w-full lg:h-225 rounded-xl ' />
      </div> 

      </div>
    </section>
  )
}

export default FeaturedCollection
