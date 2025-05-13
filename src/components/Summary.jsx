export default function Summary({formData,handleEdit,handleFinalSubmit,isSubmitting}) {
    return (
        <>
        <div className='max-w-2xl mt-20 mb-20 mx-6 sm:mx-8 md:mx-auto p-6 bg-white rounded-4xl shadow-2xl my-8'>
        <h2 className='text-4xl font-extrabold text-center text-gray-900 mt-10 mb-[160px]'>ตรวจสอบข้อมูลก่อนยืนยัน</h2>
          {formData.avatarUrl && (
                <div className='relative flex justify-center items-center mt-15 mb-10'>
                  <img 
                    src={formData.avatarUrl} 
                    alt='รูปประจำตัว' 
                    className='absolute top-[-120px] w-50 h-50 object-cover rounded-full mx-auto border-8 shadow-2xl border-primary motion-upanddown' 
                  />
                </div>
              ) || (
                <div className='relative flex justify-center items-center mt-15 mb-10'>
                  <img 
                    src='https://gravatar.com/avatar/ff149c5e70ae12dea893526112da679e?s=400&d=mp&r=x' 
                    alt='default' 
                    className='absolute top-[-120px] w-50 h-50 object-cover rounded-full mx-auto border-8 shadow-2xl border-primary motion-upanddown' 
                  />
                </div>
              )}
          <div className='space-y-6'>

            <div className='p-4 border border-gray-200 rounded-2xl'>
              <h2 className='text-lg font-semibold mb-4'>ข้อมูลส่วนตัว</h2>
              <p><strong>ชื่อ-นามสกุล :</strong> {formData.fullName}</p>
              {formData.age && <p><strong>อายุ :</strong> {formData.age}</p>}
              {formData.gender && <p><strong>เพศ :</strong> {formData.gender === 'Male' ? 'ชาย'  : formData.gender === 'Female' ? 'หญิง'  : 'อื่นๆ'}</p>}
            </div>
            
            <div className='p-4 border border-gray-200 rounded-2xl'>
              <h2 className='text-lg font-semibold mb-4'>ข้อมูลติดต่อ</h2>
              <p><strong>อีเมล :</strong> {formData.email}</p>

              {formData.phone && <p><strong>เบอร์โทรศัพท์ :</strong> {formData.phone}</p>}
              {formData.address && <p><strong>ที่อยู่ :</strong> {formData.address}</p>}
            </div>

            <div className='p-4 border border-gray-200 rounded-2xl'>
            <h2 className='text-lg font-semibold mb-4'>ข้อมูลแสดงหน้า Profile</h2>
              <p><strong>ประวัติส่วนตัว :</strong> {formData.bio || '-'}</p>
              <p><strong>ความสนใจ :</strong>
              {formData.interests.length > 0 && (
                <div>
                  <ul className='list-disc pl-5'>
                    {formData.interests.map(interest => (
                      <li key={interest}>{interest}</li>
                    ))}
                  </ul>
                </div> 
              ) || ' -' }</p>
            </div>
            
            <div className='flex justify-between relative'>
              <button
                type='button'
                onClick={handleEdit}
                className='absolute top-0 left-[-40px] p-[10px] text-[1.2rem] text-white bg-gray-500 shadow-2xl rounded-[15px]'
              >
                แก้ไขข้อมูล
              </button>
              
              <button
                type='button'
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className='absolute top-0 right-[-40px] p-[10px] text-[1.2rem] text-white bg-blue-600 shadow-2xl rounded-[15px]'
              >
                {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ยืนยันและลงทะเบียน'}
              </button>
            </div>
          </div>
        </div>
        </>
    )
}