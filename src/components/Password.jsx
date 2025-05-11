import {TextField} from './InputComponent'

export default function Password({handleBlur,handleChange,formData,errors,showPassword,setShowPassword,showConfirmPassword,setShowConfirmPassword}){

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(prev => !prev);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword(prev => !prev);
        }
    };
    
    return (
        <>
            <div className='p-4 border border-gray-200 rounded-2xl mb-5'>
            <h2 className='text-lg font-semibold mb-4'>ตั้งค่ารหัสผ่าน</h2>

                <div className='mb-4'>
                    <TextField 
                        type={showPassword ? 'text' : 'password'}
                        label={'รหัสผ่าน'} 
                        name={'password'} 
                        value={formData.password} 
                        errors={errors.password} 
                        handleChange={handleChange} 
                        handleBlur={handleBlur} 
                        placeholder={'กรอกรหัสผ่าน'}
                        required={true}
                        passwordField={showPassword}
                        toggleVisibility={() => togglePasswordVisibility('password')}
                    />
                </div>

                <div className='mb-4'>
                    <TextField 
                        type={showConfirmPassword ? 'text' : 'password'}
                        label={'ยืนยืนรหัสผ่าน'} 
                        name={'confirmPassword'} 
                        value={formData.confirmPassword} 
                        errors={errors.confirmPassword} 
                        handleChange={handleChange} 
                        handleBlur={handleBlur} 
                        placeholder={'กรอกรหัสผ่านอีกครั้ง'}
                        required={true}  
                        passwordField={showConfirmPassword}
                        toggleVisibility={() => togglePasswordVisibility('confirmPassword')}
                    />
                </div>

            </div>
        </>
    )
}