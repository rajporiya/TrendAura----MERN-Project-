import React from 'react'
import '../componentStyles/Footer.css'
import { Email, GitHub, Instagram, LinkedIn, Phone, YouTube } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function Footer() {
  return (
      <footer className="footer">
        {/* Section 1  */}
        <div className='footer-container'>

            {/* section1 */}
            <div className='footer-section contanct'>
                <h3>Contact Us</h3>
                <p><Phone fontSize="small" />Phone :- 8487955559 </p>
                <p><Email fontSize="small" />Email :- rajporiya81@gmail.com </p>
            </div>

            {/* section 2 */}
             <div className='footer-section social'>
            <h3>Follow Me</h3>
            <div className='social-links'>
                <a href='' target='_blank'><GitHub className='social-icon' /></a>
                <a href='' target='_blank'><LinkedIn className='social-icon' /></a>
                <a href='' target='_blank'><YouTube className='social-icon' /></a>
                <a href='' target='_blank'><Instagram className='social-icon' /></a>

            </div>
             
            </div>

            {/* section 3 */}
            <div className="footer-section about" >
            <h3>About</h3>
            <p>Grow Your Skill</p>
            </div>
        </div>

        <div className='footer-bottom'>
            <p> &copy; TrendAura- All rights Reserved</p>

        </div>
      </footer>
  )
}

export default Footer
