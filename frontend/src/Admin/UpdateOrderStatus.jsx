import React, { useEffect, useState } from 'react'
import "../AdminStyles/UpdateOrder.css";
import Navbar from '../componant/Navbar';
import PageTitle from '../componant/PageTitle';
import Footer from '../componant/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetails, removeError } from '../feature/order/orderSlice';
import { toast } from 'react-toastify';
import Loader from '../componant/Loader';
import { removeSuccess, updateOrderStatus } from '../feature/admin/adminSlice';
function UpdateOrderStatus() {
    const [status, setStatus]=useState('')
    const {order, loading:orderLoading, error}= useSelector(state=>state.order)
    const {success, loading:adminLoading, error:adminError, message}= useSelector(state=>state.admin)
    const dispatch = useDispatch()
    const {orderId}=useParams()
    const cleanOrderId = orderId?.replace(/[{}]/g, '').trim()
    const loading = orderLoading || adminLoading

    useEffect(()=>{
        if(cleanOrderId){
            dispatch(getOrderDetails(cleanOrderId))
        }
    },[dispatch,cleanOrderId])

    useEffect(() => {
        if (error) {
            toast.error(error?.message || error, {
                position: 'top-right',
                autoClose: 2500,
            })
            dispatch(removeError())
        }
    }, [error, dispatch])

    const shippingInfo = order?.shipingInfo || order?.shippingInfo || {}
    const orderItems = order?.orderItem || order?.orderItems || []

    const {
        paymentInfo = {},
        orderStatus,
        totalPrice,
        paidAt
    } = order

    const normalizedPaymentStatus = paymentInfo?.status?.toString().trim().toLowerCase()
    const isPaid =
        ['succeeded', 'success', 'paid', 'captured', 'completed', 'succed'].includes(normalizedPaymentStatus) ||
        Boolean(paymentInfo?.id) ||
        Boolean(paidAt)
    const paymentStatus = isPaid ? 'Paid' : 'Not Paid'

    useEffect(() => {
        if (orderStatus) {
            setStatus(orderStatus)
        }
    }, [orderStatus])
    
    const handleStatusUpdate = ()=>{
        if(!status){
            toast.error("please select a status", {position:"top-right", autoClose:2000})
            return;
        }
                dispatch(updateOrderStatus({orderId: cleanOrderId, status}))
    }

        useEffect(() => {
                if (adminError) {
                        toast.error(adminError?.message || adminError, {
                                position: 'top-right',
                                autoClose: 2500,
                        })
                }
        }, [adminError])

        useEffect(() => {
                if (success) {
                        toast.success(message || 'order status Updated Successfully', {
                                position: 'top-right',
                                autoClose: 2000,
                        })
                        dispatch(removeSuccess())
                        dispatch(getOrderDetails(cleanOrderId))
                }
        }, [success, message, dispatch, cleanOrderId])

    
  return (
    <>
   { loading ? (<Loader />):( <>
    <Navbar />
    <PageTitle title='Update Order Status' />

    <div className='order-container'> 
        <h1 className='order-title'> Updata Order</h1>
        <div className="order-details">
            <h2>Order Information</h2>
            <p><strong>Order Id :</strong>{cleanOrderId}</p>
            <p><strong>Shipping Address : </strong>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}</p>
            <p><strong>Phone :</strong>{shippingInfo.phoneNo}</p>
            <p><strong>Order Status : </strong>{orderStatus}</p>
            <p><strong>Payment Status :</strong>{paymentStatus}</p>
            <p><strong>Total Price : </strong>{totalPrice}</p>
        </div>

        <div className="order-items">
            <h2>Order Items</h2>
            <table className='order-table'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems.map((item)=>(
                        <tr key={item.product || item._id}>
                            <td>
                                <img  src={item.image} alt={item.name} className='order-product-image ' />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="order-status">
            <h2>Update Order Status</h2>
            <select disabled={loading || orderStatus === 'Delivered'} value={status} onChange={(e)=> setStatus(e.target.value)}  className='status-select'>
                <option value="">Select Status</option>
                <option value="Shipped">Shipped</option>
                <option value="On the way">On the way</option>
                <option value="Delivered">Delivered</option>
            </select>
            <button disabled={loading || orderStatus === 'Delivered'}  onClick={handleStatusUpdate} className="update-button">{loading ? 'Updating...': 'Update Status'}</button>
        </div>

      
    </div>

    <Footer />
    </>)}
    </>
  )
}

export default UpdateOrderStatus
