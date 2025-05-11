import { useState, useEffect } from 'react'
import { validateForm, validateField } from '../utils/Validation'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import Personal from '../components/Personal' 
import Contect from '../components/Contect' 
import Password from '../components/Password' 
import Profile from '../components/Profile' 

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        age: '',
        gender: '',
        address: '',
        avatarUrl: '',
        interests: [],
        bio: ''
      }) 

    const [errors, setErrors] = useState({}) 
    const [showPassword, setShowPassword] = useState(false) 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) 

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target 
        
        if (type === 'checkbox') {
          const updatedInterests = checked 
            ? [...formData.interests, value]
            : formData.interests.filter(interest => interest !== value) 
          
          setFormData({
            ...formData,
            interests: updatedInterests
          }) 
        } else {
          const updatedFormData = {
            ...formData,
            [name]: value
          } 
          
          setFormData(updatedFormData) 
          
          const fieldErrors = validateField(name, value, updatedFormData) 
          
          if (Object.keys(fieldErrors).length === 0) {
            setErrors(prev => {
              const newErrors = { ...prev } 
              delete newErrors[name] 
              return newErrors 
            }) 
          } else {
            setErrors(prev => {
              const newErrors = { ...prev }
              Object.entries(fieldErrors).forEach(([key, errorValue]) => {
                if (errorValue === '' || errorValue === null) {
                  delete newErrors[key]
                } else {
                  newErrors[key] = errorValue
                }
              })
              return newErrors 
            }) 
          }
        }
    } 
    
    const handleBlur = (e) => {
        const { name, value } = e.target 
        if (value) {
          const fieldErrors = validateField(name, value, formData) 
          
          setErrors(prev => {
              const newErrors = { ...prev } 
              
              if (!fieldErrors[name] || fieldErrors[name] === '') {
                  delete newErrors[name] 
              } else {
                  newErrors[name] = fieldErrors[name] 
              }
              
              if (name === 'password' && formData.confirmPassword) {
                  const confirmErrors = validateField('confirmPassword', formData.confirmPassword, formData) 
                  if (!confirmErrors.confirmPassword || confirmErrors.confirmPassword === '') {
                      delete newErrors.confirmPassword 
                  } else {
                      newErrors.confirmPassword = confirmErrors.confirmPassword 
                  }
              }
              
              return newErrors 
          }) 
      }
    } 

    const Components = [Personal,Contect,Password,Profile]

    return (
     <>
        <div className='max-w-2xl mt-20 mb-20 mx-auto p-6 bg-white rounded-4xl shadow-2xl my-8'>
          <div className='text-center mb-10'>
          <img src='../public/logoowen.svg' alt='Logo' className='mt-6 mx-auto h-50 w-auto mb-10 logo-modify' />
            <h2 className='text-5xl font-extrabold text-gray-900'>ลงทะเบียน</h2>
            <p className='mt-2 text-2xl text-gray-600'>กรุณากรอกข้อมูลเพื่อสร้างบัญชี</p>
          </div>
          <div className='mb-10'>
            {Components.map((Component, index) => (
                <Component
                    key={index}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    formData={formData}
                    errors={errors}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                />
            ))}
          </div>
            <div className='relative'>
              <Link to='/' className='absolute top-[-5px] left-[-40px] hover:text-gray-500'>
                  <ArrowLeftIcon className='h-12 w-12 text-white bg-blue-600 shadow-2xl hover:bg-gray-500 rounded-[15px]' />
              </Link>
              <button 
                type="button"
                onClick={() => {
                  setFormData({
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    age: '',
                    gender: '',
                    address: '',
                    avatarUrl: '',
                    interests: [],
                    bio: ''
                  }) 
                  setErrors({}) 
                }}
                className='absolute top-[-6px] right-[100px] p-[10px] text-[1.2rem] text-white bg-blue-600 shadow-2xl hover:bg-gray-500 rounded-[15px]'>
                  ล้างข้อมูล
              </button>
              <button className='absolute top-[-6px] right-[-40px] p-[10px] text-[1.2rem] text-white bg-blue-600 shadow-2xl hover:bg-gray-500 rounded-[15px]'>
                  ลงทะเบียน
              </button>
            </div>
        </div>
     </>
    )
}

export default Register
