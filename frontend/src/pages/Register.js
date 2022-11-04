import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'
import Cookies from 'js-cookie'
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa'
import { FieldsWithValidation } from '../components/FieldsWithValidation'

export const Register = () => {
  const { login, loggedInUser, setLoggedInUser } = useAuth()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  })

  const [fieldErrors, setFieldErrors] = useState({
    email: null,
    username: null,
    password: null,
    confirm_password: null,
  })

  const [validationRules, setValidationRules] = useState({
    username: {
      length: false,
    },
    password: {
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      symbols: false,
      match: true,
    }
  })

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    })

    setFieldErrors({
      ...fieldErrors,
      [e.target.id]: null
    })
  }

  useEffect(() => {
    var regex_uppercase = new RegExp(/^(?=.*[A-Z])/)
    var regex_lowercase = new RegExp(/^(?=.*[a-z])/)
    var regex_number = new RegExp(/^(?=.*\d)/)
    var regex_symbol = new RegExp(/^(?=.*[@$!%*#?&])/)

    setValidationRules({
      username: {
        length: (user.username.length >= 4 && user.username.length <= 10),
      },
      password: {
        length: (user.password.length >= 6 && user.password.length <= 20),
        lowercase: regex_lowercase.test(user.password),
        uppercase: regex_uppercase.test(user.password),
        number: regex_number.test(user.password),
        symbols: regex_symbol.test(user.password),
        match: (user.password === user.confirm_password),
      }
    })
  }, [user])

  const clearFields = () => {
    setUser({
      email: '',
      username: '',
      password: '',
      confirm_password: '',
    })

    setValidationRules({
      username: {
        length: false,
      },
      password: {
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        symbols: false,
        match: true,
      }
    })

    setFieldErrors({
      email: null,
      username: null,
      password: null,
      confirm_password: null,
    })
  }

  const saveUser = (e) => {
    e.preventDefault()

    if (!(validationRules.username.length && validationRules.password.length && validationRules.password.lowercase && validationRules.password.uppercase && validationRules.password.number && validationRules.password.symbols && validationRules.password.match)) {
      return
    }

    apiClient({
      method: 'post',
      url: '/auth/',
      data: {
        email: user.email,
        username: user.username,
        password: user.password,
        password_confirmation: user.confirm_password,
      }
    }).then((response) => {
      setLoggedInUser({
        ...loggedInUser,
        id: response.data.data.id,
        username: response.data.data.username,
        email: response.data.data.email,
        is_admin: response.data.data.is_admin,
      })

      Cookies.set('user_id', response.data.data.id)
      Cookies.set('user_username', response.data.data.username)
      Cookies.set('user_email', response.data.data.email)
      Cookies.set('user_admin', response.data.data.is_admin)

      // Headers
      Cookies.set('token-type', response.headers['token-type'])
      Cookies.set('access-token', response.headers['access-token'])
      Cookies.set('client', response.headers.client)
      Cookies.set('uid', response.headers.uid)
      Cookies.set('authorization', response.headers.authorization)

      clearFields()

      window.alert('Successfully registered!')
      login()
      navigate('/dashboard')
    }).catch((error) => {
      window.alert('There was an error processing your request!')
      setFieldErrors(error.response.data.errors)
      console.log(fieldErrors)
    })
  }

  return (
    <div className='auth-screen'>
      <div className='auth-card rounded-3xl w-full mx-auto px-10 py-10 bg-white' style={{ maxWidth: '900px', backgroundColor: '#F5F6FA' }}>
        <div className='flex justify-between mb-4'>
          <h4 className='text-lg font-bold text-primary text-left'>{process.env.REACT_APP_NAME}</h4>
          <a
            href='/login'
            className='hover:border-primary hover:text-primary text-slate-300 border border-slate-300'
            style={{ padding: '6px 15px' }}>
            Login
          </a>
        </div>
        <div className='text-center'>
          <h3 className='text-lg font-bold'>Start your journey</h3>
        </div>
        <hr className='my-4' />
        <div className='grid grid-cols-6'>
          <div className='col-span-2'>
            <ul>
              <li className='flex items-center gap-2 font-medium'>
                <div className='marker border-4 rounded-full border-danger bg-success' />
                Create your credentials
              </li>
            </ul>
          </div>
          <div className='col-span-4'>
            {/* Form */}
            <form onSubmit={saveUser} className='flex flex-col gap-4'>
              {/* Email Address */}
              <FieldsWithValidation
                type='email'
                id='email'
                placeholder='Email'
                onChangeAction={handleOnChange}
                value={user.email}
                required={true}
                errorMessage={fieldErrors.email} />
              {/* Username */}
              <FieldsWithValidation
                type='text'
                id='username'
                placeholder='Username'
                onChangeAction={handleOnChange}
                value={user.username}
                required={true}
                errorMessage={fieldErrors.username} />
              {/* Password */}
              <FieldsWithValidation
                type='password'
                id='password'
                placeholder='Password'
                onChangeAction={handleOnChange}
                value={user.password}
                required={true}
                errorMessage={fieldErrors.password} />
              {/* Confirm Password */}
              <FieldsWithValidation
                type='password'
                id='confirm_password'
                placeholder='Confirm Password'
                onChangeAction={handleOnChange}
                value={user.confirm_password}
                required={true} />
              {/* Validators */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <div className={`flex items-center gap-2 ${validationRules.username.length ? 'text-success' : 'text-danger'}`}>
                    {validationRules.username.length ? <FaCheckCircle className='text-md' /> : <FaTimesCircle className='text-md' />}
                    <span className='text-small'>Username must be 4-10 characters only</span>
                  </div>
                  <div className={`flex items-center gap-2 ${validationRules.password.length ? 'text-success' : 'text-danger'}`}>
                    {validationRules.password.length ? <FaCheckCircle className='text-md' /> : <FaTimesCircle className='text-md' />}
                    <span className='text-small'>Password must be 6 - 20 characters only</span>
                  </div>
                  <div className={`flex items-center gap-2 ${validationRules.password.lowercase ? 'text-success' : 'text-danger'}`}>
                    {validationRules.password.lowercase ? <FaCheckCircle className='text-md' /> : <FaTimesCircle className='text-md' />}
                    <span className='text-small'>Password must have at least 1 lower case letter</span>
                  </div>
                  <div className={`flex items-center gap-2 ${validationRules.password.uppercase ? 'text-success' : 'text-danger'}`}>
                    {validationRules.password.uppercase ? <FaCheckCircle className='text-md' /> : <FaTimesCircle className='text-md' />}
                    <span className='text-small'>Password must have at least 1 upper case letter</span>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className={`flex items-center gap-2 ${validationRules.password.number ? 'text-success' : 'text-danger'}`}>
                    {validationRules.password.number ? <FaCheckCircle className='text-md' /> : <FaTimesCircle className='text-md' />}
                    <span className='text-small'>Password must have at least 1 number</span>
                  </div>
                  <div className={`flex items-center gap-2 ${validationRules.password.symbols ? 'text-success' : 'text-danger'}`}>
                    {validationRules.password.symbols ? <FaCheckCircle className='text-md' /> : <FaTimesCircle className='text-md' />}
                    <span className='text-small'>Password should contain at least 1 special symbol</span>
                  </div>
                  <div className={`flex items-center gap-2 ${validationRules.password.match ? 'text-success' : 'text-danger'}`}>
                    {validationRules.password.match ? <FaCheckCircle className='text-md' /> : <FaTimesCircle className='text-md' />}
                    <span className='text-small'>Password must match</span>
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <button
                  type='submit'
                  className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-3 px-5'
                  style={{ width: '180px' }}>
                  REGISTER
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
