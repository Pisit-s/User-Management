import { useState, useEffect } from 'react'
import { ToHomePage } from '../components/InputComponent'
import UserCard from '../components/UserCard'

export default function User() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const USERS_PER_PAGE = 10

    useEffect(() => {
        const usersString = localStorage.getItem('users')
        try {
            const data = usersString ? JSON.parse(usersString) : []
            setUsers(Array.isArray(data) ? data : [])
        } catch {
            setUsers([])
        }
    }, [])

    const filteredUsers = users.filter(user =>
        (user.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(search.toLowerCase())
    )

    const pages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * USERS_PER_PAGE,
        currentPage * USERS_PER_PAGE
    )

    useEffect(() => setCurrentPage(1), [search])

    return (
        <>
            <div className='max-w-2xl mt-20 mb-20 mx-auto p-6 bg-white rounded-4xl shadow-md my-8'>
                <div className='text-center mb-10'>
                    <img src='../public/logoowen.svg' alt='Logo' className='mt-6 mx-auto h-50 w-auto mb-10 logo-modify' />
                    <h2 className='text-5xl font-extrabold text-gray-900'>ข้อมูลผู้ใช้งาน</h2>
                    <p className='mt-2 text-2xl text-gray-600'>ข้อมูลของผู้ลงทะเบียนผ่านระบบ</p>
                </div>

                <div className='flex justify-center mb-6'>
                    <input
                        type='text'
                        className='w-80 p-2 border rounded-4xl'
                        placeholder='ค้นหาชื่อหรืออีเมล'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className='grid gap-6 mb-10'>
                    <UserCard paginatedUsers={paginatedUsers} />
                </div>

                {pages > 1 &&
                    <div className='join flex justify-center my-6'>
                        {[...Array(pages)].map((_, idx) => (
                            <button
                                key={idx}
                                className={`btn join-item ${currentPage === idx + 1 ? 'btn-primary' : ''}`}
                                onClick={() => setCurrentPage(idx + 1)}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                }
                <div className='relative'>
                    <ToHomePage />
                </div>
                
            </div>
        </>
    )
}