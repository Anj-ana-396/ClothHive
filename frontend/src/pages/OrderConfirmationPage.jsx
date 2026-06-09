
import { useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {clearCart } from "../redux/slices/cartSlice.js"




const OrderConfirmationPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);



  // Clear the cart when the order is confirmed
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders")
    }
  },[checkout,dispatch, navigate])



  //to make order date
  const calculateEstimatedDelivery = ({ createdAt }) => {
    const orderDate = new Date(createdAt)
    orderDate.setDate(orderDate.getDate() + 10) // adding 10 days to the order date to make delivery date
    return orderDate.toLocaleDateString()
  }


  return (

    <div className="bg-amber-50 flex flex-col justify-center items-center  px-8 pb-20 pt-12 ">

      <h1 className="md:text-5xl text-3xl font-bold text-center text-amber-500  mb-8">
        Thank You for Your Order!
      </h1>


      {checkout && (
        <div className=" bg-white w-full  md:w-[85%] lg:w-[60%] md:px-12 md:py-8 p-6 rounded-lg drop-shadow-xl/50 border-t-amber-400 border-t-4 ">



          {/* Order ID, order date, Estimated delivery date */}
          <div className="flex flex-col  md:justify-between md:flex-row mb-6 ">
            {/* Order Id and Date */}
            <div>
              <h2 className="md:text-xl text-sm font-semibold">
                Order ID: {checkout._id}
              </h2 >
              <p className="text-gray-600 md:text-sm text-xs font-semibold">
                Order date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Estimated Delivery */}
            <div >
              <p className="text-amber-500 md:text-sm text-xs font-semibold">
                Estimated Delivery: {calculateEstimatedDelivery(checkout)}
              </p>
            </div>
          </div>



          {/* Ordered Items */}
          <div className="mb-4 border-y-gray-300 border-y-2 py-5">
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-18 h-18 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="md:text-lg text-sm font-semibold">{item.name}</h4>
                  <p className="md:text-sm text-xs text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="md:text-lg text-sm">${item.price}</p>
                  <p className="md:text-sm text-xs text-gray-500">Qty: {item.quantity} </p>
                </div>
              </div>
            ))}
          </div>




          {/* Payment and Delivery Info */}
          <div className="grid grid-cols-2 gap-2">

            {/* Payment Info */}
            <div className="border-r-2 border-r-gray-300 mr-4">
              <h4 className="md:text-lg text-sm font-bold ">Payment</h4>
              <p className="text-topbar md:text-sm text-xs">PayPal</p>
            </div>

            {/* Delivery Info */}
            <div>

              <div className="flex justify-start items-center">
                <span>
                  <IoLocation className="md:size-7 size-5 text-amber-500" />
                </span>
                <h4 className="ml-0.75 md:text-xl text-base font-bold text-amber-500 ">Delivery</h4>
              </div>

              <p className="text-gray-600 md:text-sm text-xs mx-1">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600 md:text-sm text-xs mx-1">
                {checkout.shippingAddress.city} , {" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>



        </div>
      )}




    </div>
  )
}

export default OrderConfirmationPage
