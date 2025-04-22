import React from 'react'
import './Header.css'
import ExploreMenu from '../ExploreMenu/ExploreMenu'

const Header = () => {

  const handleViewMenu = () => {
    const exploreMenuSection = document.getElementById('explore-menu');
    if (exploreMenuSection) {
      exploreMenuSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className='header header-1'>
      <div className="header-contents">
        <h2>Order your <br/> Favourite Food Here</h2>
        <p>
        From comforting favorites to exciting new flavors, our menu has something for everyone. We’re passionate about great food and even better service—so come hungry and leave happy!
        </p>
        <button onClick={handleViewMenu}>View Menu</button>
      </div>
    </div>
  )
}

export default Header
