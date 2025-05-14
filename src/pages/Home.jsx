import { ButtonPages } from '../components/InputComponent'
import logo from '../public/logoowen.svg'

export default function HomePage() {

  const buttons = [
    { label: 'Register Page', path: '/register' },
    { label: 'User Page', path: '/user' },
    { label: 'Login Page', path: '/login'},
    { label: 'Profile Page', path: '/profile'}
  ]

  return (
    <>
        <div className= 'flex items-center justify-center min-h-screen '>
          <div className='max-w-4xl mt-[-250px] mx-auto p-8 bg-white rounded-4xl shadow-md'>
            <img src={logo} alt='Logo' className='mt-6 mx-auto h-50 w-auto mb-10 logo-modify' />
            <h1 className='text-center font-bold text-2xl'>Home Page</h1>
            <h2 className='text-center font-medium text-gray-400 text-xl mb-10'>User Management System</h2>
            <div className='flex justify-center space-x-4'>
              {buttons.map(button => (
                <ButtonPages key={button.label} label={button.label} path={button.path} />
              ))}
            </div>
          </div>
        </div>
    </>
  )
}
