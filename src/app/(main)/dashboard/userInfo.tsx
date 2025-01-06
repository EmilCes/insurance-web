import React from 'react'

const UserInfo = ({role} : {role: string}) => {
    const driverImage = '/driver-icon.svg';

    return (
        <section className="rounded-3xl bg-lightBlue text-white grid grid-cols-3 w-fit gap-0 px-2 py-1 ml-auto mr-5 md:mr-10 mb-4">
            <figure
                className="flex items-center justify-between m-auto"
                style={{
                    backgroundImage: `url(${driverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: "40px",
                    height: "40px"
                }}
            />
            <section className="col-span-2">
                <h1 className="text-base font-semibold max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">Jacob Montiel Salas</h1>
                <h2 className='text-sm'>{role}</h2>
            </section>
        </section>
    )
}

export default UserInfo