import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../componant/PageTitle'
import Footer from '../componant/Footer'
import Navbar from '../componant/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, removeError, removeSuccess } from '../feature/user/userSlice'
import { toast } from 'react-toastify'
import Loader from '../componant/Loader'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const {loading, error, success, message}= useSelector(state=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail]=useState("")
    const forgotPasswordEmail=(e)=>{
        e.preventDefault();
        const myForm = new FormData()
        myForm.set('email',email)
        dispatch(forgotPassword(myForm))
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
          toast.success(message, { position: "top-right", autoClose: 3000 });
          dispatch(removeSuccess());
          navigate("/profile");
        }
      }, [success, dispatch]);
  return (
    <>
 { loading?(<Loader />): 
     (<>
    <PageTitle title="Forgot Password"/>
    <Navbar />
    <div className="container forgot-container">
        <div className="form-content email-group">
            <form action="" className='form' onSubmit={forgotPasswordEmail}>
                <h2 >Forgot Password</h2>
                <div className="input-group">
                    <input type="email" placeholder='Enter Your Registered Email' value={email} onChange={(e)=> setEmail(e.target.value)} name="name"/>
                </div>
                <button className='authBtn'>Send</button>
            </form>
        </div>
    </div>
    <Footer />
    </>)}
    </>
  )
}   

export default ForgotPassword
