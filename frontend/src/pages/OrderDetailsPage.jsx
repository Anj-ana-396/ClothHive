import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { fetchOrderDetails } from "../redux/slices/orderSlice.js"
import { useDispatch, useSelector } from "react-redux"


const OrderDetailsPage = () => {


  const { id } = useParams()
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id))
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error} </p>


  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold my-6 text-amber-500 text-center">Order Details</h2>
      {!orderDetails ? (
        <p>No Order details found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          {/* Order Info */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{orderDetails._id}
              </h3>
              <p>
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* paid or pending green/red icon */}
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 ">
              <span className={`${orderDetails.isPaid
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>


              {/* delivered or not delivered green/yellow icon */}
              <span className={`${orderDetails.isDelivered
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-600"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                {orderDetails.isPaid ? "Delivered" : "Not Delivered"}
              </span>
            </div>
          </div>



          {/* Customer,Payment,shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold mb-1">Payment Info</h4>
              <p className="text-sm font-medium text-gray-500">Payment Method: {orderDetails.paymentMethod}</p>
              <p className="text-sm font-medium text-gray-400">Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-1">Shipping Info</h4>
              <p className="text-sm font-medium text-gray-500">
                Address:
                <br />
                {`${orderDetails.shippingAddress.address} , 
                ${orderDetails.shippingAddress.city}, 
                ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>


          {/* Product List */}
          <div className="overflow-x-auto text-center ">
            <h4 className="text-5xl font-semibold mb-4 text-gray-300">Products</h4>
            <table className="min-w-full  text-gray-600 mb-4 ">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 ">Name</th>
                  <th className="py-2 px-4">Unit Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>

              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b">
                    <td className="py-2 px-4 flex items-center ">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="md:size-24 size-14 object-cover rounded-lg mr-4"
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-cornflower-blue-500 hover:underline hover:text-topbar "
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4">${item.price}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">${item.price * item.quantity}</td>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link to="/my-orders" className="text-topbar hover:underline hover:text-cornflower-blue-600">
            Back to My orders
          </Link>
        </div>
      )}
    </div>
  )
}

export default OrderDetailsPage
