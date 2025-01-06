import React from 'react'
import ItemMenu from './itemMenu'

const MenuDriver = () => {
    return (
        <>
            <h1 className="text-xl font-semibold text-alternGray mb-3">Reporte de siniestros</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ItemMenu title="Levantar reporte" description='En caso de algún siniestro, registre un reporte con lo sucedido'
                    icon='accident-icon' targetRoute='/dashboard'/>
                <ItemMenu title="Historial de reportes" description='Consulte los reportes de siniestros emitidos previamente'
                    icon='folder-icon' targetRoute='/dashboard'/>
            </section>

            <h1 className="text-xl font-semibold text-alternGray mb-3 mt-6">Pólizas de seguro</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ItemMenu title="Comprar póliza de seguro" description='Realizar compras de pólizas de seguro para los vehículos'
                    icon='car-policy-icon' targetRoute='/dashboard/policyPlan'/>
                <ItemMenu title="Mis pólizas" description='Visualice las pólizas de seguro que tiene contratadas, así como el vehículo asociado'
                    icon='policy-icon' targetRoute='/dashboard/policies'/>
            </section>

            <h1 className="text-xl font-semibold text-alternGray mb-3 mt-6">Otros</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ItemMenu title="Llamada SOS" description='Realice una llamada de emergencia cuando ocurra un siniestro'
                    icon='call-icon' targetRoute='/dashboard'/>
                <ItemMenu title="Mi perfil" description='Consulte la información de su cuenta y los datos de su tarjeta registrada'
                    icon='account-icon' targetRoute='/dashboard'/>
            </section>
        </>
    )
}

export default MenuDriver