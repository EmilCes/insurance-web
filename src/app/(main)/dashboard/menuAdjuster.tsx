import React from 'react'
import ItemMenu from './itemMenu'

const MenuAdjuster = () => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>

                <section className="md:mr-2">
                    <h1 className="text-xl font-semibold text-alternGray mb-3">Reporte de siniestros</h1>
                    <ItemMenu title="Visualizar reportes" description='Visualice los reportes asignados y dictamine los faltantes'
                        icon='folder-icon' targetRoute='/dashboard/reports' />
                </section>


            </div>
        </>
    )
}

export default MenuAdjuster