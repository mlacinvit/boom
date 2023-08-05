import React from 'react';
import './Card.css';

const ProductCard = ({ children }) => {

    return (
        <div className='productBlock'>
            <div className='productForm'>{children}</div>
        </div>
    )
}
export default ProductCard;
