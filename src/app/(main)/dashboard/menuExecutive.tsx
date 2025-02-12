import React from 'react'
import ItemMenu from './itemMenu'

const MenuExecutive = () => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>

                <section className="md:mr-2">
                    <h1 className="text-xl font-semibold text-alternGray mb-3">Reporte de siniestros</h1>
                    <ItemMenu title="Asignación de ajustadores" description='Asignación de un ajustador a los reportes de siniestros nuevos'
                        icon='report-icon' targetRoute='/dashboard/reports/assign' />
                </section>

            </div>
        </>
    )
}

export default MenuExecutive