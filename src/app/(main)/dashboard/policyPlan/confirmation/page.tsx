
import PaymentForm from '@/components/forms/payment.form'
import React from 'react'
import Vehicledata from '../vehicledata'
import { useRouter } from "next/navigation";

const Confirmation = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <PaymentForm />

            <div>
                <h2 className='text-2xl font-semibold mb-2'>Resumen de póliza</h2>

                <div className='border-solid border rounded-lg border-stone-300 py-6 px-8 my-auto'>
                    <div className='mb-6'>
                        <Vehicledata />
                    </div>
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-2 mb-2'>
                            <h3 className='text-xl font-semibold my-auto'>Plan Amplia Plus</h3>
                            <h6 className='text-alternGray ml-auto text-right'>La duración de la póliza será de 2 año</h6>
                        </div>

                        <h4 className="text-alternGray">Cubre la Responsabilidad Civil, Asistencia Legal, Gastos médicos a ocupantes, Robo Total, Daños Materiales y otras coberturas y beneficios adicionales</h4>

                        <h3 className='text-xl font-semibold my-auto mt-4'> 
                            Total <span className='text-darkBlue'>${new Intl.NumberFormat("en-US").format(43000)}</span></h3>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Confirmation