import './styles.scss';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../../redux/auth/middlewares';

import {
  setRememberEmailAction,
  resetRememberEmailAction,
} from '../../../redux/auth/actions';

import AuthLayout from '../../../components/auth/AuthLayout';
import ErrorFormMessage from '../../../components/app/ErrorFormMessage';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm();

  const { isLoading, rememberEmail } = useSelector((state) => state.auth);

  const onSubmit = (userData) => {
    dispatch(loginUser(userData));
  };

  const onChange = (e) => {
    const isChecked = e.target.checked;
    const { email } = getValues();

    isChecked
      ? dispatch(setRememberEmailAction(email))
      : dispatch(resetRememberEmailAction());
  };

  useEffect(() => {
    if (rememberEmail) {
      setValue('email', rememberEmail);
      setValue('loginCheckbox', !!rememberEmail);
    }
  }, [rememberEmail, setValue]);

  return (
    <AuthLayout description='¡Bienvenido inicia sesión!'>
      <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
        <input
          className={`login-form__input animate__animated animate__fadeIn ${
            errors.email ? 'error' : ''
          }`}
          type='email'
          name='email'
          placeholder='Correo electrónico'
          autoComplete='off'
          autoFocus
          {...register('email', {
            required: {
              value: true,
              message: 'El correo electrónico es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Correo electrónico no válido',
              },
            },
          })}
        />

        {errors.email && <ErrorFormMessage message={errors.email.message} />}

        <input
          className={`register-form__input animate__animated animate__fadeIn ${
            errors.password || errors.emptyPassword ? 'error' : ''
          }`}
          type='password'
          placeholder='Contraseña'
          autoComplete='off'
          {...register('password', {
            required: {
              value: true,
              message: 'La contraseña es requerida',
            },
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
            validate: (value) => {
              const validField = value.trim() !== '';
              validField && clearErrors('emptyPassword');

              return (
                validField ||
                setError('emptyPassword', {
                  message: 'La contraseña no debe estar vacía',
                })
              );
            },
          })}
        />

        {errors.password && (
          <ErrorFormMessage message={errors.password.message} />
        )}

        {errors.emptyPassword && (
          <ErrorFormMessage message={errors.emptyPassword.message} />
        )}

        <div className='login-options'>
          <label className='input-container'>
            <input
              type='checkbox'
              {...register('loginCheckbox', {
                onChange: (e) => onChange(e),
              })}
            />
            <span>Recordar correo</span>
          </label>

          <button
            onClick={() => navigate('/auth/register')}
            className='btn-link'
            type='button'
          >
            Ir a registrarse
          </button>
        </div>

        <button className='login-btn' type='submit' disabled={isLoading}>
          {isLoading ? 'Espere por favor...' : 'Iniciar sesión'}
        </button>

        <button
          onClick={() => navigate('/auth/forgot-password')}
          className='btn-link'
          type='button'
        >
          ¿Olvidaste tu contraseña?
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
