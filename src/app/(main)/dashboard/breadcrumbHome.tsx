import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React from 'react'

const BreadcrumbHome = () => {
    return (
        <nav className='bg-sky-100'>
            <section className="mx-auto max-w-screen-lg py-1 ml-8 md:ml-20">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Inicio</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>
        </nav>
    )
}

export default BreadcrumbHome