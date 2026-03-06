import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../componant/PageTitle'
import Navbar from '../componant/Navbar'
import Footer from '../componant/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, removeSuccess, resetPassword } from '../feature/user/userSlice'
import { toast } from 'react-toastify'

function ResetPassword() {
    const {loading, error, success}=useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [password, setPassword]=useState("")
    const [confirmPassword, setConfirmPassword]=useState("")
    const {token} = useParams()
    const resetPasswordSubmit=(e)=>{
        e.preventDefault();
        const data={
            // key and value same that write one time
            password,
            confirmPassword,
        }
        dispatch(resetPassword({token: token, uderData:data}))
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
              toast.success("Password reset  successfully! plz login to continue", {
                position: "top-right",
                autoClose: 3000,
              });
              dispatch(removeSuccess());
              navigate("/login");
            }
          }, [success, dispatch]);
  return (
    <>
    <PageTitle title="Reset Password"/>
        <Navbar />
        <div className="container form-container">
            <div className="form-content ">
                <form  className='form' onSubmit={resetPasswordSubmit}>
                    <h2 >Reset Password</h2>
                    <div className="input-group">
                        <input type="password" placeholder='New Password' value={password}  
                        onChange={(e)=> setPassword(e.target.value)} name="newPassword"/>
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder='Confirm Password' value={confirmPassword}  
                        onChange={(e)=> setConfirmPassword(e.target.value)} name="confirmPassword"/>
                    </div>
                    <button className='authBtn'>Rest Password</button>
                </form>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default ResetPassword
