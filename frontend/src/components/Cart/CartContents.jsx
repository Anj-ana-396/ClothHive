import React from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { updateCartItemQuantity } from "../../redux/slices/cartSlice.js"
import {removeFromCart} from "../../redux/slices/cartSlice.js"



const CartContents = ({cart, userId, guestId}) => {

    const dispatch = useDispatch()





    const handleAddToCart = (productId, delta, quantity, size, color) => {
        const newQuantity = quantity + delta 
        if (newQuantity >= 1) {
            dispatch(
                updateCartItemQuantity({
                    productId,
                    quantity: newQuantity,
                    guestId,
                    userId,
                    size,
                    color,
                })
            )
        }
    }


    //remove entire item form cart
    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(removeFromCart({ productId, guestId, userId, size, color }))
    }



    return (
        <div>
            {
                cart.products.map((product, index) => {
                    return (
                        <div key={index} className='flex items-start justify-between p-2 border-b'>


                            <div className='flex items-start'>
                                <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-2 rounded' />
                                <div>


                                    <h3 className='mr-2 text-sm'>{product.name}</h3>


                                    <p className='text-sm text-gray-500 '>
                                        size: {product.size} | color:{product.color}
                                    </p>

                                    {/* Increment decerement button */}
                                    <div className='flex items-center mt-2 text-sm'>
                                        <button
                                            onClick={() => handleAddToCart(
                                                product.productId,
                                                -1,
                                                product.quantity,
                                                product.size,
                                                product.color,
                                            )}
                                            className='border rounded px-1.5 py-1  font-medium'>
                                            -
                                        </button>
                                        <span className='mx-2'>{product.quantity}</span>
                                        <button
                                            onClick={() => handleAddToCart(
                                                product.productId,
                                                1,
                                                product.quantity,
                                                product.size,
                                                product.color,
                                            )}
                                            className='border rounded py-1 px-1.5 font-medium outline-none'>
                                            +
                                        </button>
                                    </div>
                                </div>

                            </div>

                            <div className='flex flex-row  rounded px-1 text-sm'>
                                <p> ${product.price.toLocaleString()}</p>
                                <button
                                    onClick={() => handleRemoveFromCart(
                                        product.productId,
                                        product.size,
                                        product.color)}>
                                    <MdDelete className='md:size-5.5 size-4 mx-3 text-red-700' />
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CartContents

