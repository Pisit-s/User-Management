import {ImageLogo} from '../components/Image'
import {CheckBoxInterest} from '../components/CheckBox'

function Register() {
    return (
     <>
        <div className='max-w-2xl mt-20 mb-20 mx-auto p-6 bg-white rounded-4xl shadow-md my-8'>
            <ImageLogo imagePath={'../public/logoowen.svg'} />
            <h1 className='text-5xl font-extrabold text-gray-900 text-center'>ลงทะเบียน</h1>
            <div>
            <label className="block text-sm font-medium mb-2 text-center">ความสนใจ</label>
            {['Coding', 'Gaming', 'Reading', 'Sports'].map(interest => (
                <CheckBoxInterest interest={interest} />
            ))}
            </div>
        </div>
     </>
    )
}

export default Register