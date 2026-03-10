import React from 'react'
import '../AdminStyles/Dashboard.css'
import Navbar from '../componant/Navbar'
import PageTitle from '../componant/PageTitle'
import Footer from '../componant/Footer'
import { AddBox, Dashboard as DashboardIcon, Inventory   } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function Dashboard() {
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
                <h3>Products</h3>
                <Link to='admin/products'><Inventory className='nav-icon'/>All Products</Link>
                <Link to='admin/product/create'><AddBox className='nav-icon'/>Create Products</Link>
            </nav>
            {/* user */}
            <nav className="nav-menu">
                <h3>User</h3>
                <Link to='admin/users'><Inventory className='nav-icon'/>All User </Link>
            </nav>
            <nav className="nav-menu">
                <h3>User</h3>
                <Link to='admin/orders'><Inventory className='nav-icon'/>All Orders </Link>
            </nav>
        </div>
     
    </div>
    </>
  )
}
