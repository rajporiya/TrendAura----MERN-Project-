import React, { useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../componant/PageTitle'
import Navbar from '../componant/Navbar'
import Footer from '../componant/Footer'
import { useParams } from 'react-router-dom'

function ResetPassword() {
    const [password, setPassword]=useState("")
    const [confirmPassword, setConfirmPassword]=useState("")
    const {token} = useParams()
    const resetPasswordSubmit=(e)=>{
        e.preventDefault();
        const data={
            password,
            confirmPassword,
        }
        console.log(data);
        
    }
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
