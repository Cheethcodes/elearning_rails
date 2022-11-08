import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FaCheckCircle, FaSave, FaTimes, FaTimesCircle } from 'react-icons/fa'
import { FieldsWithValidation } from '../components/FieldsWithValidation'
import { Toastify } from '../components/Toastify'
import UserAvatar from '../components/UserAvatar'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'

export const ProfileSettings = () => {
  const { loggedInUser, profileUpdate, setProfileUpdate } = useAuth()

  const [hasAvatar, setHasAvatar] = useState(false)
  const avatarRef = useRef(null)
  const [profile, setProfile] = useState({
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
    apiClient({
      method: 'get',
      url: `/api/v1/users/${loggedInUser.id}`
    }).then(response => {
      setProfile({
        ...profile,
        username: response.data.username,
        email: response.data.email,
        avatar: (response.data.avatar !== null && response.data.avatar !== '') ? response.data.avatar.url : null
      })
      setHasAvatar((response.data.avatar !== '' && response.data.avatar !== null) ? true : false)
    }).catch(error => {
      Toastify('error', error.response.data)
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

    setHasAvatar(false)
  }

  const saveAvatar = () => {
    const formData = new FormData()
    formData.append('avatar[has_avatar]', hasAvatar)
    formData.append('avatar[avatar]', profile.avatar)

    apiClient({
      method: 'patch',
      url: `/api/v1/users/${loggedInUser.id}/update_avatar/`,
      data: formData
    }).then(response => {
      Toastify('success', 'Successfully updated avatar!')
      window.location.reload(false);
    }).catch(error => {
      Toastify('error', error.response.data)
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
      Toastify('error', error.response.data)
    })
  }

  return (
    <>
      <h4 className='text-lg text-primary font-bold'>Account Settings</h4>
      <hr className='my-1' />
      <div id='settings' className='mb-4 bg-white px-12 py-8 rounded-lg'>
        <h4 className='text-md text-primary font-bold'>General Information</h4>
        <hr className='my-2' />
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
                  setHasAvatar(true)
                }}
                className='hidden'
                accept='image/*'
                multiple={false} />
              <button
                type='button'
                onClick={deleteAvatar}
                className='bg-danger hover:bg-transparent text-white hover:text-danger border border-danger p-2 text-white'><FaTimes /></button>
              <button
                type='button'
                onClick={saveAvatar}
                className='bg-success hover:bg-transparent text-white hover:text-success border border-success p-2 text-white'><FaSave /></button>
            </div>
          </div>
          <div className='w- py-5'>
            <table className='w-full table-auto'>
              <tbody>
                <tr>
                  <td className='font-medium pr-2 pb-2'>User Name:</td>
                  <td className='pb-2'>{loggedInUser.username}</td>
                </tr>
                <tr>
                  <td className='font-medium pr-2 pb-2'>Email:</td>
                  <td className='pb-2'>{loggedInUser.email}</td>
                </tr>
                <tr>
                  <td className='font-medium pr-2 pb-2'>User Level:</td>
                  <td className='pb-2'>{loggedInUser.is_admin === true ? 'Instructor' : 'Student'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='mb-4 bg-white px-12 py-8 rounded-lg'>
        <h4 className='text-md text-primary font-bold'>Change Password</h4>
        <hr className='my-2' />
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
