import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
      <div className="footer-content-left">
  <img className='logo-icon' src={assets.logo} alt="Foody Fly Logo" />
  <p>Foody Fly – Let your taste buds soar.
    Bringing bold flavors and unforgettable meals to your table.
  </p>
  <div className="footer-social-icons">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <img className='footer-social-icon' src={assets.facebook_icon} alt="Facebook" />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <img className='footer-social-icon' src={assets.twitter_icon} alt="Twitter" />
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
      <img className='footer-social-icon' src={assets.linkedin_icon} alt="LinkedIn" />
    </a>
  </div>
</div>

<div className="footer-content-center">
  <h2>COMPANY</h2>
  <ul>
    <li>Home</li>
    <li>About us</li>
    <li>Delivery</li>
    <li>Privacy policy</li>
  </ul>
</div>


        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+92 000 000 000</li>
            <li>contact@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className='footer-copyright'>Copyright 2025 - All Rights Reserved</p>
    </div>
  )
}

export default Footer
