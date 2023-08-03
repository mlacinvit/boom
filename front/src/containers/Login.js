import React, { useState } from 'react'
import FormComponent from '../components/UI/FormComponents/FormComponent';
import { inputChangeHandler, submitFormHandler } from '../components/UI/FormComponents/Handlers/Handlers';
import { useDispatch, useSelector } from 'react-redux';
import {loginUserRequest} from '../store/actions/usersActions';

const Login = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.loginError)
    const [user, setUser] = useState({
      email: '',
      password: '',
    });

    return (
        <>
            <FormComponent
                title="Войдите в свой профиль"
                typeForm="Войти"
                submit={e => submitFormHandler(e, dispatch(loginUserRequest({ userData: user })))}
                onChange={e => inputChangeHandler(e, setUser)}
                inputName={['email', 'password']}
                placeholderName={['Электронная почта', 'Пароль']}
                inputType={['text', 'password']}
                value={user}
                error={error}
                disabled={!user.email || !user.password}
                link={{title: 'регистрация', to: '/register'}}
            />
        </>
    );
}

export default Login;
