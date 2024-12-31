import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React from 'react'

const BreadcrumbPoliciesPage = ({ id }: { id: string | null }) => {
    return (
        <div className='bg-sky-100'>
            <div className="mx-auto w-full max-w-screen-lg py-1">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        {id == null ?
                            (<>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Mis pólizas</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>) :
                            (<>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/policies">Mis pólizas</BreadcrumbLink>
                                </BreadcrumbItem>

                                <BreadcrumbSeparator />

                                <BreadcrumbItem>
                                    <BreadcrumbPage>Póliza #{id}</BreadcrumbPage>
                                </BreadcrumbItem>

                            </>)
                        }

                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    )
}

export default BreadcrumbPoliciesPage