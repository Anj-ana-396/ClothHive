import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner';
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../redux/slices/productsSlice.js";
import { fetchSimilarProducts } from "../../redux/slices/productsSlice.js";
import { addToCart} from "../../redux/slices/cartSlice.js";









const ProductDetails = ({ productId }) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products)
    const { user, guestId } = useSelector((state) => state.auth)



    const [mainImage, setMainImage] = useState("")
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)



    const productFetchId = productId || id




    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductDetails(productFetchId))
            dispatch(fetchSimilarProducts({ id: productFetchId }))
        }
    }, [dispatch, productFetchId])





    useEffect(() => {
       
        if (selectedProduct?.images?.length > 1) {
            setMainImage(selectedProduct.images[0].url)
        }
    }, [selectedProduct])



    // to increment or decrement quantity of products
    const handleQuantityChange = (myOperation) => {
        if (myOperation === "minus" && selectedQuantity > 1) { setSelectedQuantity(selectedQuantity => selectedQuantity - 1) }
        if (myOperation === "plus") { setSelectedQuantity(selectedQuantity => selectedQuantity + 1) }
    }



    const handleAddToCart = () => {
        if (!(selectedSize && selectedColor)) {
            toast.error(`Please select size and color before proceeding`, { duration: 1000, })
            return 
        }
        
        setIsButtonDisabled(true)
       
        dispatch(
            addToCart({
                productId: productFetchId,
                quantity: selectedQuantity,
                size: selectedSize,
                color: selectedColor,
                guestId,
                userId: user?._id,
            })
        ).then(() => {
            toast.success("Product added to cart!", {
                duration: 1000,
            })
        })
            .finally(() => {
                setIsButtonDisabled(false)
            })
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }





    return (
        <div className="flex justify-center items-center flex-col mb-10 ">

            {selectedProduct && (
                <>

                    {/* single product section */}
                    <div className="lg:w-[65vw] w-[86vw]  p-4 lg:p-10 mx-8 rounded-2xl flex lg:flex-row flex-col bg-gray-200 lg:mt-0 mt-5 ">

                        {/* left side with main image + thumbnails */}
                        <div className="lg:w-2/3 w-full mx-auto p-6 rounded-lg flex lg:flex-row flex-col  items-center justify-center lg:mr-6">

                            {/* Side image thumbnails for bigger devices */}
                            <div className=" lg:w-1/4 hidden lg:flex lg:flex-col space-y-3 mr-6 ">
                                {selectedProduct.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={image.altText || `Thumbnail ${index}`}
                                        className={`w-24 h-24 object-center rounded-lg cursor-pointer  ${mainImage === image.url ? " border-4 border-cornflower-blue-500" : "border-2 border-gray-600"}`}
                                        onClick={() => setMainImage(image.url)}
                                    />
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className=" w-full  ">
                                <div className="mb-4">
                                    <img
                                        src={mainImage}
                                        alt="Main_product"
                                        className="w-full h-full rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* Horizontal Thumnails for mobile devices */}
                            <div className=" lg:hidden flex  space-x-2 mx-3 mt-2">
                                {selectedProduct.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={image.altText || `Thumbnail ${index}`}
                                        className={`w-16 h-16 sm:size-24 object-center rounded-lg cursor-pointer  ${mainImage === image.url ? "border-4 border-cornflower-blue-500" : "border-2 border-gray-600"}`}
                                        onClick={() => setMainImage(image.url)}
                                    />
                                ))}
                            </div>
                        </div>





                        {/* Right Side description */}
                        <div className="lg:w-1/3  w-full mx-1  ">

                            <h1 className="text-4xl font-semibold mb-2"> {selectedProduct.name} </h1>

                            <p className="text-lg text-red-800  line-through">
                                {selectedProduct.originalPrice &&
                                    `$${selectedProduct.originalPrice}`}
                            </p>

                            <p className="text-lg text-cornflower-blue-600 mb-2"> ${selectedProduct.price}  </p>

                            <p className="text-lg text-gray-600 mb-2">  ${selectedProduct.description} </p>

                            <div className="mb-2">
                                <p>Color:</p>
                                <div className="flex gap-2 mt-2">
                                    {selectedProduct.colors.map((color) => (
                                        <button
                                            key={color}
                                            className={`w-8 h-8 rounded-full  ${selectedColor === color ? "border-3 border-cornflower-blue-100" : "border border-black"}`}
                                            onClick={() => setSelectedColor(color)}
                                            style={{
                                                backgroundColor: color.toLowerCase(),
                                                filter: "brightness(0.5)"
                                            }}>
                                        </button>
                                    ))}
                                </div>
                            </div>


                            <div className="mb-2">
                                <p className="text-gray-700 "> Size: </p>
                                <div className="flex gap-2 mt-2">
                                    {selectedProduct.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => { setSelectedSize(size) }}
                                            className={` text-sm px-3 py-1.5 rounded  ${selectedSize === size ? "bg-cornflower-blue-500 text-white" : "text-black bg-white"} `}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>



                            <div className="mb-6">
                                <p className="text-gray-700"> Quantity:</p>
                                <div className="flex items-center space-x-2 mt-2">

                                    <button
                                        onClick={() => handleQuantityChange("minus")}

                                        className="px-2 py-1 bg-gray-300 rounded text-lg">
                                        -
                                    </button>

                                    <span className="text-lg p-1">
                                        {selectedQuantity}
                                    </span>

                                    <button
                                        onClick={() => handleQuantityChange("plus")}
                                        className="px-2 py-1 bg-gray-300 rounded text-lg">
                                        +
                                    </button>

                                </div>
                            </div>

                            {/* adding toast Notification */}
                            <div>
                                <Toaster
                                    position="top-right" />
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isButtonDisabled}
                                    className={`bg-cornflower-blue-700 font-semibold text-white py-2 px-6 rounded sm:w-3/5 w-full mb-2 ${isButtonDisabled ? "cursor-not-allowed opacity-150" : "hover:bg-topbar"}`}>
                                    {isButtonDisabled ? "Adding..." : "ADD TO CART"}
                                </button>
                            </div>



                            <div className="mt-2 text-gray-700 ">
                                <h3 className="text-xl font-bold mb-1">
                                    Characteristics:
                                </h3>
                                <table className="w-3/5 border-collapse border  text-center text-sm text-cornflower-blue-600">
                                    <tbody>
                                        <tr>
                                            <td className="p-1 border">Brand</td>
                                            <td className="p-1 border">{selectedProduct.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-1 border">Material</td>
                                            <td className="p-1 border">{selectedProduct.material}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
  </>
            )}


                    {/* similar product or you may also like */}
                    <div className="mt-20">
                        <h2 className="font-bold text-5xl text-center mb-4 text-topbar">Similar Products</h2>
                        <ProductGrid products={similarProducts} loading={loading} error={error} />
                    </div>
              

        </div>
    );
};

export default ProductDetails;
