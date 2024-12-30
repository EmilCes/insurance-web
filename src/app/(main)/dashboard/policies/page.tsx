"use client"

import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import PolicyItem from './policyItem'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { DataPolicyTotalRequest, getPoliciesFromPage, getTotalNumberPolicies, PoliciesResponse } from '@/api/policy.api'
import Loading from '@/components/loading/Loading'
import isAuth from '@/lib/auth/isAuth'
import ErrorMessage from '@/components/errorMessage/errorMessage'
import { useStatusPageContext } from '@/lib/statusPage/statusContext'
import NoItemsPolicy from './noItems'
import { getPolicyPlanTypes, PolicyPlanTypesResponse } from '@/api/policyplan.api'
import EmptyPolicies from './emptyPolicies'
import isDriver from '@/lib/auth/isDriver'

const PoliciesList = () => {
  const { isLoading, showMessageError, setShowMessageError, setIsLoading } = useStatusPageContext();
  const router = useRouter();
  const numberOfPoliciesPerPage = 4;

  const [dataPolicyRequest, setDataPolicyRequest] = useState<DataPolicyTotalRequest>({ type: "0", status: 0 });
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [idPolicySearch, setIdPolicySearch] = useState<string | undefined>(undefined);
  const [isAlwaysEmpty, setIsAlwaysEmpty] = useState<boolean>(false);
  const [totalPolicies, setTotalPolicies] = useState<number>(0);
  const [policiesList, setPoliciesList] = useState<PoliciesResponse>();
  const [policyPlanTypes, setPolicyPlanTypes] = useState<PolicyPlanTypesResponse>();

  useEffect(() => {
    const fecthTypesPlans = async () => {
      try {
        const policyPlanTypesResponse = await getPolicyPlanTypes();
        if (policyPlanTypesResponse) {
          setPolicyPlanTypes(policyPlanTypesResponse);
        } else {
          throw new Error("Error al recuperar pólizas");
        }
        if (showMessageError) {
          setShowMessageError(false);
        }
      } catch (err) {
        setShowMessageError(true);
      }
    }
    fecthTypesPlans();
  }, []);

  useEffect(() => {
    fetchPolicies(dataPolicyRequest, idPolicySearch);
  }, []);

  const fetchPolicies = async (data: DataPolicyTotalRequest, idPolicy: string | undefined) => {
    try {
      const policiesTotal = await getTotalNumberPolicies({ type: data.type, status: data.status }, idPolicy);
      setTotalPolicies(policiesTotal);

      if (policiesTotal > 0) {
        const policiesDataResponse = await getPoliciesFromPage({ page: 1, type: data.type, status: data.status, idPolicy: idPolicy });
        if (policiesDataResponse != null && policiesDataResponse.length > 0) {
          setPoliciesList(policiesDataResponse);
        } else {
          throw new Error("Error al recuperar pólizas");
        }
      } else {
        if (data.type == "0" && data.status == 0) {
          setIsAlwaysEmpty(true);
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

  async function changePage(value: number) {
    const newPageNumberValue = pageNumber + value;
    if ((newPageNumberValue) >= 1 && (newPageNumberValue * numberOfPoliciesPerPage) < (totalPolicies + numberOfPoliciesPerPage)) {
      setIsLoading(true);
      try {
        const policiesDataResponse = await getPoliciesFromPage({ page: newPageNumberValue, type: dataPolicyRequest.type, status: dataPolicyRequest.status, idPolicy: idPolicySearch });
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

  async function changeTypePoliciesResults(value: string) {
    if (value == "0" || value.length == 36) {
      setIsLoading(true);
      fetchPolicies({ type: value, status: dataPolicyRequest.status }, idPolicySearch);
      setDataPolicyRequest({ type: value, status: dataPolicyRequest.status });
      setPageNumber(1);
    }
  }

  async function changeStatusPoliciesResults(value: number) {
    if (value == 0 || value == 1 || value == 2 || value == 3) {
      setIsLoading(true);
      fetchPolicies({ type: dataPolicyRequest.type, status: value }, idPolicySearch);
      setDataPolicyRequest({ type: dataPolicyRequest.type, status: value });
      setPageNumber(1);
    }
  }

  async function changeIdPolicyPoliciesResults() {
    setIsLoading(true);
    fetchPolicies({ type: dataPolicyRequest.type, status: dataPolicyRequest.status}, idPolicySearch );
    setPageNumber(1);
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
            <Input type='radio' name='typePolicy' defaultChecked disabled={isAlwaysEmpty} value={0} onChange={() => changeTypePoliciesResults("0")}
              className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
            <label className='ml-2'>Todos</label>
          </div>
          {!isAlwaysEmpty && policyPlanTypes?.map((type) => (
            <>
              <div className='flex mb-1'>
                <Input type='radio' name='typePolicy' onChange={() => changeTypePoliciesResults(type.idPolicyPlan)}
                  className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
                <label className='ml-2'>{type.title}</label>
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

        <div className='col-span-3'>
          <div className='grid grid-cols-4 mb-4'>
            <Input className='col-span-3' placeholder='Ingrese el ID de la póliza' disabled={isAlwaysEmpty}
              value={idPolicySearch} onChange={(e) => setIdPolicySearch(e.target.value)} />
            <Button
              disabled={isAlwaysEmpty}
              className="text-center flex mx-6  bg-darkBlue" onClick={() => { changeIdPolicyPoliciesResults(); }}>
              Buscar
            </Button>
          </div>

          {!isAlwaysEmpty ? (
            <>
              {totalPolicies > 0 ? (<>
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
                </div></>) : (<><NoItemsPolicy></NoItemsPolicy></>)}
            </>) : (
            <><EmptyPolicies></EmptyPolicies></>)}
        </div>
      </div>
    </>
  )
}

export default isDriver(isAuth(PoliciesList))