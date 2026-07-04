import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: { firstname: firstName, lastname: lastName },
      email: email,
      password: password
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch(err) { console.log(err) }
  }

  return (
    <div className='bg-background min-h-screen flex justify-center items-center py-8 px-4'>
      <div className='max-w-[420px] w-full flex flex-col justify-between bg-surface rounded-2xl shadow-sm border border-borderColor p-10 min-h-[600px]'>
        <div>
          <div className='mb-10'>
            <h1 className='text-3xl font-serif font-semibold text-textMain tracking-tight mb-2'>Create Account</h1>
            <p className='text-textMuted font-light'>Join our intelligent transit network.</p>
          </div>

          <form onSubmit={(e) => submitHandler(e)}>
            <div className='flex gap-4 mb-5'>
              <div className='w-1/2'>
                <label className='block text-sm font-medium mb-1 text-textMain'>First Name</label>
                <input
                  required
                  className='bg-inputBg text-textMain rounded-xl px-4 py-3 border border-borderColor focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-full text-base placeholder:text-textMuted/60 transition shadow-sm'
                  type="text"
                  placeholder='Jane'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className='w-1/2'>
                <label className='block text-sm font-medium mb-1 text-textMain'>Last Name</label>
                <input
                  required
                  className='bg-inputBg text-textMain rounded-xl px-4 py-3 border border-borderColor focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-full text-base placeholder:text-textMuted/60 transition shadow-sm'
                  type="text"
                  placeholder='Doe'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className='mb-5'>
              <label className='block text-sm font-medium mb-2 text-textMain'>Email address</label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-inputBg text-textMain rounded-xl px-4 py-3 border border-borderColor focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-full text-base placeholder:text-textMuted/60 transition shadow-sm'
                type="email"
                placeholder='hello@example.com'
              />
            </div>

            <div className='mb-8'>
              <label className='block text-sm font-medium mb-2 text-textMain'>Password</label>
              <input
                className='bg-inputBg text-textMain rounded-xl px-4 py-3 border border-borderColor focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-full text-base placeholder:text-textMuted/60 transition shadow-sm'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required type="password"
                placeholder='••••••••'
              />
            </div>

            <button className='bg-primary hover:bg-primaryHover text-white font-medium mb-5 rounded-xl px-4 py-3.5 w-full text-base transition shadow-sm'>
              Create account
            </button>
          </form>
          
          <p className='text-center text-textMuted text-sm'>
            Already have an account? <Link to='/login' className='text-textMain font-medium hover:underline underline-offset-4 decoration-borderColor transition'>Log in</Link>
          </p>
        </div>
        
        <div className='mt-8 pt-6 border-t border-borderColor'>
          <p className='text-xs text-textMuted leading-relaxed text-center'>
            By signing up, you agree to our <span className='underline underline-offset-2'>Terms</span> and <span className='underline underline-offset-2'>Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
export default UserSignup