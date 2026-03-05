import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../componant/PageTitle'
import Navbar from '../componant/Navbar'
import Footer from '../componant/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeError, removeSuccess, updatePassword } from '../feature/user/userSlice'
import { toast } from 'react-toastify'

function UpdatePassword() {
    const [oldPassword, setOldPassword]=useState("")
    const [newPassword, setNewPassword]=useState("")
    const [confirmPassword, setConfirmPassword]=useState("")
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const {error, loading,success}=useSelector(state=>state.user);
    
    const updatePasswordSubmit=(e)=>{
        e.preventDefault()
        
        // Validate that new password and confirm password match
        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match", { position: "top-right", autoClose: 2000 });
            return;
        }
        const myForm = new FormData()
        myForm.set('oldPassword',oldPassword )
        myForm.set('newPassword',newPassword )
        myForm.set('confirmPassword',confirmPassword )
        console.log(myForm.entries() );
        dispatch(updatePassword(myForm))
    }
     // Error
      useEffect(() => {
        if (error) {
          toast.error(error, { position: "top-right", autoClose: 2000 });
          dispatch(removeError());
        }
      }, [error, dispatch]);
    
      // Suceess
      useEffect(() => {
        if (success) {
          toast.success("Password updated successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          dispatch(removeSuccess());
          navigate("/profile");
        }
      }, [success, dispatch]);
  return (
    <>
    <PageTitle title="Update Password"/>
    <Navbar />
    <div className="container update-container">
        <div className="form-content">
            <form className="form" onSubmit={updatePasswordSubmit}>
                <h2>Update Password</h2>
            <div className="input-group">
                <input type="password" placeholder='Old Password' name='oldPassword' value={oldPassword}  onChange={(e)=>setOldPassword(e.target.value)}/>
            </div>
            <div className="input-group">
                <input type="password" placeholder='New Password' name='newPassword' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
            </div>
            <div className="input-group">
                <input type="password" placeholder='Confirm  Password' name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
            </div>

            <button className="authBtn">Update Password</button>
            </form>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default UpdatePassword
