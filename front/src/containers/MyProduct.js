import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProductRequest } from '../store/actions/productsActions';
import CardFull from '../components/UI/Cards/CardFull';
import './Product.css';

const MyProduct = () => {
    const myProduct = useSelector(state => state.products.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMyProductRequest());
    }, [dispatch]);

  return (
    <div className='productBlock'>
      {myProduct && myProduct.map(prod => (
        <CardFull product={prod} key={prod._id} size={'min'}/>
      ))}
    </div>
  )

};

export default MyProduct;
