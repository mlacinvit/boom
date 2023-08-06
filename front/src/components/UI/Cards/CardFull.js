import React, { useState } from 'react';
import { apiUrl } from '../../../config';
import './Card.css';

const CardFull = ({ product, size, click }) => {
    let avatarImage;

    if (product?.image) {
      if (product?.image.match(/http/) || product?.image.match(/https/)) {
        avatarImage = product.image;
      } else if (product.image.includes('fixtures')) {
        avatarImage = `${apiUrl}/${product.image}`;
      } else {
        avatarImage = `${apiUrl}/${product.image}`;
      }
    } 

  return (
    <>
     
        <div className={`cardFull ${size}`} onClick={click}>
            <img 
                className="image" 
                src={avatarImage} 
                alt={product?.title} 
            />
            <p>{product.category.title}</p>
            <h1>{product.title}</h1>
            {size === 'max' 
                ? <p className='desc'>{product.description}</p>
                : null
            }
            
            <h2>{product.price}</h2>

        </div>
       
    </>
  )

};

export default CardFull;
