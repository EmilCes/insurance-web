import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React from 'react'

const BreadcrumbPolicyPlanPage = ({ id }: { id: string | null }) => {
    return (
        <div className='bg-sky-100'>
            <div className="mx-auto max-w-screen-lg py-1 ml-8 md:ml-20">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        {id == null ?
                            (<>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Planes de póliza</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>) :
                            (<>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/policyPlans">Planes de póliza</BreadcrumbLink>
                                </BreadcrumbItem>

                                <BreadcrumbSeparator />

                                <BreadcrumbItem>
                                    <BreadcrumbPage>Plan de póliza #{id}</BreadcrumbPage>
                                </BreadcrumbItem>

                            </>)
                        }

                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    )
}

export default BreadcrumbPolicyPlanPage