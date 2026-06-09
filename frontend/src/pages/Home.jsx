import Hero from "../components/Layout/Hero.jsx"
import GenderCollectionSection from '../components/Products/GenderCollectionSection.jsx'
import NewArrivals from '../components/Products/NewArrivals.jsx'
import ProductDetails from '../components/Products/ProductDetails.jsx'
import ProductGrid from "../components/Products/ProductGrid.jsx"
import FeaturedCollection from '../components/Products/FeaturedCollection.jsx'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {fetchProductsByFilters} from "../redux/slices/productsSlice.js"
import axios from "axios"



const Home = () => {

  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)
  const [bestSellerProduct, setBestSellerProduct] = useState(null)



  useEffect(() => {

    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      }))

    //fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBestSeller()

  }, [dispatch])




  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />



      {/* Best Seller */}
      <h2 className="text-6xl text-center font-bold mb-6 mt-30 mx-8 text-gray-500">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center"> Loading Best Seller Product ...</p>
      )}




      <div className="container mx-auto mb-30 ">
        <h2 className="text-6xl text-center font-bold mb-6 mt-30 px-8 text-gray-300 ">
          Top Wears for Women
        </h2>
        <div className="mx-4 md:mx-30 my-10 border-2 rounded-3xl md:px-10 px-4 py-4 border-gray-300">
        <ProductGrid  products={products} loading={loading} error={error} />
        </div>
      </div>




      <FeaturedCollection />


      {/* <FeaturesSection/> */}
    </div>
  )
}

export default Home
