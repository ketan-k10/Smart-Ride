import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email: email,
      password: password,
      vehicle: { color: vehicleColor, plate: vehiclePlate, capacity: vehicleCapacity, vehicleType: vehicleType }
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
    } catch(err) { console.log(err) }
  }

  return (
    <div className='bg-background min-h-[110vh] sm:min-h-screen flex justify-center items-center py-10 px-4'>
      <div className='max-w-[480px] w-full flex flex-col justify-between bg-surface rounded-2xl shadow-sm border border-borderColor p-8 sm:p-10'>
        <div>
          <div className='mb-8'>
            <h1 className='text-3xl font-serif font-semibold text-textMain tracking-tight mb-2'>Register Fleet</h1>
            <p className='text-textMuted font-light'>Join as a Smart-Ride captain.</p>
          </div>

          <form onSubmit={(e) => submitHandler(e)}>
            <h3 className='text-sm font-medium mb-3 text-textMain'>Personal Information</h3>
            <div className='flex gap-4 mb-4'>
              <input required
                className='bg-inputBg text-textMain rounded-xl px-4 py-3 border border-borderColor focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-1/2 text-sm placeholder:text-textMuted/60 transition shadow-sm'
                type="text" placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input required
                className='bg-inputBg text-textMain rounded-xl px-4 py-3 border border-borderColor focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-1/2 text-sm placeholder:text-textMuted/60 transition shadow-sm'
                type="text" placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>

            <div className='mb-4'>
              <input required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className='bg-inputBg text-textMain rounded-xl px-4 py-3 border border-borderColor focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-full text-sm placeholder:text-textMuted/60 transition shadow-sm'
                type="email" placeholder='Email address' />
            </div>

            <div className='mb-8'>
              <input required type="password"
                className='bg-inputBg text-textMain rounded-xl px-4 py-3 border border-borderColor focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-full text-sm placeholder:text-textMuted/60 transition shadow-sm'
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder='Password' />
            </div>

            <h3 className='text-sm font-medium mb-3 text-textMain border-t border-borderColor pt-6'>Vehicle Information</h3>
            <div className='flex gap-4 mb-4'>
              <input required
                className='bg-inputBg text-textMain rounded-xl px-4 py-2.5 border border-borderColor focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-1/2 text-sm placeholder:text-textMuted/60'
                type="text" placeholder='Color (e.g. Silver)' value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} />
              <input required
                className='bg-inputBg text-textMain rounded-xl px-4 py-2.5 border border-borderColor focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-1/2 text-sm placeholder:text-textMuted/60'
                type="text" placeholder='License Plate' value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} />
            </div>
            <div className='flex gap-4 mb-8'>
              <input required
                className='bg-inputBg text-textMain rounded-xl px-4 py-2.5 border border-borderColor focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-1/2 text-sm placeholder:text-textMuted/60'
                type="number" placeholder='Capacity (seats)' value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} />
              <select required
                className='bg-inputBg text-textMain rounded-xl px-4 py-2.5 border border-borderColor focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none w-1/2 text-sm'
                value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                <option value="" disabled>Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>

            <button className='bg-primary hover:bg-primaryHover text-white font-medium mb-5 rounded-xl px-4 py-3.5 w-full text-base transition shadow-sm'>
              Submit Application
            </button>
          </form>
          <p className='text-center text-textMuted text-sm'>
            Already a captain? <Link to='/captain-login' className='text-textMain font-medium hover:underline underline-offset-4 decoration-borderColor transition'>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default CaptainSignup