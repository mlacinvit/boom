import React, { useState } from 'react'
import FormComponent from '../components/UI/FormComponents/FormComponent';
import { inputChangeHandler, submitFormHandler } from '../components/UI/FormComponents/Handlers/Handlers';
import { useDispatch, useSelector } from 'react-redux';
import {registrationRequest} from '../store/actions/usersActions';

const Register = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.loginError)
    const [user, setUser] = useState({
      email: '',
      password: '',
      username: '', 
      phone: ''
    });
console.log(user);
    return (
        <>
            <FormComponent
                title="Зарегистрируйте свой профиль"
                typeForm="Зарегистрироваться"
                submit={e => submitFormHandler(e, dispatch(registrationRequest({ userData: user })))}
                onChange={e => inputChangeHandler(e, setUser)}
                inputName={['email', 'password', 'username', 'phone']}
                placeholderName={['Электронная почта', 'Пароль', 'Имя', 'Телефон или другие средства связи']}
                inputType={['text', 'password', 'text', 'text']}
                value={user}
                error={error}
                disabled={!user.email || !user.password || !user.username || !user.phone}
                link={{title: 'уже есть профиль?', to: '/login'}}
            />
        </>
    );
}

export default Register;
