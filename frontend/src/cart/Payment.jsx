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
          name: "TrendAura",
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

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-700/50 flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-amber-500" />
          <h2 className="text-lg font-bold text-white tracking-tight">Payment</h2>
        </div>

        {/* Body */}
        <div className="px-6 py-8 flex flex-col gap-4">

          {/* Total Amount Display */}
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-5 py-4 flex items-center justify-between">
            <span className="text-sm text-slate-400 font-medium">Amount to Pay</span>
            <span className="text-2xl font-extrabold text-amber-500">₹{OrderItem?.total}</span>
          </div>

          {/* Pay Button */}
          <button
            onClick={() => compltePayment(OrderItem?.total)}
            className="w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 bg-amber-500 hover:bg-amber-300 text-slate-900 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98]"
          >
            Pay ₹{OrderItem?.total}
          </button>

          {/* Go Back Link */}
          <Link
            to="/order/confirm"
            className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase text-center border border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-all duration-200"
          >
            Go Back
          </Link>

        </div>
      </div>
    </div>

    <Footer />
    </>
  )
}

export default Payment
