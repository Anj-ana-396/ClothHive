import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { fetchUserOrders } from "../redux/slices/orderSlice.js"
import { useDispatch, useSelector } from "react-redux"



const MyOrdersPage = () => {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orders, loading, error } = useSelector((state) => state.orders)




  useEffect(() => {
    dispatch(fetchUserOrders())
  }, [dispatch])






  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`)
  }


  if (loading) return <p>Loading... </p>
  if (error) return <p>Error: {error} </p>

  
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm: rounded-lg overflow-hidden">


        <table className="min-w-full text-left text-gray-500">

          <thead className="bg-gray-100 text-xs uppercase text-gray-700 ">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>


          <tbody>
            {/* there is ternary operator...(condition)?"true":?false */}
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className='border-b hover:bg-gray-100 cursor-pointer text-gray-300 '>

                  <td>
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className='size-20 sm:size-34 object-cover  p-2.5 rounded-3xl' />
                  </td>


                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-topbar whitespace-nowrap">
                    #{order._id}
                  </td>


                  <td className="py-2 px-2 sm:py-4 sm:px-4  text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                    <br />
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>


                  <td className="py-2 px-2 sm:py-4 sm:px-4  text-gray-500">
                    {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>

                  <td className="py-2 px-2 sm:py-4 sm:px-4  text-gray-500">
                    {order.orderItems.length}
                  </td>

                  <td className="py-2 px-2 sm:py-4 sm:px-4  text-gray-500">
                    ${order.totalPrice}
                  </td>

                  <td className={`py-2 px-2 sm:py-4 sm:px-4 ${order.isPaid ? "text-green-600" : "text-rose-700"} `}>
                    {order.isPaid ? "Paid" : "Pending"}
                  </td>
                </tr>


                // below double dot colon is due to ternary operator used avove
              ))) : (
              <tr>
                <td
                  colSpan={7}
                  className='p-4 text-center text-gray-500'>
                  You haven't ordered anything yet.
                </td>
              </tr>
            )}
          </tbody>


        </table>


      </div>
    </div>
  )
}

export default MyOrdersPage
