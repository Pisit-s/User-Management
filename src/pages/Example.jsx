import { useState, useEffect } from 'react';

const Register = () => {
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
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Handle input changes
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

  // Validate field on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldErrors = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      ...fieldErrors
    }));
  };

  // Validate form fields
  const validateField = (name, value) => {
    const newErrors = {};
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          newErrors.fullName = 'กรุณากรอกชื่อ-นามสกุล';
        } else if (value.trim().length < 3) {
          newErrors.fullName = 'ชื่อ-นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'กรุณากรอกอีเมล';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
        } else {
          // Check if email already exists
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          if (users.some(user => user.email === value)) {
            newErrors.email = 'อีเมลนี้มีผู้ใช้งานแล้ว';
          }
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors.password = 'กรุณากรอกรหัสผ่าน';
        } else if (value.length < 6) {
          newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
        }
        
        // Check confirm password match if it exists
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
        }
        break;
        
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
        }
        break;
        
      case 'phone':
        if (value && !/^0\d{9}$/.test(value)) {
          newErrors.phone = 'เบอร์โทรศัพท์ต้องอยู่ในรูปแบบ 0xxxxxxxxx';
        }
        break;
        
      case 'age':
        if (value && (isNaN(value) || parseInt(value) < 18)) {
          newErrors.age = 'อายุต้องมากกว่าหรือเท่ากับ 18 ปี';
        }
        break;
        
      case 'bio':
        if (value && value.length > 150) {
          newErrors.bio = 'ประวัติส่วนตัวต้องไม่เกิน 150 ตัวอักษร';
        }
        break;
        
      default:
        break;
    }
    
    return newErrors;
  };

  // Validate entire form
  const validateForm = () => {
    const formErrors = {};
    
    // Validate each field
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'fullName' || key === 'email' || key === 'password' || key === 'confirmPassword') {
        const fieldErrors = validateField(key, value);
        Object.assign(formErrors, fieldErrors);
      }
    });
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Hash password (simple implementation - in production use a proper library)
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('กรุณาแก้ไขข้อผิดพลาดในแบบฟอร์ม');
      return;
    }
    
    // Show summary instead of submitting
    setShowSummary(true);
  };

  // Handle final submission
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Hash password
      const hashedPassword = await hashPassword(formData.password);
      
      // Create user object
      const newUser = {
        id: Date.now().toString(),
        name: formData.fullName,
        email: formData.email,
        password: hashedPassword,
        phone: formData.phone || null,
        age: formData.age ? parseInt(formData.age) : null,
        gender: formData.gender || null,
        address: formData.address || null,
        avatarUrl: formData.avatarUrl || null,
        interests: formData.interests,
        bio: formData.bio || null,
        createdAt: new Date().toISOString()
      };
      
      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Add new user and save to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Show success message
      alert('ลงทะเบียนสำเร็จ!');
      
      // Reset form
      setFormData({
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
      
      // Reset to form view
      setShowSummary(false);
      
      // Instead of navigating, just show a message
      alert('คุณสามารถไปที่หน้าเข้าสู่ระบบได้แล้ว');
    } catch (error) {
      console.error('Registration error:', error);
      alert('การลงทะเบียนล้มเหลว โปรดลองอีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit (return to form)
  const handleEdit = () => {
    setShowSummary(false);
  };

  // Check form validity on data change
  useEffect(() => {
    const requiredFields = ['fullName', 'email', 'password', 'confirmPassword'];
    const hasRequiredFields = requiredFields.every(field => formData[field].trim() !== '');
    const hasNoErrors = Object.keys(errors).length === 0;
    
    setIsFormValid(hasRequiredFields && hasNoErrors);
  }, [formData, errors]);

  if (showSummary) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md my-8">
        <h1 className="text-2xl font-bold mb-6 text-center">ตรวจสอบข้อมูลของคุณ</h1>
        
        <div className="space-y-6">
          {/* Personal Information Summary */}
          <div className="p-4 border border-gray-200 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">ข้อมูลส่วนตัว</h2>
            <p><strong>ชื่อ-นามสกุล:</strong> {formData.fullName}</p>
            {formData.age && <p><strong>อายุ:</strong> {formData.age}</p>}
            {formData.gender && <p><strong>เพศ:</strong> {formData.gender === 'Male' ? 'ชาย' : formData.gender === 'Female' ? 'หญิง' : 'อื่นๆ'}</p>}
          </div>
          
          {/* Contact Information Summary */}
          <div className="p-4 border border-gray-200 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">ข้อมูลติดต่อ</h2>
            <p><strong>อีเมล:</strong> {formData.email}</p>
            {formData.phone && <p><strong>เบอร์โทรศัพท์:</strong> {formData.phone}</p>}
            {formData.address && <p><strong>ที่อยู่:</strong> {formData.address}</p>}
          </div>
          
          {/* Profile Information Summary */}
          <div className="p-4 border border-gray-200 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">ข้อมูล Profile</h2>
            {formData.avatarUrl && (
              <div className="mb-4">
                <p><strong>รูปประจำตัว:</strong></p>
                <img 
                  src={formData.avatarUrl} 
                  alt="รูปประจำตัว" 
                  className="w-20 h-20 object-cover rounded-full"
                  onError={(e) => {e.target.src = "https://via.placeholder.com/150"; e.target.alt = "URL ไม่ถูกต้อง"}}
                />
              </div>
            )}
            {formData.bio && <p><strong>ประวัติส่วนตัว:</strong> {formData.bio}</p>}
            {formData.interests.length > 0 && (
              <div>
                <p><strong>ความสนใจ:</strong></p>
                <ul className="list-disc pl-5">
                  {formData.interests.map(interest => (
                    <li key={interest}>{interest}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleEdit}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400"
            >
              แก้ไขข้อมูล
            </button>
            
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ยืนยันและลงทะเบียน'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mt-20 mb-20 mx-auto p-6 bg-white rounded-4xl shadow-md my-8">
    <div className="text-center mb-10">
          <img src="../public/logoowen.svg" alt="Workflow" className="mt-6 mx-auto h-50 w-auto mb-10" />
          <h2 className="text-5xl font-extrabold text-gray-900">ลงทะเบียน</h2>
          <p className="mt-2 text-2xl text-gray-600">กรุณากรอกข้อมูลเพื่อสร้างบัญชี</p>
        </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="p-4 border border-gray-200 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">ข้อมูลส่วนตัว</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              ชื่อ - นามสกุล <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded-2xl ${errors.fullName ? 'border-red-500' : 'border-gray-300 bg-gray-100'}`}
              placeholder="เช่น Pisit Srichumnart"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">อายุ</label>
              <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded-2xl ${errors.age ? 'border-red-500' : 'border-gray-300 bg-gray-100'}`}
              placeholder="มากกว่า 18 ปีขึ้นไป"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>
            
          <div>
            <label className="block text-sm font-medium mb-1">เพศ</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 bg-gray-100 rounded-2xl"
            >
              <option value="">เลือกเพศ</option>
              <option value="Male">ชาย</option>
              <option value="Female">หญิง</option>
              <option value="Other">อื่นๆ</option>
            </select>
          </div>
        </div>
      </div>
        
      {/* Contact Information Section */}
      <div className="p-4 border border-gray-200 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">ช่องทางติดต่อ</h2>
          
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            อีเมล <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-2xl ${errors.email ? 'border-red-500' : 'border-gray-300 bg-gray-100'}`}
            placeholder="เช่น example@gmail.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
          
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">เบอร์โทรศัพท์</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-2xl ${errors.phone ? 'border-red-500' : 'border-gray-300 bg-gray-100'}`}
            placeholder="เช่น 0812345678"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
          
        <div>
          <label className="block text-sm font-medium mb-1">ที่อยู่ปัจจุบัน</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 bg-gray-100 rounded-2xl"
            rows="3"
            placeholder="เช่น บ้านเลขที่ หมูบ้าน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"
          ></textarea>
        </div>
      </div>
        
      {/* Account Security Section */}
      <div className="p-4 border border-gray-200 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">ความปลอดภัยของบัญชี</h2>
          
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            รหัสผ่าน <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded-2xl ${errors.password ? 'border-red-500' : 'border-gray-300 bg-gray-100'}`}
              placeholder="กรุณากรอกรหัสผ่าน"
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "ซ่อน" : "แสดง"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
          
        <div>
          <label className="block text-sm font-medium mb-1">
            ยืนยันรหัสผ่าน <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-2xl ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 bg-gray-100'}`}
            placeholder="กรุณากรอกรหัสผ่านอีกครั้ง"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
      </div>
        
      {/* Profile Information Section */}
      <div className="p-4 border border-gray-200 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">ข้อมูลแสดงหน้า Profile</h2>
          
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">URL รูปประจำตัว</label>
          <input
            type="url"
            name="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 bg-gray-100 rounded-2xl"
            placeholder="กรอก URL ของรูปภาพ"
          />
        </div>
          
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">ประวัติส่วนตัว</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-2xl ${errors.bio ? 'border-red-500' : 'border-gray-300 bg-gray-100'}`}
            rows="3"
            placeholder="เขียนประวัติส่วนตัว (ไม่เกิน 150 ตัวอักษร)"
          ></textarea>
          {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
          <p className="text-sm text-gray-500 mt-1">{formData.bio.length}/150 ตัวอักษร</p>
        </div>
          
        <div>
          <label className="block text-sm font-medium mb-2">ความสนใจ</label>
          <div className="space-y-2">
            {['Coding', 'Gaming', 'Reading', 'Sports'].map(interest => (
              <div key={interest} className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    id={interest}
                    name="interests"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">{interest}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
        
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => {
            setFormData({
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
            setErrors({});
          }}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400"
        >
          ล้างฟอร์ม
        </button>
          
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`px-6 py-2 rounded-2xl ${
            isFormValid && !isSubmitting
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
        </button>
      </div>
    </form>
  </div>
  );
};

export default Register;