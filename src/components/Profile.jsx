import {TextField,TextAreaField,CheckBoxInterest} from './InputText'

export default function Profile({handleBlur,handleChange,formData,errors}) {

    const interests = ['Coding', 'Gaming', 'Reading', 'Sports']

    return (
        <>
        <div className='p-4 border border-gray-200 rounded-2xl mb-5'>
            <h2 className='text-lg font-semibold mb-4'>ข้อมูลแสดงหน้า Profile</h2>
            
            <label className='block text-sm font-medium mb-1'>ความสนใจ</label>
            {interests.map(interest => (
                <CheckBoxInterest interest={interest} />
            ))}

        </div>
        </>
    )
}