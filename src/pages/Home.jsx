import { ButtonPages } from '../components/InputComponent'

export default function HomePage() {

  const buttons = [
    { label: 'Register Page', path: '/register' },
    { label: 'User Page', path: '/user' }
  ]

  return (
    <div>
      <div className='max-w-2xl mt-20 mb-20 mx-auto p-6 bg-white rounded-4xl shadow-md my-8'>
        <h1 className='text-center font-bold text-2xl'>Home Page</h1>
        <h2 className='text-center font-medium text-gray-400 text-xl mb-10'>User Management System</h2>
        <div className='flex justify-center space-x-4'>
          {buttons.map(button => (
            <ButtonPages key={button.label} label={button.label} path={button.path} />
          ))}
        </div>
      </div>
    </div>
  )
}
