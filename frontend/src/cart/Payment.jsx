import React from 'react'
import '../CartStyles/Payment.css'
import PageTitle from '../componant/PageTitle'
import Navbar from '../componant/Navbar'
import Footer from '../componant/Footer'
import CheckoutPath from './CheckoutPath'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../utils/axiosConfig'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Payment() {
    const OrderItem = JSON.parse(sessionStorage.getItem('orderItem'))
    const {user} = useSelector(state=>state.user)
    const {shippingInfo} = useSelector(state=>state.cart)
    const navigate = useNavigate();

    const compltePayment=async(amount)=>{
      try {
        const finalAmount = Number(amount)
        if (!Number.isFinite(finalAmount) || finalAmount <= 0) {
          toast.error('Invalid payment amount', { position: 'top-right', autoClose: 3000 });
          return
        }

        const {data: keyData} = await axios.get('/api/v1/getKey')
        const {key }= keyData;
        const {data:orderData} = await axios.post('/api/v1/payment/process', { amount: finalAmount })
        const {order } = orderData
        const options = {
          key, // Replace with your Razorpay key_id
          amount: order.amount, // Amount is in currency subunits.
          currency: 'INR',
          name: "TremdAura",
          description: 'E-commerce',
          order_id: order.id, // This is the order_id created in the backend
          // callback_url: '/api/v1/paymentVerification', // Your success URL
          handler: async function (response) {
            try {
              const {data} = await axios.post('/api/v1/paymentVerification',{
                razorpay_payment_id : response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature : response.razorpay_signature
              })
              if(data.success){
                navigate(`/paymentSuccess?reference=${data.reference}`)
              }else{
                toast.error("Payment verification failed", { position: 'top-right', autoClose: 4000 });
              }
            } catch (error) {
              toast.error("Payment verification error", { position: 'top-right', autoClose: 4000 });
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: shippingInfo.phoneNumber
          },
          theme: {
            color: '#3399C'
          },
        };

        const rzp = new Razorpay(options);
        rzp.open();
      } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message || 'Payment failed';
        console.error(errorMessage);
        toast.error(errorMessage, { position: 'top-right', autoClose: 4000 });
      }
    }
    
  return (
    <>
    <PageTitle title="Payment Processing"/>
    <Navbar />
    <CheckoutPath activePath={2}/> 
    <div className='payment-container'>
        <Link to='/order/confirm' className='payment-go-back'>Go Back</Link>
        <button className='payment-btn' onClick={()=>compltePayment(OrderItem?.total)}>Pay ({OrderItem?.total})</button>
    </div>
    <Footer />
    </>
  )
}

export default Payment
