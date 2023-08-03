import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/UI/Cards/Card';
import Avatar from '../components/UI/Avatar';
import { inputChangeHandler, fileChangeHandler } from '../components/UI/FormComponents/Handlers/Handlers';
import {editRequest, loginUserRequest} from '../store/actions/usersActions';
import './MyProfile.css';


const MyProfile = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const inputRef = useRef();
    const [edit, setEdit] = useState({username: '', email: '', phone: '', avatar: ''});
    const [preview, setPreview] = useState(null);
 
    useEffect(() => {
        dispatch(loginUserRequest());
      }, [dispatch]);


      useEffect(() => {
        const newState = {};
        if (user) {
          newState.username = user.username ? user.username : '';
          newState.email = user.email ? user.email : '';
          newState.avatar = user.avatar ? user.avatar : '';
          newState.phone = user.phone ? user.phone : '';
          setEdit(newState);
        }
      }, [user]);

    const activateInput = () => {
        inputRef.current.click();
      };

    const onSubmitFormData = async() => {
        const formData = new FormData;
        formData.append('avatar', edit.avatar);
        formData.append('username', edit.username);
        formData.append('email', edit.email);
        formData.append('phone', edit.phone);
        dispatch(editRequest(formData));
    };  

    return (
        <div>
            <Card>
                {user && (
                    <>
                        <Avatar user={user} wh='wh1' click={activateInput}/>
                        <input type="file" onChange={e => fileChangeHandler(e, setEdit)} className="imgInput" name='avatar' accept="image/*" ref={inputRef}/>

                        <label className='labelInput'>Name:
                            <input 
                                type='text' 
                                name="username" 
                                value={edit.username} 
                                onChange={e => inputChangeHandler(e, setEdit)} 
                                className='nameInput'
                            />
                            </label>
                            
                            <label className='labelInput'>Email:
                            <input 
                                type='text' 
                                name="email" 
                                value={edit.email} 
                                onChange={e => inputChangeHandler(e, setEdit)} 
                                className='nameInput'
                            />
                            </label>

                            <label className='labelInput'>Phone:
                            <input 
                                type='text' 
                                name="phone" 
                                value={edit.phone} 
                                onChange={e => inputChangeHandler(e, setEdit)} 
                                className='nameInput'
                            />
                            </label>

                        <button type="submit" onClick={onSubmitFormData} className='editbtn'>Изменить профиль</button>
                    </>
                )}
            </Card>
        </div>
    );
};

export default MyProfile;
