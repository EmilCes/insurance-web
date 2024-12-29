"use client"

import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import PolicyItem from './policyItem'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { getPoliciesFromPage, getTotalNumberPolicies, PoliciesResponse } from '@/api/policy.api'
import Loading from '@/components/loading/Loading'
import isAuth from '@/lib/auth/isAuth'
import { useAuth } from '@/lib/auth/authContext'
import ErrorMessage from '@/components/errorMessage/errorMessage'
import { useStatusPageContext } from '@/lib/statusPage/statusContext'
import NoItemsPolicy from './noItems'
import { getPolicyPlanTypes, PolicyPlanTypesResponse } from '@/api/policyplan.api'

const PoliciesList = () => {
  const { isLoading, showMessageError, setShowMessageError, setIsLoading } = useStatusPageContext();
  const router = useRouter();
  const numberOfPoliciesPerPage = 4;


  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPolicies, setTotalPolicies] = useState<number>(0);
  const [policiesList, setPoliciesList] = useState<PoliciesResponse>();
  const [policyPlanTypes, setPolicyPlanTypes] = useState<PolicyPlanTypesResponse>();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const policiesTotal = await getTotalNumberPolicies();
        setTotalPolicies(policiesTotal);

        if (policiesTotal > 0) {
          const policyPlanTypesResponse = await getPolicyPlanTypes();
          if (policyPlanTypesResponse) {
            setPolicyPlanTypes(policyPlanTypesResponse);
          } else {
            throw new Error("Error al recuperar pólizas");
          }

          const policiesDataResponse = await getPoliciesFromPage(pageNumber);
          if (policiesDataResponse) {
            setPoliciesList(policiesDataResponse);
          } else {
            throw new Error("Error al recuperar pólizas");
          }
        }

        if (showMessageError) {
          setShowMessageError(false);
        }
      } catch (error) {
        setShowMessageError(true);
      }
      setIsLoading(false);
    };
    fetchPolicies();
  }, []);

  async function changePage(value: number) {
    const newPageNumberValue = pageNumber + value;
    if ((newPageNumberValue) >= 1 && (newPageNumberValue * numberOfPoliciesPerPage) < (totalPolicies + numberOfPoliciesPerPage)) {
      setIsLoading(true);
      try {
        const policiesDataResponse = await getPoliciesFromPage(newPageNumberValue);
        if (policiesDataResponse) {
          setPoliciesList(policiesDataResponse);
          setPageNumber(newPageNumberValue);
        } else {
          throw new Error("Error al recuperar pólizas")
        }
      } catch (error) {
        setShowMessageError(true);
      }
      setIsLoading(false);
    }
  }

  async function changePoliciesResults(value : string){
    console.log(value);
    //setIsLoading(true);

  }

  return (
    <>
      {isLoading ? (<Loading></Loading>) : (<></>)}
      {showMessageError ? (<ErrorMessage></ErrorMessage>) : (<></>)}

      <div className='grid grid-cols-4 gap-8'>
        <div className=''>
          <h2 className='text-2xl font-semibold'>Categorías</h2>

          <hr className="h-0.5 bg-slate-400 mt-2 mb-4"></hr>

          <p className='text-lg font-semibold text-alternGray mb-2'>Tipo de póliza</p>
          <div className='flex mb-1'>
            <Input type='radio' name='typePolicy' defaultChecked disabled={totalPolicies <= 0} value={0} onChange={() => changePoliciesResults("0")}
              className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
            <label className='ml-2'>Todos</label>
          </div>
          {policyPlanTypes?.map((type) => (
            <>
              <div className='flex mb-1'>
                <Input type='radio' name='typePolicy' onChange={() => changePoliciesResults(type.idPolicyPlan)}
                  className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
                <label className='ml-2'>{type.title}</label>
              </div>
            </>
          ))}

          <hr className="h-0.5 bg-slate-400 mt-4 mb-4"></hr>

          <p className='text-lg font-semibold text-alternGray mb-2'>Estado de póliza</p>
          <div className='flex mb-1'>
            <Input type='radio' name='statePolicy' defaultChecked disabled={totalPolicies <= 0} value={0}
              className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
            <label className='ml-2'>Todos</label>
          </div>
          <div className='flex mb-1'>
            <Input type='radio' name='statePolicy' value={1}
              className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
            <label className='ml-2'>Vigente</label>
          </div>
          <div className='flex mb-1'>
            <Input type='radio' name='statePolicy' value={2}
              className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
            <label className='ml-2'>No vigente</label>
          </div>
          <div className='flex mb-1'>
            <Input type='radio' name='statePolicy' value={3}
              className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
            <label className='ml-2'>Cancelada</label>
          </div>

        </div>

        <div className='col-span-3'>
          <div className='grid grid-cols-4 mb-4'>
            <Input className='col-span-3' placeholder='Ingrese el ID de la póliza' disabled={totalPolicies <= 0} />
            <Button
              disabled={totalPolicies <= 0}
              className="text-center flex mx-6  bg-darkBlue">
              Buscar
            </Button>
          </div>

          {totalPolicies > 0 ? (
            <>
              <h6 className='text-alternGray mb-2 ml-2'>Mostrando {(pageNumber * numberOfPoliciesPerPage) - (numberOfPoliciesPerPage - 1)}-
                {pageNumber * numberOfPoliciesPerPage + ((totalPolicies - (pageNumber * numberOfPoliciesPerPage)) < 0 ? (totalPolicies - (pageNumber * numberOfPoliciesPerPage)) : 0)} de {totalPolicies} resultados</h6>

              {policiesList?.map((policyItem) => (
                <PolicyItem policyItem={policyItem}></PolicyItem>
              ))}

              <div className="flex items-center justify-center space-x-4">
                <button className="p-2 text-gray-500 hover:text-gray-800 disabled:text-gray-300"
                  onClick={() => changePage(-1)} disabled={pageNumber === 1}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="border border-gray-300 rounded-lg flex items-center justify-center w-10 h-10">
                  <p className="text-gray-800">{pageNumber}</p>
                </div>

                <button className="p-2 text-gray-500 hover:text-gray-800 disabled:text-gray-300"
                  onClick={(button) => changePage(1)} disabled={((pageNumber) * numberOfPoliciesPerPage) >= totalPolicies}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

            </>) : (
            <>
              <NoItemsPolicy></NoItemsPolicy>
            </>)}




        </div>
      </div>
    </>
  )
}

export default isAuth(PoliciesList)