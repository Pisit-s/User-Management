import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function Login() {
    return (
        <>
            <div className='max-w-2xl mt-20 mb-20 mx-auto p-6 bg-white rounded-4xl shadow-md my-8'>
                <div className='text-center mb-10'>
                    <img src='../public/logoowen.svg' alt='Logo' className='mt-6 mx-auto h-50 w-auto mb-10 logo-modify' />
                    <h2 className='text-5xl font-extrabold text-gray-900'>Coming Soon...</h2>
                    <p className='mt-2 text-2xl text-red-500 font-bold'>หน้านี้ยังไม่พร้อมใช้งาน</p>

                </div>
                <div className="relative">
                    <Link to='/' className='absolute top-[-5px] left-[-40px] hover:text-gray-500'>
                        <ArrowLeftIcon className='h-12 w-12 text-white bg-blue-600 shadow-2xl hover:bg-gray-500 rounded-[15px]' />
                    </Link>
                </div>
            </div>
        </>
    )
}