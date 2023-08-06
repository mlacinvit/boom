import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest, fetchProductRequest } from '../store/actions/productsActions';
import { historyPush } from '../store/actions/historyActions';
import CardFull from '../components/UI/Cards/CardFull';
import './Product.css';

const Main = () => {
    const products = useSelector(state => state.products.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductsRequest());
    }, [dispatch]);


    const goToOneProduct = id => {
        dispatch(fetchProductRequest(id));
        dispatch(historyPush(`/product/${id}`));
    };
    
  return (
    <div className='all'>
      {products && products.map(prod => (
        <div className='productBlock' key={prod._id}>
          {prod.publish
            ? <CardFull 
                product={prod} 
                size={'min'} 
                click={e => goToOneProduct(prod._id, e)} 
            />
            : null
            }   
        </div>
      ))}
    </div>
  )

};

export default Main;
