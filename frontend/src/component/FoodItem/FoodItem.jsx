import React, { useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const itemRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          itemRef.current.classList.add('animate');
        } else {
          itemRef.current.classList.remove('animate');
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  const handleImageClick = () => {
    navigate(`/food/${id}`, {
      state: { id, name, image, description, price }
    });
  };

  return (
    <div className='food-item' ref={itemRef} onClick={handleImageClick} style={{ cursor: 'pointer' }}>
      <div className="food-item-img-container">
        <img
          className='food-item-image'
          src={url + "/images/" + image}
          alt={name}
        />
        {!cartItems[id] ? (
          <img className='add' onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_white} alt="" />
        ) : (
          <div className='food-item-counter' onClick={(e) => e.stopPropagation()}>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
  
};

export default FoodItem;
