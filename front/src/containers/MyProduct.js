import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProductRequest, fetchProductRequest } from '../store/actions/productsActions';
import { historyPush } from '../store/actions/historyActions';
import CardFull from '../components/UI/Cards/CardFull';
import './Product.css';

const MyProduct = () => {
    const myProduct = useSelector(state => state.products.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMyProductRequest());
    }, [dispatch]);


    const goToOneProduct = id => {
        dispatch(fetchProductRequest(id));
        dispatch(historyPush(`/product/${id}`));
    };
    
  return (
    <div className='productBlock'>
      {myProduct && myProduct.map(prod => (
        <CardFull 
            product={prod} 
            key={prod._id} 
            size={'min'} 
            click={e => goToOneProduct(prod._id, e)} 
        />
      ))}
    </div>
  )

};

export default MyProduct;
