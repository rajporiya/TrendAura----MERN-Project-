import React from 'react'
import '../CartStyles/Payment.css'
import PageTitle from '../componant/PageTitle'
import Navbar from '../componant/Navbar'
import Footer from '../componant/Footer'
import CheckoutPath from './CheckoutPath'
import { Link } from 'react-router-dom'

function Payment() {
    const OrderItem = JSON.parse(sessionStorage.getItem('orderItem'))
    console.log(OrderItem);
    
  return (
    <>
    <PageTitle title="Payment Processing"/>
    <Navbar />
    <CheckoutPath activePath={2}/> 
    <div className='payment-container'>
        <Link to='/order/confirm' className='payment-go-back'>Go Back</Link>
        <button className='payment-btn'>Pay ({OrderItem.total})</button>
    </div>
    <Footer />
    </>
  )
}

export default Payment
