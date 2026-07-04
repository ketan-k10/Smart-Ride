import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
    const [ panelOpen, setPanelOpen ] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [ vehiclePanel, setVehiclePanel ] = useState(false)
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
    const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [ fare, setFare ] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
    const [ ride, setRide ] = useState(null)

    const navigate = useNavigate()
    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ])

    socket.on('ride-confirmed', ride => {
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } })
    })

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setPickupSuggestions(response.data)
        } catch {}
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setDestinationSuggestions(response.data)
        } catch {}
    }

    const submitHandler = (e) => { e.preventDefault() }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, { height: '70%', padding: 24 })
            gsap.to(panelCloseRef.current, { opacity: 1 })
        } else {
            gsap.to(panelRef.current, { height: '0%', padding: 0 })
            gsap.to(panelCloseRef.current, { opacity: 0 })
        }
    }, [ panelOpen ])

    useGSAP(function () {
        if (vehiclePanel) { gsap.to(vehiclePanelRef.current, { transform: 'translateY(0)' }) } 
        else { gsap.to(vehiclePanelRef.current, { transform: 'translateY(100%)' }) }
    }, [ vehiclePanel ])

    useGSAP(function () {
        if (confirmRidePanel) { gsap.to(confirmRidePanelRef.current, { transform: 'translateY(0)' }) } 
        else { gsap.to(confirmRidePanelRef.current, { transform: 'translateY(100%)' }) }
    }, [ confirmRidePanel ])

    useGSAP(function () {
        if (vehicleFound) { gsap.to(vehicleFoundRef.current, { transform: 'translateY(0)' }) } 
        else { gsap.to(vehicleFoundRef.current, { transform: 'translateY(100%)' }) }
    }, [ vehicleFound ])

    useGSAP(function () {
        if (waitingForDriver) { gsap.to(waitingForDriverRef.current, { transform: 'translateY(0)' }) } 
        else { gsap.to(waitingForDriverRef.current, { transform: 'translateY(100%)' }) }
    }, [ waitingForDriver ])


    async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setFare(response.data)
    }

    async function createRide() {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
    }

    return (
        <div className='h-screen flex md:flex-row relative overflow-hidden bg-background text-textMain'>
            
            {/* Navigation & Panels Container */}
            <div className='flex flex-col justify-end md:justify-start h-screen absolute md:relative top-0 left-0 w-full md:w-[450px] z-20 pointer-events-none md:pointer-events-auto'>
                <div className='h-[30%] md:h-auto md:flex-grow flex flex-col bg-surface shadow-2xl relative pointer-events-auto md:border-r border-borderColor overflow-hidden'>
                    
                    <div className='hidden md:block p-8 pb-4'>
                        <h4 className='text-3xl font-serif font-semibold tracking-tight text-textMain'>
                            Smart<span className="text-accent">-Ride</span>
                        </h4>
                    </div>

                    <h5 ref={panelCloseRef} onClick={() => { setPanelOpen(false) }} className='absolute opacity-0 right-6 top-6 text-2xl text-textMain cursor-pointer md:block p-2'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    
                    <div className='p-8 pt-4'>
                        <h4 className='text-2xl font-serif font-medium mb-6 text-textMain'>Where to?</h4>
                        <form className='relative py-2' onSubmit={(e) => submitHandler(e)}>
                            <div className="line absolute h-14 w-0.5 top-[50%] -translate-y-1/2 left-5 bg-textMuted rounded-full hidden md:block"></div>
                            <input
                                onClick={() => { setPanelOpen(true); setActiveField('pickup') }}
                                value={pickup}
                                onChange={handlePickupChange}
                                className='bg-inputBg text-textMain px-12 py-3.5 text-base rounded-xl w-full border border-borderColor focus:border-primary focus:outline-none placeholder:text-textMuted transition'
                                type="text"
                                placeholder='Add a pick-up location'
                            />
                            <input
                                onClick={() => { setPanelOpen(true); setActiveField('destination') }}
                                value={destination}
                                onChange={handleDestinationChange}
                                className='bg-inputBg text-textMain px-12 py-3.5 text-base rounded-xl w-full mt-4 border border-borderColor focus:border-primary focus:outline-none placeholder:text-textMuted transition'
                                type="text"
                                placeholder='Enter your destination' />
                        </form>
                        <button
                            onClick={findTrip}
                            className='bg-primary hover:bg-primaryHover transition text-white px-4 py-3.5 rounded-xl mt-6 w-full font-medium shadow-sm'>
                            Search Rides
                        </button>
                    </div>

                    <div ref={panelRef} className='bg-surface h-0 overflow-y-auto text-textMain px-4 border-t border-transparent'>
                        <LocationSearchPanel
                            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                            setPanelOpen={setPanelOpen}
                            setVehiclePanel={setVehiclePanel}
                            setPickup={setPickup}
                            setDestination={setDestination}
                            activeField={activeField}
                        />
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div className='h-screen w-full md:flex-1 absolute md:relative z-10 top-0 left-0 bg-background'>
                <div className='md:hidden absolute top-6 left-6 z-20 px-4 py-2 bg-surface/90 backdrop-blur-md rounded-xl border border-borderColor shadow-sm pointer-events-auto'>
                    <span className="text-xl font-serif font-semibold text-textMain tracking-tight">
                        Smart<span className="text-accent">-Ride</span>
                    </span>
                </div>
                <LiveTracking />
            </div>

            {/* Sliding Panels */}
            <div ref={vehiclePanelRef} className='fixed md:absolute w-full md:w-[450px] md:left-0 z-30 bottom-0 translate-y-full bg-surface border-t border-r border-borderColor shadow-[0_-10px_40px_rgba(0,0,0,0.08)] px-6 py-8 pt-10 md:rounded-tr-2xl text-textMain'>
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
            </div>
            
            <div ref={confirmRidePanelRef} className='fixed md:absolute w-full md:w-[450px] md:left-0 z-30 bottom-0 translate-y-full bg-surface border-t border-r border-borderColor shadow-[0_-10px_40px_rgba(0,0,0,0.08)] px-6 py-8 pt-10 md:rounded-tr-2xl text-textMain'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>
            
            <div ref={vehicleFoundRef} className='fixed md:absolute w-full md:w-[450px] md:left-0 z-30 bottom-0 translate-y-full bg-surface border-t border-r border-borderColor shadow-[0_-10px_40px_rgba(0,0,0,0.08)] px-6 py-8 pt-10 md:rounded-tr-2xl text-textMain'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound} />
            </div>
            
            <div ref={waitingForDriverRef} className='fixed md:absolute w-full md:w-[450px] md:left-0 z-30 bottom-0 bg-surface border-t border-r border-borderColor shadow-[0_-10px_40px_rgba(0,0,0,0.08)] px-6 py-8 pt-10 md:rounded-tr-2xl text-textMain'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
            </div>
        </div>
    )
}

export default Home