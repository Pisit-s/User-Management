export function TextField({ label,type,name,value,errors,handleChange,handleBlur, placeholder}) {
    return (
        <>
        <label className="block text-sm font-medium mb-1">
          {label} <span className="text-red-500">*</span>
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-2 border rounded-2xl ${errors ? 'border-red-500' : 'border-gray-300 bg-gray-100'}`}
          placeholder={placeholder}
        />
        {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
        </>
      )
  }

  export function TextAreaField({ label,name,value,errors,handleChange,handleBlur, placeholder,rows,number}) {
    return (
      <>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-2 border rounded-2xl ${errors.bio ? 'border-red-500' : 'border-gray-300 bg-gray-100'}`}
          rows={rows}
          placeholder={placeholder}
          ></textarea>
            {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
          <p className="text-sm text-gray-500 mt-1">{number}/150 ตัวอักษร</p>
      </>
    )
  }

  export function DropdownField({label,name,formData,handleChange,defaultLabel,errors,options}) {

    return (
      <>
        <label className="block text-sm font-medium mb-1">{label}</label>
          <select
            name={name}
            value={formData.gender}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 bg-gray-100 rounded-2xl'>
              <option value="">{defaultLabel}</option>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
      </>
    )
  }

  export function CheckBoxInterest ({interest,name,type}) {
    return (
        <>
          <div className="space-y-2">
              <div key={interest} className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type={type}
                    id={interest}
                    name={name}
                    value={interest}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">{interest}</span>
                </label>
              </div>
          </div>
        </>
    )
}
