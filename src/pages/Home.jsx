import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <div className='max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md my-8'>
        <h1 className='text-center font-bold text-2xl'>Home Page</h1>
        <h2 className='text-center font-medium text-gray-400 text-xl mb-10'>User Management System</h2>
        <Link to='/register'><button className='px-6 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'>Register Page</button></Link>
      </div>
    </div>
  );
}
