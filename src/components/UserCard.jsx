export default function UserCard({paginatedUsers}) {

    return (
        <>
            {paginatedUsers.length === 0 ? (
                        <div className='text-center text-lg text-gray-500 py-8 '>
                            ไม่พบผู้ใช้ที่ตรงกับการค้นหา
                        </div>
                    ) : (
                        paginatedUsers.map(user => (
                            <div key={user.id} className='p-4 border-2 border-gray-200 rounded-4xl'>
                                <div className='flex flex-col md:flex-row md:gap-4'>
                                    {user.avatarUrl && (
                                        <figure className='flex-shrink-0 flex items-center justify-center'>
                                            <img src={user.avatarUrl} alt='avatar' className='w-20 h-20 object-cover rounded-full border-4 border-primary' />
                                        </figure>
                                    ) || (
                                        <figure className='flex-shrink-0 flex items-center justify-center'>
                                            <img src='https://gravatar.com/avatar/ff149c5e70ae12dea893526112da679e?s=400&d=mp&r=x' alt='avatar' className='w-20 h-20 object-cover rounded-full border-4 border-primary' />
                                        </figure>
                                    )}
                                    <div className='flex-1'>
                                        <h2 className='text-2xl font-bold text-blue-700'>{user.name}</h2>
                                        <p className='text-gray-600'><span className='font-bold'>อีเมล:</span> {user.email}</p>
                                        <div className=' break-all mt-2 mb-4'>
                                            <p className='font-bold mb-1 text-gray-700'>Password (hashed)</p>
                                            <code className='block w-full bg-gray-100 rounded-md p-2 text-xs text-gray-500'>
                                                {user.password}
                                            </code>
                                        </div>

                                        <div className='collapse collapse-arrow mt-5 border-3 border-gray-200 rounded-4xl'>
                                            <input type='checkbox' className='peer' />
                                            <div className='collapse-title text-md font-bold'>
                                                ดูรายละเอียดเพิ่มเติม
                                            </div>
                                            <div className='collapse-content text-sm space-y-1'>
                                                {user.phone && <div><span className='font-semibold'>เบอร์:</span> {user.phone}</div>}
                                                {user.age && <div><span className='font-semibold'>อายุ:</span> {user.age}</div>}
                                                {user.gender && <div><span className='font-semibold'>เพศ:</span> {user.gender}</div>}
                                                {user.address && <div><span className='font-semibold'>ที่อยู่:</span> {user.address}</div>}
                                                {user.bio && <div><span className='font-semibold'>ประวัติ:</span> {user.bio}</div>}
                                                {user.interests && Array.isArray(user.interests) && (
                                                    <div>
                                                        <span className='font-semibold'>ความสนใจ:</span> {user.interests.join(', ')}
                                                    </div>
                                                )}
                                                {user.createdAt && (
                                                    <div>
                                                        <span className='font-semibold'>ลงทะเบียนเมื่อ:</span>{' '}
                                                        {new Date(user.createdAt).toLocaleString('th-TH', {
                                                            year: 'numeric', month: 'long', day: '2-digit',
                                                            hour: '2-digit', minute: '2-digit'
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
            )}
        </>
    )
}