import React, { useEffect } from 'react'
import PageTitle from '../componant/PageTitle'
import Footer from '../componant/Footer'
import { AddBox, AttachMoney, CheckCircle, CurrencyRupee, Dashboard as DashboardIcon, Error, Instagram, Inventory, LinkedIn, People, Reviews, ShoppingCart, Star, YouTube   } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders, fetchAllProducts } from '../feature/admin/adminSlice'

export default function Dashboard() {
  const {orders = [], products = [], totalAmount = 0}= useSelector(state=>state.admin)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchAllProducts())
        dispatch(fetchAllOrders())
    }, [dispatch])

    const totalProducts = products.length;
    const totalOrders = orders.length;
    const confirmedOrders = orders.filter((order) => !order.isCancelled);
    const cancelledOrders = orders.filter((order) => order.isCancelled);
    const confirmedOrderCount = confirmedOrders.length;
    const cancelledOrderCount = cancelledOrders.length;
    const cancelledOrderAmount = cancelledOrders.reduce((total, order) => total + Number(order.totalPrice || 0), 0);
    const outOfStock = products.filter((product) => Number(product?.stock) <= 0).length;
    const inStock = products.filter((product) => Number(product?.stock) > 0).length;
    const totalReview = products.reduce((acc, product) => acc + (product.Reviews?.length || 0), 0)
  return (
  <>
    <PageTitle title='Admin Dashboard'/>

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">

      {/* ── Sidebar ── */}
      <aside className="w-60 shrink-0 bg-slate-900/80 border-r border-slate-700/50 flex flex-col min-h-screen">

        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-slate-700/50">
          <DashboardIcon className="text-amber-500" style={{fontSize: 22}} />
          <span className="text-white font-bold text-sm tracking-widest uppercase">Admin Dashboard</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-6 px-4 py-6 flex-1">

          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 px-2 mb-1">Products</p>
            <Link to='/admin/products' className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-amber-500 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all duration-200">
              <Inventory style={{fontSize: 16}} /> All Products
            </Link>
            <Link to='/admin/product/create' className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-amber-500 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all duration-200">
              <AddBox style={{fontSize: 16}} /> Create Products
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 px-2 mb-1">Users</p>
            <Link to='/admin/users' className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-amber-500 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all duration-200">
              <People style={{fontSize: 16}} /> All Users
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 px-2 mb-1">Orders</p>
            <Link to='/admin/orders' className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-amber-500 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all duration-200">
              <Inventory style={{fontSize: 16}} /> All Orders
            </Link>
            <Link to='/admin/orders/confirmed' className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-emerald-400 hover:bg-emerald-400/10 border border-transparent hover:border-emerald-400/20 transition-all duration-200">
              <CheckCircle style={{fontSize: 16}} /> Confirmed Orders
            </Link>
            <Link to='/admin/orders/cancelled' className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition-all duration-200">
              <Error style={{fontSize: 16}} /> Cancelled Orders
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 px-2 mb-1">Reviews</p>
            <Link to='/admin/reviews' className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-amber-500 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all duration-200">
              <Star style={{fontSize: 16}} /> All Reviews
            </Link>
          </div>

        </nav>
      </aside>

      {/* ── Main Content ── */}
      <div className=" flex-1 px-6 pt-6 pb-12 flex flex-col gap-8 overflow-auto">

        {/* Stats Grid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full bg-amber-500" />
            <h2 className="text-base font-bold text-white tracking-tight">Overview</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 flex flex-col gap-2">
              <Inventory className="text-amber-500" style={{fontSize: 22}} />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Products</p>
              <p className="text-2xl font-extrabold text-white">{totalProducts}</p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 flex flex-col gap-2">
              <ShoppingCart className="text-amber-500" style={{fontSize: 22}} />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Orders</p>
              <p className="text-2xl font-extrabold text-white">{totalOrders}</p>
            </div>

            <div className="bg-slate-800/60 border border-emerald-500/20 rounded-2xl p-5 flex flex-col gap-2">
              <CheckCircle className="text-emerald-400" style={{fontSize: 22}} />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Confirmed Orders</p>
              <p className="text-2xl font-extrabold text-white">{confirmedOrderCount}</p>
            </div>

            <div className="bg-slate-800/60 border border-red-500/20 rounded-2xl p-5 flex flex-col gap-2">
              <Error className="text-red-400" style={{fontSize: 22}} />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Cancelled Orders</p>
              <p className="text-2xl font-extrabold text-white">{cancelledOrderCount}</p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 flex flex-col gap-2">
              <Star className="text-amber-500" style={{fontSize: 22}} />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Reviews</p>
              <p className="text-2xl font-extrabold text-white">{totalReview}</p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 flex flex-col gap-2">
              <CurrencyRupee className="text-amber-500" style={{fontSize: 22}} />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Revenue</p>
              <p className="text-2xl font-extrabold text-white">{totalAmount}</p>
            </div>

            <div className="bg-slate-800/60 border border-red-500/20 rounded-2xl p-5 flex flex-col gap-2">
              <CurrencyRupee className="text-red-400" style={{fontSize: 22}} />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Cancelled Amount</p>
              <p className="text-2xl font-extrabold text-white">{cancelledOrderAmount.toFixed(2)}</p>
            </div>

            <div className="bg-slate-800/60 border border-red-500/20 rounded-2xl p-5 flex flex-col gap-2">
              <Error className="text-red-400" style={{fontSize: 22}} />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Out of Stock</p>
              <p className="text-2xl font-extrabold text-white">{outOfStock}</p>
            </div>

            <div className="bg-slate-800/60 border border-emerald-500/20 rounded-2xl p-5 flex flex-col gap-2">
              <CheckCircle className="text-emerald-400" style={{fontSize: 22}} />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">In Stock</p>
              <p className="text-2xl font-extrabold text-white">{inStock}</p>
            </div>

          </div>
        </div>

        {/* Social Stats */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full bg-amber-500" />
            <h2 className="text-base font-bold text-white tracking-tight">Social</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-slate-800/60 border border-pink-500/20 rounded-2xl p-5 flex flex-col gap-2">
              <Instagram className="text-pink-400" style={{fontSize: 24}} />
              <p className="text-sm font-bold text-white">Instagram</p>
              <p className="text-xs text-slate-400">123K Followers</p>
              <p className="text-xs text-slate-400">12 Posts</p>
            </div>

            <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-5 flex flex-col gap-2">
              <LinkedIn className="text-blue-400" style={{fontSize: 24}} />
              <p className="text-sm font-bold text-white">LinkedIn</p>
              <p className="text-xs text-slate-400">123K Followers</p>
              <p className="text-xs text-slate-400">12 Posts</p>
            </div>

            <div className="bg-slate-800/60 border border-red-500/20 rounded-2xl p-5 flex flex-col gap-2">
              <YouTube className="text-red-400" style={{fontSize: 24}} />
              <p className="text-sm font-bold text-white">YouTube</p>
              <p className="text-xs text-slate-400">123K Followers</p>
              <p className="text-xs text-slate-400">100 Posts</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </>
  )
}
