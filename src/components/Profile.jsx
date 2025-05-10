import {TextField,TextAreaField,CheckBoxInterest} from './InputComponent'

export default function Profile({handleBlur,handleChange,formData,errors}) {

    const interests = ['Coding', 'Gaming', 'Reading', 'Sports']

    return (
        <>
        <div className='p-4 border border-gray-200 rounded-2xl mb-5'>
            <h2 className='text-lg font-semibold mb-4'>ข้อมูลแสดงหน้า Profile</h2>

            <div className='mb-4'>
                <TextField 
                    type={'url'}
                    label={'URL รูปภาพ'} 
                    name={'avatarUrl'} 
                    value={formData.avatarUrl} 
                    errors={errors.avatarUrl} 
                    handleChange={handleChange} 
                    handleBlur={handleBlur} 
                    placeholder={'กรอก URL ของภาพ'}
                    required={false}
                />
            </div>

            <div className='mb-4'>
                <TextAreaField 
                    label={'ประวัติส่วนตัว'} 
                    name={'bio'} 
                    value={formData.bio} 
                    errors={errors.bio} 
                    handleChange={handleChange} 
                    handleBlur={handleBlur} 
                    placeholder={'ประวัติส่วนตัว (ไม่เกิน 150 อักษร)'}
                    rows={3}
                    number={formData.bio.length}
                    maxNumber={150}
                    required={false}
                />
            </div>
            
            <label className='block text-sm font-medium mb-1'>ความสนใจ</label>
            {interests.map(interest => (
                <CheckBoxInterest 
                    interest={interest}
                    name={'interests'}
                    type={'checkbox'}
                    formData={formData}
                    handleChange={handleChange}
                />
            ))}

        </div>
        </>
    )
}

