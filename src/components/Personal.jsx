import {TextField,DropdownField} from './InputText'

export default function Personal({handleBlur,handleChange,formData,errors}) {

    const options = [
        { value: 'Male', label: 'ชาย' },
        { value: 'Female', label: 'หญิง' },
        { value: 'Other', label: 'อื่นๆ' }
      ];

    return (
        <>
        <div className="p-4 border border-gray-200 rounded-2xl mb-5">
          <h2 className="text-lg font-semibold mb-4">ข้อมูลส่วนตัว</h2>
          <div className="mb-4">
            <TextField 
                type={'text'}
                label={'ชื่อ - นามสกุล'} 
                name={'fullName'} 
                value={formData.fullName} 
                errors={errors.fullName} 
                handleChange={handleChange} 
                handleBlur={handleBlur} 
                placeholder={'เช่น Pisit Srichumnart'} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <TextField
                type={'number'}
                label={'อายุ'} 
                name={'age'} 
                value={formData.age} 
                errors={errors.age} 
                handleChange={handleChange} 
                handleBlur={handleBlur} 
                placeholder={'มากกว่า 18 ปี'} 
              />
            </div>            
            <div>
              <DropdownField 
                label={'เพศ'} 
                formData={formData} 
                handleChange={handleChange} 
                defaultLabel={'เลือกเพศ'}
                errors={errors.gender}
                options={options}
              />
            </div>
          </div>
        </div>
        </>
    )
}