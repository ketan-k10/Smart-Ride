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

const ConfirmRide = (props) => {
    const vehicleImages = {
        car: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg',
        moto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
        auto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png'
    }

    return (
        <div>
            <button
                className='absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-borderColor rounded-full hover:bg-textMuted transition'
                onClick={() => props.setConfirmRidePanel(false)}
            ></button>

            <h3 className='text-2xl font-serif font-semibold text-textMain mb-6'>Confirm your Ride</h3>

            <div className='flex flex-col items-center mb-6'>
                <img className='h-20 object-contain' src={vehicleImages[props.vehicleType] || vehicleImages.car} alt="Vehicle" />
            </div>

            <div className='bg-inputBg rounded-xl border border-borderColor overflow-hidden mb-6'>
                <RideInfoRow icon="ri-map-pin-user-fill" label="Pickup" value={props.pickup} />
                <RideInfoRow icon="ri-map-pin-2-fill" label="Destination" value={props.destination} />
                <RideInfoRow icon="ri-currency-line" label="Fare" value={`₹${props.fare[props.vehicleType]} · Cash`} border={false} />
            </div>

            <button
                onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()
                }}
                className='w-full bg-primary hover:bg-primaryHover text-white font-medium p-4 rounded-xl transition text-base shadow-sm'
            >
                Confirm & Find Driver
            </button>
        </div>
    )
}

export default ConfirmRide