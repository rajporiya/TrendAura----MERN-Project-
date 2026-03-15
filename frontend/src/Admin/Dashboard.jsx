import React, { useEffect } from 'react'
import '../AdminStyles/Dashboard.css'
import Navbar from '../componant/Navbar'
import PageTitle from '../componant/PageTitle'
import Footer from '../componant/Footer'
import { AddBox, AttachMoney, CheckCircle, CurrencyRupee, Dashboard as DashboardIcon, Error, Instagram, Inventory, LinkedIn, People, Reviews, ShoppingCart, Star, YouTube   } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders, fetchAllProducts } from '../feature/admin/adminSlice'

export default function Dashboard() {
    const {orders, products, totalAmount}= useSelector(state=>state.admin)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchAllProducts())
        dispatch(fetchAllOrders())
    }, [dispatch])

    const totalProducts = products.length;
    const totalOrders = orders.length;
    const outOfStock = products.filter(product => product.stock === 0).length
    const inStock = products.filter(product => product.stock > 0).length;
    const totalReview = products.reduce((acc, product) => acc + (product.Reviews?.length || 0), 0)
  return (
    <>
    <Navbar />
    <PageTitle title='Admin Dashboard'/>
    <div className='dashboard-container'>
        <div className="sidebar">
            <div className="logo">
                <DashboardIcon className='logo-icon'/>
                ADmin Dashboard
            </div>
            <nav className="nav-menu">
                <div className='nav-section'>
                <h3>Products</h3>
                <Link to='/admin/products'><Inventory className='nav-icon'/>All Products</Link>
                <Link to='create'><AddBox className='nav-icon'/>Create Products</Link>
                </div>
                <div className='nav-section'>
                <h3>User</h3>
                <Link to='/admin/users'><People className='nav-icon'/>All Users</Link>
                </div>
                <div className='nav-section'>
                <h3>Orders</h3>
                <Link to='/admin/orders'><Inventory className='nav-icon'/>All Orders</Link>
                </div>
                <div className='nav-section'>
                <h3>Reviews</h3>
                <Link to='/admin/reviews'><Star className='nav-icon'/>All Reviews</Link>
                </div>
            </nav>
        </div>

        <div className="main-content">
            <div className="stats-grid">
                <div className="stat-box">
                    <Inventory className='icon'/>
                    <h3>Total Products</h3>
                    <p>{totalProducts}</p>
                </div>
                <div className="stat-box">
                    <ShoppingCart className='icon'/>
                    <h3>Total Orders</h3>
                    <p>{totalOrders}</p>
                </div>
                <div className="stat-box">
                    <Star className='icon'/>
                    <h3>Total Revies</h3>
                    <p>{totalReview}</p>
                </div>
                <div className="stat-box">
                    <CurrencyRupee className='icon'/>
                    <h3>Total Revenue</h3>
                    <p>{totalAmount}</p>
                </div>
                   <div className="stat-box">
                    <Error className='icon'/>
                    <h3>Out Of stock Revenue</h3>
                    <p>{outOfStock}</p>
                </div>
                <div className="stat-box">
                    <CheckCircle className='icon'/>
                    <h3>In  Of stock Revenue</h3>
                    <p>{inStock}</p>
                </div>
            </div>

            <div className="social-stats">
                <div className="social-box instagram">
                    <Instagram />
                    <h3>Instagram</h3>
                    <p>123K Followers</p>
                    <p>12 Posty</p>
                </div>
                <div className="social-box linkedin">
                    <LinkedIn />
                    <h3>Instagram</h3>
                    <p>123K Followers</p>
                    <p>12 Posty</p>
                </div>
                <div className="social-box youtube">
                    <YouTube />
                    <h3>Instagram</h3>
                    <p>123K Followers</p>
                    <p>100 Posty</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
