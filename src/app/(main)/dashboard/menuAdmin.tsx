import React from 'react'
import ItemMenu from './itemMenu'

const MenuAdmin = () => {
    return (
        <>

            <h1 className="text-xl font-semibold text-alternGray mb-3">Pólizas seguro</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ItemMenu title="Planes de póliza" description='Consulte todos los planes de póliza registrados'
                    icon='folder-icon' targetRoute='/policyPlans' />
                <ItemMenu title="Registrar pólizas" description='Registrar los planes de póliza junto con los servicios de cobertura'
                    icon='car-policy-icon' targetRoute='/policyPlanForm' />
            </section>

            <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>

                <section className="md:mr-2">
                    <h1 className="text-xl font-semibold text-alternGray mb-3">Empleados</h1>
                    <ItemMenu title="Administrar empleados" description='Consultar los empleados registrados en el sistema'
                        icon='employee-icon' targetRoute='/dashboard' />
                </section>
            </div>

        </>
    )
}

export default MenuAdmin