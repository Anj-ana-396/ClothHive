import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from "../components/Products/SortOptions"
import ProductGrid from "../components/Products/ProductGrid"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchProductsByFilters } from "../redux/slices/productsSlice.js"


const CollectionsPage = () => {

  const { collection } = useParams()
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)
  const queryParams = Object.fromEntries([...searchParams])



  const sidebarRef = useRef(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)



  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }))
  }, [dispatch, collection, searchParams])





  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }




  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)//addeventlistner while mounting
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)//remove the previous event lsitener while un mount
    }
  }, [])





  return (
    <div
      className='flex flex-col lg:flex-row'>


      {/* Mobile Filter Icon */}
      <button
        onClick={toggleSidebar}
        className='lg:hidden border-b-2 text-gray-600 bg-gray-300 p-2 flex justify-center items-center text-lg font-semibold'>
        <FaFilter className=' size-5 mr-2' />
        {" "}Filter
      </button>



      {/* Filter Sidebar - for mobile devices */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50  overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 bg-gray-100 w-1/2 sm:w-1/5`}>
        <FilterSidebar />
      </div>



      <div className='grow p-4'>

        {/* Sort options */}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />

      </div>


    </div>
  )
}

export default CollectionsPage
