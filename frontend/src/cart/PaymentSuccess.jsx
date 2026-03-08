import React from 'react'
import '../CartStyles/PaymentSuccess.css'
import { Link, useSearchParams } from 'react-router-dom'

function PaymentSuccess() {
    const [serchparams] = useSearchParams();
    const reference  = serchparams.get("reference")
  return (
    <div className='payment-success-container'>
      <div className="success-icon">
        <div className="checkmark"></div>
      </div>
      <h1>Order Confirmation</h1>
      <p>Your Payment was successfull. referemce ID :<strong>{reference}</strong> </p>
      <Link to='/products' className='explore-btn'>Explore More Product</Link>
    </div>
  )
}

export default PaymentSuccess
