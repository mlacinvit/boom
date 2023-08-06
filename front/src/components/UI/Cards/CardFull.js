import React from 'react';
import { useSelector } from 'react-redux';
import { apiUrl } from '../../../config';
import './Card.css';

const CardFull = ({ product, size, click }) => {
  const user = useSelector(state => state.users.user);
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
        {user ?
          <>
            {!product.publish
              ? <button className='publish no'>НЕОПУБЛИКОВАНО</button>
              : <button className='publish yes'>ОПУБЛИКОВАНО</button>
            }
          </>
          : null
        }

      </div>

    </>
  )

};

export default CardFull;
