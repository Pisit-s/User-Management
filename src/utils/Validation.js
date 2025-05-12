export function validateField(name, value, formData = {}) {
    const newErrors = {}
  
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          newErrors.fullName = 'กรุณากรอกชื่อ - นามสกุล'
        } else if (value.trim().length < 3) {
          newErrors.fullName = 'ชื่อ - นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร'
        }
        break
  
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'กรุณากรอกอีเมล'
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง'
        } else {
          const users = JSON.parse(localStorage.getItem('users') || '[]')
          if (users.some(user => user.email === value)) {
            newErrors.email = 'อีเมลนี้มีผู้ใช้งานแล้ว'
          }
        }
        break
  
      case 'password':
        if (!value) {
          newErrors.password = 'กรุณากรอกรหัสผ่าน'
        } else if (value.length < 6) {
          newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
        }
  
        if (formData.confirmPassword && formData.confirmPassword.length > 0) {
          if (value !== formData.confirmPassword) {
            newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน'
          }
        }
        break
  
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน'
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน'
        }
        break
  
      case 'phone':
        if (!value.trim()) {
          newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์มือถือ'
        }
        else if (value && !/^0\d{9}$/.test(value)) {
          newErrors.phone = 'เบอร์โทรศัพท์ต้องอยู่ในรูปแบบ 0xxxxxxxxx'
        } else {
          const users = JSON.parse(localStorage.getItem('users') || '[]')
          if (users.some(user => user.phone === value)) {
            newErrors.phone = 'เบอร์โทรศัพท์นี้มีผู้ใช้งานแล้ว'
          }
        }
        break
  
      case 'age':
        if (!value.trim()) {
          newErrors.age = 'กรุณากรอกอายุ'
        }
        else if (value && (isNaN(value) || parseInt(value) < 18)) {
          newErrors.age = 'อายุต้องมากกว่าหรือเท่ากับ 18 ปี'
        }
        break

      case 'gender':
        if (!value) {
          newErrors.gender = 'กรุณาเลือกเพศ'
        }
        break
  
      case 'bio':
        if (value && value.length > 150) {
          newErrors.bio = 'ประวัติส่วนตัวต้องไม่เกิน 150 ตัวอักษร'
        }
        break
  
      default:
        break
    }
  
    return newErrors
  }

export function validateForm(formData) {
    const errors = {}
  
      Object.entries(formData).forEach(([key, value]) => {
      const fieldErrors = validateField(key, value, formData)
      Object.assign(errors, fieldErrors)
    })
  
    return errors
  }