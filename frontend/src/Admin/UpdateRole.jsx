import React, { useEffect, useState } from 'react'
import '../AdminStyles/UpdateRole.css'
import Navbar from '../componant/Navbar'
import PageTitle from '../componant/PageTitle'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, getSingleUser, removeError, removeSuccess, updateUserRole } from '../feature/admin/adminSlice'
import { toast } from 'react-toastify'
import Loader from '../componant/Loader'

function UpdateRole() {
  const { id } = useParams()
    const {user, loading,error, success, message} =useSelector(state=>state.admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
      if (id) {
        dispatch(getSingleUser(id))
      }
    },[dispatch, id])

    useEffect(()=>{
        if(user){
            setFormData({
                name: user.name || "",
                email: user.email || "",
                role: user.role || "",
            })
        }
    }, [user])
    const [formData, setFormData]=useState({
        name: "",
        email: "",
        role: ""
    })
    const {name,email,role}= formData

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
      dispatch(updateUserRole({userId: id, role}))
    }
  
     useEffect(() => {
        if (error) {
          toast.error(message , {
            position: "top-right",
            autoClose: 2000,
          });
      
          dispatch(removeError());
        }
        if (success) {
          toast.success("User Profile Updated Successfully", {
            position: "top-right",
            autoClose: 2000,
          });
          dispatch(removeSuccess());
          dispatch(clearMessage());
          navigate('/admin/users')
        }
      }, [error, dispatch, success, message]); 
      return (
<>
   {loading?(<Loader />): (<>
    <Navbar />
    <PageTitle title='Update Role'/>

    <div className="mt-15 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-12 flex items-start justify-center">
      <div className="w-full max-w-md flex flex-col gap-6 mt-4">

        {/* Heading */}
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 rounded-full bg-amber-400" />
          <h1 className="text-2xl font-bold text-white tracking-tight">Update User Role</h1>
        </div>

        {/* Card */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">User Details</p>
          </div>

          <form className="px-6 py-6 flex flex-col gap-5" onSubmit={handleSubmit}>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-400">Name</label>
              <input
                value={name} id="name" type="text" name="name"
                required readOnly
                className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-400 outline-none cursor-not-allowed opacity-70"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</label>
              <input
                value={email} id="email" type="text" name="email"
                required readOnly
                className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-400 outline-none cursor-not-allowed opacity-70"
              />
            </div>

            {/* Role */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="role" className="text-xs font-bold uppercase tracking-widest text-slate-400">Role</label>
              <select
                value={role} onChange={handleChange} name="role" id="role" required
                className="bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all duration-200 cursor-pointer"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-700/50" />

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 bg-amber-400 hover:bg-amber-300 text-slate-900 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 active:scale-[0.98]"
            >
              Update Role
            </button>

          </form>
        </div>
      </div>
    </div>
    </>)}
    </>
  )
}

export default UpdateRole
