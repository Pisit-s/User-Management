import { useState, useEffect } from 'react'
import { validateForm, validateField } from '../utils/Validation'
import { hashPassword } from '../utils/HashPassword'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { ToHomePage } from '../components/InputComponent'
import Summary from '../components/Summary'
import Personal from '../components/Personal' 
import Contect from '../components/Contect' 
import Password from '../components/Password' 
import Profile from '../components/Profile' 

export default function Register() {
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
    const [isFormValid, setIsFormValid] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSummary, setShowSummary] = useState(false)
    const navigate = useNavigate()

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
    
    const handleSubmit = (e) => {
      e.preventDefault()

      const formErrors = validateForm(formData)
      setErrors(formErrors)
      
      if (Object.keys(formErrors).length > 0) {
        alert('กรุณาแก้ไขข้อผิดพลาดในแบบฟอร์ม')
        return
      }
      
      setShowSummary(true)
    }
  
    const handleFinalSubmit = async () => {
      setIsSubmitting(true)
      
      try {
        const hashedPassword = await hashPassword(formData.password)
        
        const newUser = {
          id: uuidv4(),
          name: formData.fullName,
          email: formData.email,
          password: hashedPassword,
          phone: formData.phone || null,
          age: formData.age ? parseInt(formData.age) : null,
          gender: formData.gender || null,
          address: formData.address || null,
          avatarUrl: formData.avatarUrl || null,
          interests: formData.interests,
          bio: formData.bio || null,
          createdAt: new Date().toISOString()
        }
        
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        
        alert('ลงทะเบียนสำเร็จ!')
        
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
        
        setShowSummary(false)
        
        alert('คุณสามารถไปที่หน้าเข้าสู่ระบบได้แล้ว')
        navigate('/login')
      } catch (error) {
        console.error('Registration error:', error)
        alert('การลงทะเบียนล้มเหลว โปรดลองอีกครั้ง')
      } finally {
        setIsSubmitting(false)
      }
    }
  
    const handleEdit = () => {
      setShowSummary(false)
    }

    useEffect(() => {
      const requiredFields = ['fullName', 'email', 'phone', 'password', 'confirmPassword', 'age', 'gender']
      const hasRequiredFields = requiredFields.every(field => formData[field].trim() !== '')
      const hasNoErrors = Object.keys(errors).length === 0
      
      setIsFormValid(hasRequiredFields && hasNoErrors)
    }, [formData, errors])

    if (showSummary) {
      return (
        <Summary 
          formData={formData}
          handleEdit={handleEdit}
          handleFinalSubmit={handleFinalSubmit}
          isSubmitting={isSubmitting}
        />
      )
    }

    const Components = [Personal,Contect,Password,Profile]

    return (
     <>
        <div className='max-w-2xl mt-20 mb-20 mx-6 sm:mx-8 md:mx-auto p-6 bg-white rounded-4xl shadow-2xl my-8'>
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
              <ToHomePage />
              <button 
                type='button'
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
              <button 
                type='submit'
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className={`absolute top-[-6px] right-[-40px] p-[10px] text-[1.2rem] rounded-[15px] ${
                  isFormValid && !isSubmitting
                    ? 'text-white  bg-blue-600 hover:bg-gray-500'
                    : 'text-white bg-gray-400 cursor-not-allowed'
                }`}>
                {isSubmitting ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
              </button>
            </div>
        </div>
     </>
    )
}


