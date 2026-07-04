import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='bg-background min-h-screen flex justify-center items-center p-4 sm:p-8 relative'>
      <div className='w-full max-w-[1100px] h-[85vh] sm:h-[700px] flex flex-col md:flex-row bg-surface rounded-2xl shadow-sm border border-borderColor overflow-hidden relative'>
        
        {/* Text Section (Left on desktop) */}
        <div className='w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center order-2 md:order-1 bg-surface relative z-10'>
            <div className='mb-auto pt-4'>
                <h1 className='text-3xl font-serif font-semibold text-textMain mb-1 tracking-tight'>Smart-Ride</h1>
                <p className='text-xs text-textMuted tracking-[0.2em] uppercase font-medium'>Intelligent Transit</p>
            </div>
            
            <div className='my-auto'>
                <h2 className='text-4xl sm:text-5xl font-serif leading-[1.15] text-textMain mb-6 text-balance'>
                    A journey designed around you.
                </h2>
                <p className='text-lg text-textMuted font-light mb-10 leading-relaxed font-sans'>
                    Experience effortless travel with our intelligent voice AI scheduling. 
                    Step into the future of serene commuting.
                </p>
                
                <Link to='/login' className='block w-full bg-primary hover:bg-primaryHover text-white text-center py-4 rounded-xl font-medium tracking-wide transition shadow-sm'>
                    Get Started
                </Link>
            </div>
        </div>

        {/* Image Section (Right on desktop) */}
        <div className='w-full md:w-1/2 h-[45%] md:h-full bg-inputBg order-1 md:order-2 border-b md:border-b-0 md:border-l border-borderColor'>
            <img src="/landing.png" alt="Smart-Ride Aesthetic View" className='w-full h-full object-cover object-center' />
        </div>
        
      </div>
    </div>
  )
}

export default Start