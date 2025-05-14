import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToHomePage, TextField } from '../components/InputComponent'
import { hashPassword } from '../utils/HashPassword'
import { validateField } from '../utils/Validation'

export default function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [remember,setRemember] = useState(false)
    const [errorMsg,setErrorMsg] = useState('')
    const [loading,setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        
        if (name === 'email') {
            setEmail(value)
            const fieldErrors = validateField('email-login', value)
            if (fieldErrors.email) {
                setErrors(prev => ({ ...prev, email: fieldErrors.email }))
            } else {
                setErrors(prev => {
                    const newErrors = { ...prev }
                    delete newErrors.email
                    return newErrors
                })
            }
        } else if (name === 'password') {
            setPassword(value)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev)
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        const emailErrors = validateField('email-login', email)
        if (emailErrors.email) {
            setErrors(prev => ({ ...prev, email: emailErrors.email }))
            return
        }
        
        setLoading(true)
        setErrorMsg('')

        let users = localStorage.getItem('users')
        if (!users) {
            setErrorMsg('ไม่พบข้อมูลผู้ใช้')
            setLoading(false)
            return
        }
        users = JSON.parse(users)
        const user = Array.isArray(users)
            ? users.find(u => u.email.toLowerCase() === email.trim().toLowerCase())
            : users.email === email.trim().toLowerCase() ? users : null

        if (!user) {
            setErrorMsg('อีเมลไม่ถูกต้อง')
            setLoading(false)
            return
        }

        const passwordHash = await hashPassword(password)
        if (user.password !== passwordHash) {
            setErrorMsg('รหัสผ่านไม่ถูกต้อง')
            setLoading(false)
            return
        }

        const token = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2)
        const userSession = {
            id: user.id, email: user.email, name: user.name
        }
        if (remember) {
            localStorage.setItem('token', token)
            localStorage.setItem('currentUser', JSON.stringify(userSession))
        } else {
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('currentUser', JSON.stringify(userSession))
        }
        setLoading(false)
        navigate('/profile')
    }

    return (
        <>
        <div className='max-w-2xl mt-20 mb-20 mx-auto p-6 bg-white rounded-4xl shadow-md'>
            <div className='text-center mb-8'>
                <img src='../public/logoowen.svg' alt='Logo' className='mt-6 mx-auto h-50 w-auto mb-10 logo-modify' />
                <h2 className='text-5xl font-extrabold text-gray-900'>เข้าสู่ระบบ</h2>
                <p className='mt-2 text-2xl text-gray-600'>กรอกอีเมลและรหัสผ่านที่เคยลงทะเบียนแล้ว</p>
            </div>
            <form className='space-y-5' onSubmit={handleLogin}>
                <div>
                    <TextField 
                        type='email'
                        label='อีเมล' 
                        name='email' 
                        value={email} 
                        errors={errors.email} 
                        handleChange={handleChange} 
                        placeholder='กรอกอีเมลของคุณ'
                        required={false}
                    />
                </div>
                <div>
                    <TextField 
                        type={showPassword ? 'text' : 'password'}
                        label='รหัสผ่าน' 
                        name='password' 
                        value={password} 
                        errors={errors.password} 
                        handleChange={handleChange} 
                        placeholder='กรอกรหัสผ่าน'
                        required={false}
                        passwordField={showPassword}
                        toggleVisibility={togglePasswordVisibility}
                    />
                </div>
                <div className='flex items-center mb-10'>
                    <input type='checkbox' className='checkbox checkbox-primary' id='rememberMe' checked={remember}
                        onChange={e=>setRemember(e.target.checked)} disabled={loading}/>
                    <label htmlFor='rememberMe' className='ml-2'>จำฉันไว้</label>
                </div>
                {errorMsg && <div className='alert alert-error text-sm'>{errorMsg}</div>}
                <div className='relative'>
                    <button 
                        type='submit'
                        disabled={!email || !password || loading}
                        className={`absolute top-[-6px] right-[-40px] p-[10px] text-[1.2rem] rounded-[15px] ${
                            email && password && !loading
                                ? 'text-white bg-blue-600 hover:bg-gray-500'
                                : 'text-white bg-gray-400 cursor-not-allowed'
                        }`}>
                        {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                    </button>
                </div>
            </form>
            <div className='relative'>
                <ToHomePage />
            </div>
        </div>
        </>
    )
}