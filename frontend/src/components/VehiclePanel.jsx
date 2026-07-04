import React from 'react'

const RideInfoRow = ({ icon, label, value, border = true }) => (
    <div className={`flex items-center gap-4 p-4 ${border ? 'border-b border-borderColor' : ''}`}>
        <div className='h-9 w-9 rounded-full bg-inputBg border border-borderColor flex items-center justify-center flex-shrink-0'>
            <i className={`${icon} text-textMuted`}></i>
        </div>
        <div>
            <p className='text-xs text-textMuted uppercase tracking-widest mb-0.5'>{label}</p>
            <h3 className='text-sm font-medium text-textMain leading-snug'>{value}</h3>
        </div>
    </div>
)

const VehiclePanel = (props) => {
    const vehicles = [
        {
            key: 'car',
            img: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg',
            name: 'SmartCar',
            seats: 4,
            eta: '2 mins',
            desc: 'Comfortable, air-conditioned ride'
        },
        {
            key: 'moto',
            img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
            name: 'SmartMoto',
            seats: 1,
            eta: '3 mins',
            desc: 'Quick & affordable motorcycle'
        },
        {
            key: 'auto',
            img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
            name: 'SmartAuto',
            seats: 3,
            eta: '3 mins',
            desc: 'Budget-friendly auto rickshaw'
        }
    ]

    return (
        <div>
            <button
                className='absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-borderColor rounded-full hover:bg-textMuted transition'
                onClick={() => props.setVehiclePanel(false)}
            ></button>

            <h3 className='text-2xl font-serif font-semibold text-textMain mb-6'>Choose a Ride</h3>

            <div className='space-y-3'>
                {vehicles.map(v => (
                    <div
                        key={v.key}
                        onClick={() => { props.setConfirmRidePanel(true); props.selectVehicle(v.key) }}
                        className='flex items-center justify-between p-4 bg-inputBg border border-borderColor hover:border-primary cursor-pointer rounded-xl transition group'
                    >
                        <img className='h-12 w-16 object-contain' src={v.img} alt={v.name} />
                        <div className='flex-1 ml-4'>
                            <h4 className='text-sm font-semibold text-textMain'>
                                {v.name} <span className='font-normal text-textMuted'>· {v.seats} <i className="ri-user-3-fill text-xs"></i></span>
                            </h4>
                            <p className='text-xs text-textMuted'>{v.eta} · {v.desc}</p>
                        </div>
                        <div className='text-right'>
                            <h2 className='text-base font-semibold text-textMain'>₹{props.fare[v.key]}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VehiclePanel