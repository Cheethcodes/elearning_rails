import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'
import Cookies from 'js-cookie'
import loginbg from '../assets/images/loginbg.svg'
import { FieldsWithValidation } from '../components/FieldsWithValidation'
import { AuthCard } from '../components/AuthCard'

export const Login = () => {
  const { login, loggedInUser, setLoggedInUser } = useAuth()
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const [errorMessage, setErrorMessage] = useState(null)

  const handleOnChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    apiClient({
      method: 'post',
      url: `/user/sign_in`,
      data: {
        email: credentials.email,
        password: credentials.password.toString()
      }
    }).then((response) => {
      setLoggedInUser({
        ...loggedInUser,
        id: response.data.data.id,
        username: response.data.data.username,
        email: response.data.data.email,
        is_admin: response.data.data.is_admin.toString(),
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

      login()
      navigate('/dashboard')
    }).catch(error => {
      setErrorMessage(error.response.data.errors[0])
    })
  }

  return (
    <AuthCard redirect='Register'>
      <div className='grid grid-cols-2 gap-5'>
        <div className='flex flex-col justify-center'>
          <h3 className='text-lg font-bold'>Log into your account</h3>
          <hr className='my-4' />
          <div className='flex items-center'>
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
              {/* Email */}
              <FieldsWithValidation
                type='email'
                id='email'
                placeholder='Email'
                onChangeAction={handleOnChange}
                value={credentials.email}
                required={true}
                errorMessage={errorMessage} />
              {/* Password */}
              <FieldsWithValidation
                type='password'
                id='password'
                placeholder='Password'
                onChangeAction={handleOnChange}
                value={credentials.password}
                required={true} />
              <div className='text-right'>
                <button
                  type='submit'
                  className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-3 px-5'
                  style={{ width: '180px' }}>
                  LOG IN
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <img src={loginbg} alt='bg.png' draggable={false} />
        </div>
      </div>
    </AuthCard>
  )
}
