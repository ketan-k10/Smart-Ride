import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
    const [ finishRidePanel, setFinishRidePanel ] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(function () {
        if (finishRidePanel) { gsap.to(finishRidePanelRef.current, { transform: 'translateY(0)' }) }
        else { gsap.to(finishRidePanelRef.current, { transform: 'translateY(100%)' }) }
    }, [ finishRidePanel ])

    return (
        <div className='h-screen relative flex flex-col justify-end overflow-hidden bg-background text-textMain'>

            {/* Nav */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-full z-30'>
                <div className='bg-surface/90 px-4 py-2 rounded-xl backdrop-blur-md border border-borderColor shadow-sm'>
                    <span className='text-xl font-serif font-semibold tracking-tight text-textMain'>
                        Smart<span className="text-accent">-Ride</span>
                    </span>
                </div>
                <Link to='/captain-home' className='h-11 w-11 bg-surface border border-borderColor flex items-center justify-center rounded-full shadow-sm hover:bg-inputBg transition'>
                    <i className="text-xl ri-logout-box-r-line text-textMain"></i>
                </Link>
            </div>

            {/* Full screen map */}
            <div className='h-screen w-screen fixed top-0 left-0 z-[-1]'>
                <LiveTracking />
            </div>

            {/* Bottom action panel */}
            <div
                className='bg-surface border-t border-borderColor shadow-[0_-10px_40px_rgba(0,0,0,0.08)] p-6 z-20 rounded-t-3xl cursor-pointer'
                onClick={() => setFinishRidePanel(true)}
            >
                <div className='w-10 h-1 bg-borderColor rounded-full mx-auto mb-5'></div>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-xs text-textMuted uppercase tracking-widest mb-1'>Arriving at destination</p>
                        <h4 className='text-lg font-serif font-semibold text-textMain'>4 KM away</h4>
                    </div>
                    <button
                        className='bg-primary hover:bg-primaryHover text-white font-medium py-3 px-8 rounded-xl transition shadow-sm'
                        onClick={(e) => { e.stopPropagation(); setFinishRidePanel(true) }}
                    >
                        Complete Ride
                    </button>
                </div>
            </div>

            {/* Finish Ride Panel */}
            <div ref={finishRidePanelRef} className='fixed w-full z-40 bottom-0 translate-y-full bg-surface border-t border-borderColor shadow-2xl px-6 py-8 pt-12 rounded-t-3xl text-textMain'>
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding