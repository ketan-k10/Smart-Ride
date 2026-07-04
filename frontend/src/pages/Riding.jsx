import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on("ride-ended", () => {
        navigate('/home')
    })

    return (
        <div className='h-screen flex flex-col md:flex-row relative overflow-hidden bg-background text-textMain'>
            
            <div className='flex flex-col h-screen absolute md:relative top-0 w-full md:w-[450px] z-20 pointer-events-none md:pointer-events-auto'>
                
                <Link to='/home' className='fixed md:absolute right-6 md:right-auto md:left-8 top-6 h-11 w-11 bg-surface border border-borderColor flex items-center justify-center rounded-full z-30 shadow-sm hover:bg-inputBg transition pointer-events-auto'>
                    <i className="text-xl ri-home-5-line text-textMain"></i>
                </Link>

                <div className='h-[45%] md:h-full w-full bg-surface shadow-[0_-5px_20px_rgba(0,0,0,0.05)] md:shadow-2xl relative pointer-events-auto md:border-r border-borderColor mt-auto md:pt-28 p-8 flex flex-col justify-between rounded-t-3xl md:rounded-none'>
                    <div>
                        <div className='flex items-center justify-between mb-8'>
                            <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Car" />
                            <div className='text-right'>
                                <h2 className='text-lg font-medium capitalize text-textMain'>{ride?.captain.fullname.firstname}</h2>
                                <h4 className='text-xl font-semibold text-textMain -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                                <p className='text-sm text-textMuted'>Maruti Suzuki Alto</p>
                            </div>
                        </div>

                        <div className='flex gap-2 justify-between flex-col items-center bg-inputBg rounded-2xl p-2 border border-borderColor/50'>
                            <div className='w-full'>
                                <div className='flex items-center gap-5 p-4 border-b border-borderColor'>
                                    <i className="text-xl ri-map-pin-2-fill text-accent"></i>
                                    <div>
                                        <h3 className='text-base font-semibold text-textMain mb-0.5'>Destination</h3>
                                        <p className='text-sm text-textMuted'>{ride?.destination}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-5 p-4'>
                                    <i className="text-xl ri-currency-line text-textMain"></i>
                                    <div>
                                        <h3 className='text-base font-semibold text-textMain mb-0.5'>₹{ride?.fare}</h3>
                                        <p className='text-sm text-textMuted'>Cash</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button className='w-full mt-6 bg-primary hover:bg-primaryHover text-white font-medium p-4 rounded-xl transition text-base shadow-sm'>
                        Make a Payment
                    </button>
                </div>
            </div>

            <div className='h-full w-full md:flex-1 absolute md:relative z-10 top-0 left-0 bg-background'>
                <LiveTracking />
            </div>
            
        </div>
    )
}

export default Riding