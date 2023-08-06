import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchProductRequest } from '../store/actions/productsActions';
import { historyPush } from '../store/actions/historyActions';
import CardFull from '../components/UI/Cards/CardFull';
import './Product.css';

const Product = () => {
  const product = useSelector(state => state.products.product);
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [showTel, setShowTel] = useState(false);

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
          {user._id === product.user._id
            ? <button className='btnEdit' onClick={goToEditProduct}>✏️</button>
            : <button className='btnEdit' onClick={() => setShowTel(!showTel)}>🛒</button>
          }
          {showTel 
          ? <>
              <p>Информация:</p>
              <div>
                <h2>{product.user.username}</h2>
                <h2>{product.user.phone}</h2>
              </div>
            </>
          : null
          }
         
        </>
      }
    </div>
  )
};
export default Product;
