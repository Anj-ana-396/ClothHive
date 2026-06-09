import { Link } from "react-router-dom"



const ProductGrid = ({ products , loading, error}) => {

    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error: {error}</p>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
                <Link 
                key={index} 
                to={`/product/${product._id}`} 
                className="block">
                    <div className=" bg-gray-100 p-3 rounded-lg hover:scale-103  hover:bg-cornflower-blue-200 transition-all duration-300 m-3.5">
                        <div className="w-full h-96 mb-1 ">
                            <img
                                src={product.images[0].url}
                                alt={product.images[0].alText || product.name}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>

                        <h3 className='text-lg font-semibold text-gray-700 '>{product.name}</h3>
                       
                        <p className='text-topbar font-medium text-sm tracking-tighter'>${product.price}</p>
                   
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProductGrid
