import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const Captainlogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = { email, password }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
      if (response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
    } catch(err) { console.log(err) }
  }

  return (
    <div className='bg-background min-h-screen flex justify-center items-center py-8 px-4'>
      <div className='max-w-[420px] w-full flex flex-col justify-between bg-surface rounded-2xl shadow-sm border border-borderColor p-10 min-h-[600px]'>
        <div>
          <div className='mb-12'>
            <h1 className='text-3xl font-serif font-semibold text-textMain tracking-tight mb-2'>Captain Portal</h1>
            <p className='text-textMuted font-light'>Enter your credentials to manage rides.</p>
          </div>

          <form onSubmit={(e) => submitHandler(e)}>
            <div className='mb-5'>
              <label className='block text-sm font-medium mb-2 text-textMain'>Email address</label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-inputBg text-textMain rounded-xl px-4 py-3 border border-borderColor focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-full text-base placeholder:text-textMuted/60 transition shadow-sm'
                type="email"
                placeholder='captain@example.com'
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
              Sign in as Captain
            </button>
          </form>
          
          <p className='text-center text-textMuted text-sm'>
            Want to drive with us? <Link to='/captain-signup' className='text-textMain font-medium hover:underline underline-offset-4 decoration-borderColor transition'>Register</Link>
          </p>
        </div>
        
        <div className='mt-10 pt-6 border-t border-borderColor'>
          <Link
            to='/login'
            className='flex items-center justify-center text-textMain bg-white border border-borderColor hover:bg-inputBg font-medium rounded-xl px-4 py-3.5 w-full text-sm transition shadow-sm'
          >Sign in as Rider</Link>
        </div>
      </div>
    </div>
  )
}
export default Captainlogin