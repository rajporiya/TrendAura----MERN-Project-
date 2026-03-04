import React, { useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../componant/PageTitle'
import Navbar from '../componant/Navbar'
import Footer from '../componant/Footer'

function UpdatePassword() {
    const [oldPassword, setOldPassword]=useState("")
    const [newPasword, setNewPassword]=useState("")
    const [cnfwPasword, setCnfPassword]=useState("")

    const updatePasswordSubmit=(e)=>{
        e.preventDefault()

        const myForm = new FormData()
        myForm.set('oldPassword',oldPassword )
        myForm.set('newPasword',newPasword )
        myForm.set('cnfwPasword',cnfwPasword )
        console.log(myForm.entries());
        
        for(let pair of myForm.entries()){
            console.log(pair [0] + '=' + pair[1]);
            
        }
    }
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
                <input type="password" placeholder='New Password' name='newPassword' value={newPasword} onChange={(e)=>setNewPassword(e.target.value)}/>
            </div>
            <div className="input-group">
                <input type="password" placeholder='COnfirm  Password' name='confirmPassword' value={cnfwPasword} onChange={(e)=>setCnfPassword(e.target.value)} />
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
