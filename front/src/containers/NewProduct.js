import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProductRequest } from '../store/actions/productsActions';
import { inputChangeHandler, fileChangeHandler } from '../components/UI/FormComponents/Handlers/Handlers';
import { fetchCategoriesRequest } from '../store/actions/categoriesActions';
import ProductCard from '../components/UI/Cards/ProductCard';
import defaultPhoto from '../assets/no-image.png';
import './Product.css';

const NewProduct = () => {
  const category = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [imageConvert, setImageConvert] = useState(null);

  const [product, setProduct] = useState({
    title: '',
    description: '',
    image: null,
    price: '',
    category: ''
  });
  
  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);


  const activateInput = () => {
    inputRef.current.click();
  };

  const onSubmitFormData = async() => {
    const formData = new FormData;
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('image', product.image);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('publish', publish);

    dispatch(createProductRequest(formData));
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
        <option>{!product.category ? '--Выбирите категорию--' : product.category}</option>
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

      <button 
        type="submit" 
        onClick={onSubmitFormData} 
        className='editbtn' 
        disabled={!product.title || !product.category}
      >Добавить товар
      </button>

    </ProductCard>
</>
  );
};
export default NewProduct;
