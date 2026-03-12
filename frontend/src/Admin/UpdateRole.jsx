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
    <PageTitle title='Udate Role'/>
    <div className='page-wrapper'>
      <div className="update-user-role-container">
        <h1>UPdate User Role</h1>
        <form  className="update-user-role-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input value={name} id='name' type="text" name='name' required readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input value={email} id='email' type="text" name='email' required readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="role">Role</label>
                <select value={role} onChange={handleChange} name='role' id='role' required> 
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>
            <button className="btn btn-primary">Update Role</button>
        </form>
      </div>
    </div>
    </>)}
    </>
  )
}

export default UpdateRole
