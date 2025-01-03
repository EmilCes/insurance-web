"use client"
import { PolicyPlanTypesResponse } from '@/api/policy.api';
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const FilterMenuPolicies = ({ isAlwaysEmpty, policyPlanTypes, changeTypePoliciesResults, changeStatusPoliciesResults }: {
    isAlwaysEmpty: boolean; policyPlanTypes: PolicyPlanTypesResponse | undefined;
    changeTypePoliciesResults: (type: string) => void; changeStatusPoliciesResults: (status: number) => void
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const menuImage = '/menu-icon.svg';
    return (
        <>
            <button
                className={`${isOpen ? "opacity-0 scale-90 hidden" : "opacity-100 scale-100 mb-2 md:max-h-full"} 
                    transition-all duration-500 ease-in-out flex items-center md:hidden`}
                style={{
                    backgroundImage: `url(${menuImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "30px",
                    height: "30px",
                    border: "none",
                    outline: "none",
                }}
                onClick={() => { setIsOpen(true) }}
                aria-label="Abrir menú"
            ></button>
            <div className={`${isOpen ? 'opacity-100' : 'opacity-0 max-h-0 md:max-h-full md:opacity-100 md:block'
                } transition-all duration-700 ease-in-out overflow-hidden mb-4`}>
                <div className='flex'>
                    <h2 className='text-2xl font-semibold'>Categorías</h2>
                    <button
                        className="flex items-center ml-auto md:hidden"
                        style={{
                            backgroundImage: `url(${menuImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "30px",
                            height: "30px",
                            border: "none",
                            outline: "none",
                        }}
                        onClick={() => { setIsOpen(false) }}
                        aria-label="Abrir menú"
                    ></button>
                </div>


                <hr className="h-0.5 bg-slate-400 mt-2 mb-4"></hr>

                <p className='text-lg font-semibold text-alternGray mb-2'>Tipo de póliza</p>
                <div className='flex mb-1'>
                    <Input type='radio' name='typePolicy' defaultChecked disabled={isAlwaysEmpty} value={0} onChange={() => changeTypePoliciesResults("0")}
                        className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
                    <label className='ml-2'>Todos</label>
                </div>
                {!isAlwaysEmpty && policyPlanTypes?.map((type) => (
                    <>
                        <div className='flex mb-1'>
                            <Input type='radio' name='typePolicy' onChange={() => changeTypePoliciesResults(type.planTitle)}
                                className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
                            <label className='ml-2'>{type.planTitle}</label>
                        </div>
                    </>
                ))}

                <hr className="h-0.5 bg-slate-400 mt-4 mb-4"></hr>

                <p className='text-lg font-semibold text-alternGray mb-2'>Estado de póliza</p>
                <div className='flex mb-1'>
                    <Input type='radio' name='statePolicy' defaultChecked disabled={isAlwaysEmpty} onChange={() => changeStatusPoliciesResults(0)}
                        className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
                    <label className='ml-2'>Todos</label>
                </div>
                <div className='flex mb-1'>
                    <Input type='radio' name='statePolicy' onChange={() => changeStatusPoliciesResults(1)} disabled={isAlwaysEmpty}
                        className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
                    <label className='ml-2'>Vigente</label>
                </div>
                <div className='flex mb-1'>
                    <Input type='radio' name='statePolicy' onChange={() => changeStatusPoliciesResults(2)} disabled={isAlwaysEmpty}
                        className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
                    <label className='ml-2'>No vigente</label>
                </div>
                <div className='flex mb-1'>
                    <Input type='radio' name='statePolicy' onChange={() => changeStatusPoliciesResults(3)} disabled={isAlwaysEmpty}
                        className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
                    <label className='ml-2'>Cancelada</label>
                </div>

            </div>
        </>
    )
}

export default FilterMenuPolicies