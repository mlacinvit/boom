import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchProductRequest } from '../store/actions/productsActions';
import { historyPush } from '../store/actions/historyActions';
import CardFull from '../components/UI/Cards/CardFull';
import './Product.css';

const Product = () => {
  const product = useSelector(state => state.products.product);
  const dispatch = useDispatch();
  const match = useRouteMatch();


  useEffect(() => {
    dispatch(fetchProductRequest(match.params.id));
  }, [dispatch, match.params]);

  const goToEditProduct = ()=> {
    dispatch(historyPush(`/editproduct/${match.params.id}`));
  };

  return (
    <div>
      {product &&
        <>
          <CardFull size={'max'} product={product}/>
          <button className='btnEdit' onClick={goToEditProduct}>Edit</button>
        </>
      }
    </div>
  )
};
export default Product;
