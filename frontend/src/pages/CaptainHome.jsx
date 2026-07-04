import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {
    const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)
    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ ride, setRide ] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        socket.emit('join', { userId: captain._id, userType: 'captain' })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: { ltd: position.coords.latitude, lng: position.coords.longitude }
                    })
                })
            }
        }
        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()
    }, [])

    socket.on('new-ride', (data) => {
        setRide(data)
        setRidePopupPanel(true)
    })

    async function confirmRide() {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride._id,
            captainId: captain._id,
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)
    }

    useGSAP(function () {
        if (ridePopupPanel) { gsap.to(ridePopupPanelRef.current, { transform: 'translateY(0)' }) } 
        else { gsap.to(ridePopupPanelRef.current, { transform: 'translateY(100%)' }) }
    }, [ ridePopupPanel ])

    useGSAP(function () {
        if (confirmRidePopupPanel) { gsap.to(confirmRidePopupPanelRef.current, { transform: 'translateY(0)' }) } 
        else { gsap.to(confirmRidePopupPanelRef.current, { transform: 'translateY(100%)' }) }
    }, [ confirmRidePopupPanel ])

    return (
        <div className='h-screen flex flex-col md:flex-row relative overflow-hidden bg-background text-textMain'>
            
            <div className='flex flex-col h-screen absolute md:relative top-0 w-full md:w-[450px] z-20 pointer-events-none md:pointer-events-auto md:border-r border-borderColor shadow-[10px_0_30px_rgba(0,0,0,0.03)]'>
                
                <div className='fixed md:absolute p-6 md:p-8 top-0 flex items-center justify-between w-full md:w-[450px] pointer-events-auto z-30'>
                    <div className='bg-surface/90 px-4 py-2 rounded-xl backdrop-blur-md border border-borderColor shadow-sm'>
                        <span className='text-2xl font-serif font-semibold tracking-tight text-textMain'>
                            Smart<span className="text-accent">-Ride</span>
                        </span>
                    </div>
                    <Link to='/captain-login' className='h-11 w-11 bg-surface border border-borderColor flex items-center justify-center rounded-full text-textMain shadow-sm transition hover:bg-inputBg'>
                        <i className="text-xl ri-logout-box-r-line"></i>
                    </Link>
                </div>

                <div className='h-[45%] md:h-full w-full bg-surface relative pointer-events-auto mt-auto md:mt-24 p-8 flex flex-col rounded-t-3xl md:rounded-none shadow-[0_-15px_30px_rgba(0,0,0,0.05)] md:shadow-none border-t md:border-t-0 border-borderColor'>
                    <CaptainDetails />
                </div>
            </div>

            <div className='h-full w-full md:flex-1 absolute md:relative z-10 top-0 left-0 bg-background'>
                <img className='h-full w-full object-cover opacity-80' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Radar Map" />
            </div>

            <div ref={ridePopupPanelRef} className='fixed md:absolute w-full md:w-[450px] md:left-0 z-40 bottom-0 translate-y-full bg-surface border-t md:border-r border-borderColor shadow-2xl px-6 py-8 pt-12 md:rounded-tr-2xl text-textMain'>
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>
            
            <div ref={confirmRidePopupPanelRef} className='fixed md:absolute w-full md:w-[450px] md:left-0 h-screen md:h-[90vh] z-50 bottom-0 translate-y-full bg-surface border-t md:border-r border-borderColor shadow-2xl px-6 py-8 pt-12 md:rounded-tr-2xl text-textMain overflow-y-auto'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    )
}

export default CaptainHome