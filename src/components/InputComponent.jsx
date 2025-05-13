import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export function TextField({ label,type,name,value,errors,handleChange,handleBlur, placeholder,required,passwordField,toggleVisibility}) {
    return (
        <>
        <label className='block text-sm font-medium mb-1'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
        <div className='relative'>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-2 border rounded-2xl ${errors ? 'border-red-500' : 'border-gray-300 bg-gray-100'}`}
          placeholder={placeholder}
        />
        {(name === 'password' || name === 'confirmPassword') && toggleVisibility && (
          <button
            type='button'
            className='absolute right-2 top-2 text-gray-500 font-bold'
            onClick={(e) => {
              e.preventDefault()
              toggleVisibility()
            }}
          >
            {passwordField ? 'ซ่อน' : 'แสดง'}
          </button>
        )}
        </div>
          {errors && <p className='text-red-500 text-sm mt-1'>{errors}</p>}
        </>
      )
  }


  export function TextAreaField({ label,name,value,errors,handleChange,handleBlur, placeholder,rows,number,maxNumber,required}) {
    return (
      <>
        <label className='block text-sm font-medium mb-1'>{label} {required && <span className='text-red-500'>*</span>}</label>
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-2 border rounded-2xl ${errors ? 'border-red-500' : 'border-gray-300 bg-gray-100'}`}
          rows={rows}
          placeholder={placeholder}
          ></textarea>
            {errors && <p className='text-red-500 text-sm mt-1'>{errors}</p>}
          <p className='text-sm text-gray-500 mt-1'>{number}/{maxNumber} ตัวอักษร</p>
      </>
    )
  }

  export function DropdownField({label,name,value,handleChange,handleBlur,defaultLabel,errors,options,required}) {

    return (
      <>
        <label className='block text-sm font-medium mb-1'>{label} {required && <span className='text-red-500'>*</span>}</label>
          <select
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className='w-full p-2 border border-gray-300 bg-gray-100 rounded-2xl'>
              <option value=''>{defaultLabel}</option>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors && <p className='text-red-500 text-sm mt-1'>{errors}</p>}
      </>
    )
  }

  export function CheckBoxInterest ({interest,name,type,formData,handleChange}) {
    return (
        <>
          <div className='space-y-2'>
              <div key={interest} className='form-control'>
                <label className='label cursor-pointer justify-start gap-2'>
                  <input
                    type={type}
                    id={interest}
                    name={name}
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleChange}
                    className='checkbox checkbox-primary'
                  />
                  <span className='label-text'>{interest}</span>
                </label>
              </div>
          </div>
        </>
    )
}

export function ButtonPages ({label,path}) {
  return (
    <>
      <Link to={path}><button className='px-6 py-2 bg-blue-600 text-white rounded-2xl hover:bg-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed'>{label}</button></Link>
    </>
  )
}

export function ToHomePage() {
  return (
    <>
          <Link to='/' className='absolute top-[-5px] left-[-40px] hover:text-gray-500'>
            <ArrowLeftIcon className='h-12 w-12 text-white bg-blue-600 shadow-2xl hover:bg-gray-500 rounded-[15px]' />
          </Link>
    </>
  )
}