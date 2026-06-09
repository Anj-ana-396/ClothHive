import mensCollectionImage from "../../assets/mens-collection-image-Home.jpg"
import womenCollectionImage from "../../assets/female-collection-image-Home.jpg"
import { Link } from 'react-router-dom'


const GenderCollectionSection = () => {
    return (
        <section className=' mt-6 py-10 px-4 '>
            <div className='container mx-auto flex flex-col md:flex-row gap-8'>


                {/* Women collection */}
                <div className='relative flex-1'>
                    <img src={womenCollectionImage}
                        alt="women-collection-left-image"
                        className='w-full sm:object-right  sm:h-[75vh] object-cover' />
                    <div className='absolute bottom-[20%] left-4   p-2 bg-cyan-100 sm:p-8 '>
                        <h2 className='text-lg sm:text-2xl   font-semibold text-gray-900 '>
                            Women's Collection
                        </h2>
                        <Link
                            to="/collections/all?gender=Women"
                            className=" text-sm sm:text-xl  text-cyan-600 hover:underline cursor-pointer hover:text-cornflower-blue-700">
                            Shop Now
                        </Link>
                    </div>
                </div>



                {/* Men collection */}
                <div className='relative flex-1'>
                    <img src={mensCollectionImage}
                        alt="men-collection-right-image"
                        className='w-full sm:object-left  sm:h-[75vh] object-cover' />
                    <div className='absolute bottom-[20%] right-4   p-2 bg-mist-200 sm:px-10 sm:py-8 '>
                        <h2 className='text-lg   sm:text-2xl   font-semibold text-gray-900 '>
                            Men's Collection
                        </h2>
                        <Link
                            to="/collections/all?gender=Men"
                            className=" text-sm sm:text-xl  text-cyan-600 hover:underline cursor-pointer hover:text-cornflower-blue-700">
                            Shop Now
                        </Link>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default GenderCollectionSection
