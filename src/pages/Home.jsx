import { ButtonPages } from '../components/InputComponent'

export default function HomePage() {

  const buttons = [
    { label: 'Register Page', path: '/register' },
    { label: 'User Page', path: '/user' },
    { label: 'Login Page', path: '/login'},
    { label: 'Profile Page', path: '/profile'}
  ]

  return (
    <>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='max-w-4xl mt-0 mb-20 mx-6 p-6 bg-white rounded-4xl shadow-md'>
            <img src='./logoowen.svg' alt='Logo' className='mt-6 mx-auto h-50 w-auto mb-10 logo-modify' />
            <h1 className='text-center font-bold text-2xl'>Home Page</h1>
            <h2 className='text-center font-medium text-gray-400 text-xl mb-10'>User Management System</h2>
            <div className='space-x-2 flex flex-wrap justify-center'>
              {buttons.map(button => (
                <ButtonPages key={button.label} label={button.label} path={button.path} />
              ))}
            </div>
          </div>
        </div>
    </>
  )
}
