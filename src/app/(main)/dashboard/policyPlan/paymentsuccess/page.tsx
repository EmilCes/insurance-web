import { Button } from '@/components/ui/button'
import React from 'react'

const PaymentSuccess = () => {
    return (
        <div className="mx-auto w-full max-w-screen-lg p-8">
            <h2 className='text-2xl font-semibold'>Plan “Amplia Plus” adquirido</h2>
            <h4 className="text-alternGray mb-4">Puede consultar su póliza después o descargarla ahora</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12 border-solid border rounded-lg border-stone-300 py-6 px-8">
                <div>
                    <h2 className='text-2xl font-semibold mb-4'>Plan Amplia Plus</h2>
                    <h4 className="text-alternGray">Cubre la Responsabilidad Civil, Asistencia Legal, Gastos médicos a ocupantes, Robo Total, Daños Materiales y otras coberturas y beneficios adicionales</h4>
                </div>
                <div className='flex justify-center my-auto'>
                    <Button className='bg-darkBlue'>
                        Descargar póliza
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                <br className="hidden md:block"/>
                <Button className='w-4/5 text-center flex justify-center mt-4 min-h-12 bg-darkBlue'>
                    Regresar al inicio
                </Button>
            </div>

        </div>
    )
}

export default PaymentSuccess