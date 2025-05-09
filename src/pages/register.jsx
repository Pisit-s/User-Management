import { useState, useEffect } from 'react'
import { validateForm, validateField } from '../utils/Validation'
import Personal from '../components/Personal';
import Profile from '../components/Profile';

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
      });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
          const updatedInterests = checked 
            ? [...formData.interests, value]
            : formData.interests.filter(interest => interest !== value);
          
          setFormData({
            ...formData,
            interests: updatedInterests
          });
        } else {
          setFormData({
            ...formData,
            [name]: value
          });
          
          // Validate field and clear error if valid
          const fieldErrors = validateField(name, value);
          if (Object.keys(fieldErrors).length === 0) {
            setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors[name];
              return newErrors;
            });
          } else {
            setErrors(prev => ({
              ...prev,
              ...fieldErrors
            }));
          }
        }
    };
    
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const fieldErrors = validateField(name, value);
        setErrors(prev => ({
          ...prev,
          ...fieldErrors
        }));
    };

    return (
     <>
        <div className='max-w-2xl mt-20 mb-20 mx-auto p-6 bg-white rounded-4xl shadow-md my-8'>
        <div className='text-center mb-10'>
            <img src='../public/logoowen.svg' alt='Logo' className='mt-6 mx-auto h-50 w-auto mb-10' />
            <h2 className='text-5xl font-extrabold text-gray-900'>ลงทะเบียน</h2>
          <p className='mt-2 text-2xl text-gray-600'>กรุณากรอกข้อมูลเพื่อสร้างบัญชี</p>
        </div>
            <Personal
                handleBlur={handleBlur}
                handleChange={handleChange}
                formData={formData}
                errors={errors}
            />
            <Profile 
                handleBlur={handleBlur}
                handleChange={handleChange}
                formData={formData}
                errors={errors}
            />
        </div>
     </>
    )
}

export default Register