import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchProductRequest, updateProductRequest } from '../store/actions/productsActions';
import { inputChangeHandler, fileChangeHandler, imageСonverterHandler } from '../components/UI/FormComponents/Handlers/Handlers';
import { fetchCategoriesRequest } from '../store/actions/categoriesActions';
import ProductCard from '../components/UI/Cards/ProductCard';
import defaultPhoto from '../assets/no-image.png';
import './Product.css';
import { historyPush } from '../store/actions/historyActions';

const EditProduct = () => {
  const category = useSelector(state => state.categories.categories);
  const proproduct = useSelector(state => state.products.product);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const match = useRouteMatch();
  const id = match.params.id;
  const [imageConvert, setImageConvert] = useState(null);
  const [publish, setPublish] = useState(false);
  const [categoryNow, setCategoryNow] = useState(null);
  const [product, setProduct] = useState({
    title: '',
    description: '',
    image: null,
    price: '',
    category: '',
    publish: ''
  });
  
  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);


  useEffect(() => {
    if (match.params.id) {
      dispatch(fetchProductRequest(match.params.id));
      if (proproduct !== null) {
        setProduct({    
          title: proproduct.title,
          description: proproduct.description,
          image: proproduct.image,
          price: proproduct.price,
          category: proproduct.category._id,
          publish: proproduct.publish
        });
        setCategoryNow(proproduct.category.title)
        setImageConvert(imageСonverterHandler(proproduct));
      }
    } 
  }, [dispatch]);

  const activateInput = () => {
    inputRef.current.click();
  };

  const changePublish = bul => {
    setPublish(bul);
    setProduct(prev => ({...prev, publish: bul}));
  };

  const onSubmitFormData = () => {
    const data = new FormData;

    data.append('title', product.title);
    data.append('description', product.description);
    data.append('image', product.image);
    data.append('price', product.price);
    data.append('category', product.category);
    data.append('publish', publish);

    dispatch(updateProductRequest({data, id}));
    dispatch(historyPush('/myproduct'))
    
    };  

  return (
    <>
    <ProductCard>
      <img 
        src={!product.image ? defaultPhoto : imageConvert} 
        alt={product.title} 
        onClick={activateInput} 
        width={500}
        style={{cursor: 'pointer'}}
      />

      <input 
        type="file" 
        onChange={e => fileChangeHandler(e, setProduct, setImageConvert)} 
        className="imgInput" 
        name='image' 
        accept="image/*" 
        ref={inputRef}
      />

      <input 
          type='text' 
          name="title" 
          value={product.title} 
          onChange={e => inputChangeHandler(e, setProduct)} 
          className='nameInput'
          placeholder='title'
      />
      
      <textarea 
          type='text' 
          name="description" 
          value={product.description} 
          onChange={e => inputChangeHandler(e, setProduct)} 
          className='nameInput'
          placeholder='description'
          cols={10}
          rows={3}
      />

      <select 
          name="category" 
          onChange={e => inputChangeHandler(e, setProduct)} 
          className='nameInput'
      >
        <option>{!categoryNow ? '--Выбирите категорию--' : categoryNow}</option>
        {category && category.map(cat => (
          <option value={cat._id} key={cat.title}>{cat.title}</option>
        ))}
      
      </select>

      <input 
          type='text'
          name="price" 
          value={product.price} 
          onChange={e => inputChangeHandler(e, setProduct)} 
          className='nameInput'
          placeholder='price'
      />

        <>           
          {!product.publish
              ? <button className='publish no' onClick={() => changePublish(true)}>ОПУБЛИКОВАТЬ</button> 
              : <button className='publish yes' onClick={() => changePublish(false)}>СНЯТЬ С ПУБЛИКАЦИИ</button>
          }
        </>

      <button 
        type="submit" 
        onClick={onSubmitFormData} 
        className='editbtn' 
        disabled={!product.title || !product.category}
        style={{cursor: 'pointer'}}
      >Изменить товар
      </button>

    </ProductCard>
</>
  );
};
export default EditProduct;
