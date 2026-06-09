import { useEffect, useRef, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"
import axios from "axios"


const NewArrivals = () => {

    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(false)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)





    const [newArrivals, setNewArrivals] = useState([])


    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`)
                setNewArrivals(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchNewArrivals()
    },[])// empty array so that it gets callled on page load




    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeft(scrollRef.current.scrollLeft)
    }


    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    }


    const handleMouseUpOrLeave = (e) => {
        setIsDragging(false)
    }


    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300
        scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" })
    }

    //Update scroll buttons
    const updateScrollButtons = () => {
        const container = scrollRef.current
        if (container) {
            const leftScroll = container.scrollLeft
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth
            setCanScrollLeft(leftScroll > 0)
            setCanScrollRight(rightScrollable)
        }
        console.log({
            scrollLeft: container.scrollLeft, //number of pixels of which content of container is scrolled from left side
            clientWidth: container.clientWidth, // portion of conatiner visible to user during scrolll
            containerScrollWidth: container.scrollWidth, //total width of scrolllable content inside container
            offsetLeft: scrollRef.current.offsetLeft
        })
    }





    useEffect(() => {
        const container = scrollRef.current
        if (container) {
            container.addEventListener("scroll", updateScrollButtons)
            updateScrollButtons()
            return () => container.removeEventListener("scroll", updateScrollButtons)
        }
    }, [newArrivals])






    return (
        <section>
            <div className='container mx-auto text-center mt-16 px-6 flex flex-col'>

                <h2 className='text-5xl font-bold mb-2 '> Explore New Arrivals </h2>
                <p className='text-lg text-gray-600 '> Discover the latest styles traight off the runaway, freshly added to keep your wadrobe on the cutting edge of fashion    </p>


                {/* Horizontal Scroll Buttons */}
                <div className='flex space-x-1 mx-4 my-2 self-end'>
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`p-2  border-gray-400 border-2 rounded-xl  hover:scale-105   ${canScrollLeft ? "bg-white text-gray-400 cursor-pointer" : "bg-gray-200 cursor-not-allowed"}`}>
                        <IoIosArrowBack className='text-2xl' />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`p-2  border-gray-400 border-2 rounded-xl  hover:scale-105   ${canScrollRight ? "bg-white text-gray-400 cursor-pointer" : "bg-gray-200 cursor-not-allowed"}`}>
                        <IoIosArrowForward className='text-2xl' />
                    </button>
                </div>




                {/* Scrollable Content */}
                <div
                    ref={scrollRef}
                    className='container mx-auto overflow-x-scroll scroll-smooth  flex space-x-6 relative'
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave} >
                    {
                        newArrivals.map((product, index) => (
                            <div
                                key={product._id}
                                className='min-w-full sm:min-w-[50%] lg:min-w-[28%] relative '
                            >
                                <Link to={`/product/${product._id}`}>
                                    <img
                                        src={product.images[0]?.url}
                                        alt={product.images[0].altText || product.name}
                                        className='w-full object-cover rounded-lg h-[70vh]'
                                        draggable="false" />
                                    <div className='absolute bottom-0  w-full bg-opacity-50 backdrop-blur-md text-white  p-4 rounded-2xl'>
                                        <h3 className='font-medium text-2xl'>  {product.name} </h3>
                                        <p className='mt-1 text-xl'> ${product.price}  </p>

                                    </div>
                                </Link>
                            </div>))}
                </div>

            </div>
        </section>
    )
}

export default NewArrivals
