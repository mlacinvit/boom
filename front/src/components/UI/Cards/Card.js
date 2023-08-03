import React from 'react';
import './Card.css';

const Card = ({children}) => {
    return (
        <div className='cardbox'> 
           <div className='children'>{children}</div>
        </div>
    )
};
export default Card;
