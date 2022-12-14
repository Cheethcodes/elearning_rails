import Cookies from 'js-cookie'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa'
import { FieldsWithValidation } from '../components/FieldsWithValidation'
import { Toastify } from '../components/Toastify'
import UserAvatar from '../components/UserAvatar'
import { GetProfile, SaveProfile } from '../constants/Profile'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'

export const ProfileSettings = () => {
  const { loggedInUser } = useAuth()

  const [hasAvatar, setHasAvatar] = useState({
    hasContent: false,
    isUpdated: false,
  })
  const avatarRef = useRef(null)
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    avatar: '',
    password: '',
    confirm_password: '',
    profilepic: '',
  })
  const [validationRules, setValidationRules] = useState({
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
    setProfile({
      ...profile,
      [e.target.id]: e.target.value
    })
  }

  const data = useMemo(() => {
    GetProfile(loggedInUser.id).then(response => {
      setProfile({
        ...profile,
        username: response.username,
        email: response.email,
        avatar: (response.avatar !== null && response.avatar !== '') ? response.avatar.url : null
      })
      setHasAvatar({
        ...hasAvatar,
        hasContent: (response.avatar !== '' && response.avatar !== null) ? true : false
      })
    }).catch(() => {
      Toastify('error')
    })
  }, [])

  useEffect(() => {
    var regex_uppercase = new RegExp(/^(?=.*[A-Z])/)
    var regex_lowercase = new RegExp(/^(?=.*[a-z])/)
    var regex_number = new RegExp(/^(?=.*\d)/)
    var regex_symbol = new RegExp(/^(?=.*[@$!%*#?&])/)

    setValidationRules({
      password: {
        length: (profile.password.length >= 6 && profile.password.length <= 20),
        lowercase: regex_lowercase.test(profile.password),
        uppercase: regex_uppercase.test(profile.password),
        number: regex_number.test(profile.password),
        symbols: regex_symbol.test(profile.password),
        match: (profile.password === profile.confirm_password),
      }
    })
  }, [profile])

  const deleteAvatar = () => {
    avatarRef.current.value = null

    setProfile({
      ...profile,
      avatar: null
    })

    setHasAvatar({
      hasContent: false,
      isUpdated: true,
    })
  }

  const saveInformation = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('avatar[has_avatar]', hasAvatar.hasContent)
    formData.append('avatar[has_updated]', hasAvatar.isUpdated)
    formData.append('avatar[avatar]', profile.avatar)
    formData.append('avatar[username]', profile.username)
    formData.append('avatar[email]', profile.email)

    SaveProfile('update', formData, loggedInUser.id).then(response => {
      Cookies.set('user_username', profile.username)
      Cookies.set('user_email', profile.email)
      Toastify('success', 'Successfully updated avatar!')
      window.location.reload(false)
    }).catch(response => {
      Toastify('error')
    })
  }

  const savePassword = (e) => {
    e.preventDefault()

    if (!(validationRules.password.length && validationRules.password.lowercase && validationRules.password.uppercase && validationRules.password.number && validationRules.password.symbols && validationRules.password.match)) {
      return
    }

    apiClient({
      method: 'put',
      url: '/user/password',
      data: {
        password: profile.password,
        password_confirmation: profile.confirm_password
      }
    }).then(response => {
      Toastify('success', 'Successfully updated password!')
      setProfile({
        ...profile,
        password: '',
        confirm_password: ''
      })
    }).catch(error => {
      Toastify('error')
    })
  }

  return (
    <>
      <h4 className='text-lg text-primary font-bold'>Account Settings</h4>
      <hr className='mt-1 mb-4' />
      <div id='settings' className='mb-4 bg-white px-12 py-8 rounded-lg'>
        <h4 className='text-md text-primary font-bold'>General Information</h4>
        <hr className='mt-1 mb-2' />
        <div className='flex gap-5'>
          <div className='uploader relative overflow-none'>
            <UserAvatar avatar={profile.avatar} className=' mb-3' />
            <div className='flex items-center justify-center gap-1'>
              <label htmlFor='avatar' className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary p-2 block' style={{ borderRadius: '3px', lineHeight: '1', cursor: 'pointer' }}>Upload Avatar</label>
              <input
                type='file'
                id='avatar'
                name='avatar'
                ref={avatarRef}
                onInput={e => {
                  setProfile({
                    ...profile,
                    avatar: e.target.files[0],
                    profilepic: URL.createObjectURL(e.target.files[0])
                  })
                  setHasAvatar({
                    hasContent: true,
                    isUpdated: true,
                  })
                }}
                className='hidden'
                accept='image/*'
                multiple={false} />
              <button
                type='button'
                onClick={deleteAvatar}
                className='bg-danger hover:bg-transparent text-white hover:text-danger border border-danger p-2 text-white'>
                <FaTimes />
              </button>
            </div>
          </div>
          <div className='w-full'>
            <form onSubmit={saveInformation} className='flex flex-col h-full'>
              <div className='grow'>
                <table>
                  <tbody>
                    <tr>
                      <td className='font-medium pr-2'>
                        <div className='flex items-center' style={{ marginBottom: '12px' }}>
                          User Name:
                        </div>
                      </td>
                      <td style={{ minWidth: '250px' }}>
                        <FieldsWithValidation
                          type='text'
                          id='username'
                          placeholder='Username'
                          className=' border border-slate-300'
                          onChangeAction={handleOnChange}
                          value={profile.username}
                          required={true} />
                      </td>
                    </tr>
                    <tr>
                      <td className='font-medium pr-2 pb-2'>
                        <div className='flex items-center' style={{ marginBottom: '12px' }}>
                          Email:
                        </div>
                      </td>
                      <td style={{ minWidth: '250px' }}>
                        <FieldsWithValidation
                          type='email'
                          id='email'
                          placeholder='Email'
                          className=' border border-slate-300'
                          onChangeAction={handleOnChange}
                          value={profile.email}
                          required={true} /></td>
                    </tr>
                    <tr>
                      <td className='font-medium pr-2 pb-2'>
                        <div className='flex items-center'>
                          User Level:
                        </div>
                      </td>
                      <td className='pb-2'>{loggedInUser.is_admin === 'true' ? 'Instructor' : 'Student'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-3 px-5'
                  style={{ width: '180px' }}>
                  Save Information
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='mb-4 bg-white px-12 py-8 rounded-lg'>
        <h4 className='text-md text-primary font-bold'>Change Password</h4>
        <hr className='mt-1 mb-2' />
        <div>
          <form onSubmit={savePassword} className='flex gap-4'>
            <div className='grow'>
              {/* Password */}
              <FieldsWithValidation
                type='password'
                id='password'
                placeholder='Password'
                className=' border border-slate-300'
                onChangeAction={handleOnChange}
                value={profile.password}
                required={true} />
              {/* Confirm Password */}
              <FieldsWithValidation
                type='password'
                id='confirm_password'
                placeholder='Confirm Password'
                className=' border border-slate-300'
                onChangeAction={handleOnChange}
                value={profile.confirm_password}
                required={true} />
              {/* Validators */}
              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div className='flex flex-col gap-2'>
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
                  Save Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
