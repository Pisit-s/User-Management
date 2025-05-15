import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ToHomePage } from '../components/InputComponent'
import { getToken } from '../utils/Token'

export default function Profile() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const { token, currUser } = getToken()
        if (!token || !currUser) {
            navigate('/login', { replace: true })
        } else {
            try {
                const curr = JSON.parse(currUser)
                let users = localStorage.getItem('users')
                if (users) users = JSON.parse(users)
                let fullUser = null
                if (Array.isArray(users)) {
                    fullUser = users.find(u => u.id === curr.id)
                } else if (users && users.id === curr.id) {
                    fullUser = users
                }
                setUser(fullUser || curr)
            } catch {
                setUser(null)
                navigate('/login', { replace: true })
            }
        }
    }, [navigate])

    if (!user) return null

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('currentUser')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('currentUser')
        navigate('/login')
    }
    return (
        <>
        <div className='flex items-center justify-center min-h-screen'>
            <div className='max-w-2xl mt-20 mb-20 mx-6 p-6 bg-white rounded-4xl shadow-md'>
            <div className='flex flex-col items-center relative'>
                <img
                    src={user.avatarUrl || 'https://gravatar.com/avatar/ff149c5e70ae12dea893526112da679e?s=400&d=mp&r=x'}
                    alt='avatar'
                    className='absolute top-[-100px] rounded-full  w-50 h-50 object-cover mb-4 border-1 border-white'
                />
                <div className='font-bold text-2xl mb-1 mt-35'>{user.name || '-'}</div>
                <div className='text-gray-500 mb-1'>อีเมล: <span className='text-gray-800'>{user.email || '-'}</span></div>
                <div className='text-gray-500 mb-4'>เบอร์โทรศัพท์: <span className='text-gray-800'>{user.phone || '-'}</span></div>
                <div className='text-gray-700 bg-gray-200 rounded-2xl p-5 mb-8 w-full max-w-xl'>{user.bio || '-'}</div>
                
                <div className=' rounded-4xl border border-gray-200 p-6 w-full max-w-xl mb-8'>
                    <div className='flex flex-row mb-3'>
                        <div className='min-w-[120px] text-gray-500 text-sm'>อายุ</div>
                        <div>{user.age ?? '-'}</div>
                    </div>
                    <div className='flex flex-row mb-3'>
                        <div className='min-w-[120px] text-gray-500 text-sm'>เพศ</div>
                        <div>{user.gender || '-'}</div>
                    </div>
                    <div className='flex flex-row mb-3'>
                        <div className='min-w-[120px] text-gray-500 text-sm'>ที่อยู่</div>
                        <div>{user.address || '-'}</div>
                    </div>
                    <div className='flex flex-row mb-3'>
                        <div className='min-w-[120px] text-gray-500 text-sm'>วันที่สมัคร</div>
                        <div>
                            {user.createdAt
                                ? new Date(user.createdAt).toLocaleString('th-TH', {
                                    year: 'numeric', month: 'short', day: 'numeric',
                                    hour: '2-digit', minute: '2-digit'
                                })
                                : '-'}
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='min-w-[120px] text-gray-500 text-sm'>ความสนใจ</div>
                        <div className='flex flex-wrap gap-2'>
                            {Array.isArray(user.interests) && user.interests.length > 0
                                ? user.interests.map((it, idx) => (
                                    <span key={idx} className='badge badge-primary badge-outline'>{it}</span>
                                ))
                                : '-'}
                        </div>
                    </div>
                </div>

            </div>
            <div className='relative'>
                <button className='absolute top-[-6px] right-[-40px] p-[10px] text-[1.2rem] font-bold rounded-4xl bg-white border-3 border-red-400 text-red-400 w-40 mb-5 hover:bg-red-500 hover:border-white hover:text-white' onClick={handleLogout}>
                    ออกจากระบบ
                </button>
                <ToHomePage />
            </div>
        </div>
        </div>
        </>
    )
}