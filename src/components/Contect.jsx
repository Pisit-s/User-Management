import { TextAreaField } from './InputComponent'
import {TextField} from './InputComponent'

export default function Contect({handleBlur,handleChange,formData,errors}) {
    return (
        <>
            <div className='p-4 border border-gray-200 rounded-2xl mb-5'>
            <h2 className='text-lg font-semibold mb-4'>ช่องทางติดต่อ</h2>
                <div className='mb-4'>
                    <TextField 
                        type={'email'}
                        label={'อีเมล'} 
                        name={'email'} 
                        value={formData.email} 
                        errors={errors.email} 
                        handleChange={handleChange} 
                        handleBlur={handleBlur} 
                        placeholder={'เช่น example@gmail.com'}
                        required={true}
                    />
                    </div>
                    <div className='mb-4'>
                        <TextField 
                            type={'tel'}
                            label={'เบอร์โทรศัพท์'}
                            name={'phone'} 
                            value={formData.phone} 
                            errors={errors.phone} 
                            handleChange={handleChange} 
                            handleBlur={handleBlur} 
                            placeholder={'เช่น 0812345678'}
                            required={true}
                        />
                    </div>
                    <div className='mb-4'>
                        <TextAreaField
                            label={'ที่อยู่ปัจจุบัน'}
                            name={'address'} 
                            value={formData.address} 
                            errors={errors.address} 
                            handleChange={handleChange} 
                            handleBlur={handleBlur} 
                            placeholder={'เช่น บ้านเลขที่ บ้าน ตำบล อำเภอ จังหวัด ไปรษณีย์'}
                            rows={3}
                            number={formData.address.length}
                            maxNumber={150}
                            required={false}
                        />
                    </div>
                </div>
        </>
    )
}