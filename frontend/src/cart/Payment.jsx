import React from 'react'
import '../CartStyles/Payment.css'
import PageTitle from '../componant/PageTitle'
import Navbar from '../componant/Navbar'
import Footer from '../componant/Footer'
import CheckoutPath from './CheckoutPath'
import { Link } from 'react-router-dom'
import axios from '../utils/axiosConfig.js'
import { useSelector } from 'react-redux'

function Payment() {
    const OrderItem = JSON.parse(sessionStorage.getItem('orderItem'))
  const storedUser = JSON.parse(localStorage.getItem('User') || 'null')
  const { user = {} } = useSelector((state) => state.user)
  const { shippingInfo = {} } = useSelector((state) => state.cart)
  const customerName = user?.name || storedUser?.name || 'Guest User'
  const customerEmail = user?.email || storedUser?.email || ''
  const customerPhone = shippingInfo?.phoneNumber || user?.phoneNumber || storedUser?.phoneNumber || ''

    const compltePayment=async(amount)=>{
      const {data: keyData} = await axios.get('/api/v1/getKey')
      const {key }= keyData;
      const {data:orderData} = await axios.post('/api/v1/payment/process', {amount})
      const {order } = orderData
      const options = {
        key, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits.
        currency: 'INR',
        name: "TremdAura",
        description: 'E-commerce',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: '/api/v1/paymentVerification', // Your success URL
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone
        },
        theme: {
          color: '#3399C'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    }
    
  return (
    <>
    <PageTitle title="Payment Processing"/>
    <Navbar />
    <CheckoutPath activePath={2}/> 
    <div className='payment-container'>
        <Link to='/order/confirm' className='payment-go-back'>Go Back</Link>
        <button className='payment-btn' onClick={()=>compltePayment(OrderItem.total)}>Pay ({OrderItem.total})</button>
    </div>
    <Footer />
    </>
  )
}

export default Payment
