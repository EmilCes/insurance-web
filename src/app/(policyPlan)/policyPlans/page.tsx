"use client"

import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import PolicyItem from './policyPlanItem'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { DataPlanPolicyPageRequest, getPolicyPlanPages, getPolicyPlanStatusData, PlanPolicyResponse, PolicyPlansResponse } from '@/api/policyplan.api'
import Loading from '@/components/loading/Loading'
import isAuth from '@/lib/auth/isAuth'
import { useStatusPageContext } from '@/lib/statusPage/statusContext'
import NoItemsPolicy from './noItems'
import EmptyPolicies from './emptyPolicies'
import isCorrectRole from '@/lib/auth/isCorrectRole'
import FilterMenuStatus from './filterMenuStatus'
import { PolicyPlanStatusItem } from '@/api/policyplan.api'
import PolicyPlanItem from './policyPlanItem'
import BreadcrumbPolicyPlanPage from './breadcrumbPolicies'

const PlansPolicyList = () => {
  const router = useRouter();
  const numberOfPoliciesPerPage = 4;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [dataPolicyPageRequest, setDataPolicyPageRequest] = useState<DataPlanPolicyPageRequest>();
  const [planPolicyResponse, setPlanPolicyResponse] = useState<PlanPolicyResponse[]>([]);


  useEffect(() => {
    const fecthPlans = async () => {
      try {
        const dataPolicyPageRequest = {
          name: undefined,
          page: 0,
          status: 0
        };
        setDataPolicyPageRequest(dataPolicyPageRequest);
        setPageNumber(0);
        const policyPlanTypesResponse = await getPolicyPlanPages(dataPolicyPageRequest);
        if (policyPlanTypesResponse) {
          console.log(policyPlanTypesResponse);
          setPlanPolicyResponse(policyPlanTypesResponse);
        } else {
          console.log(policyPlanTypesResponse);
          setErrorMessage("Error al recuperar los planes de póliza");
        }
      } catch (err) {
        setErrorMessage("Error al recuperar los planes de póliza");
      }
    }
    fecthPlans();
  }, []);

  async function changePage(value: number) {
    console.log("cabmiar" + value);
    let newPageNumberValue = pageNumber + value;
    if (newPageNumberValue >= 0 && planPolicyResponse.length <= 4) {
      try {
        if (value == 0) {
          newPageNumberValue = 0;
        }
        const data = {
          name: dataPolicyPageRequest?.name,
          page: newPageNumberValue,
          status: dataPolicyPageRequest?.status,
        };

        const policyPlanTypesResponse = await getPolicyPlanPages(data);
        if (policyPlanTypesResponse) {
          if (policyPlanTypesResponse.length > 0) {
            setPlanPolicyResponse(policyPlanTypesResponse);
            setPageNumber(newPageNumberValue);
            setDataPolicyPageRequest(data);
          } else {
            setPlanPolicyResponse([]);
            setPageNumber(0);
            setDataPolicyPageRequest(data);
          }
        } else {
          setErrorMessage("Error al recuperar los planes de póliza");
        }
      } catch (error) {
        setErrorMessage("Ha ocurrido un error inesperado");
      }
    }
  }

  useEffect(() => {
    if (dataPolicyPageRequest?.status !== undefined) {
      changePage(0);
    }
  }, [dataPolicyPageRequest?.status]);

  const handleStatusChange = (newStatus: number) => {
    setDataPolicyPageRequest({ ...dataPolicyPageRequest, status: newStatus })
    console.log(newStatus);
  };


  return (
    <>

      <BreadcrumbPolicyPlanPage id={null}></BreadcrumbPolicyPlanPage>
      {errorMessage && (
        <div className="text-red-500 text-right mr-4">
          {errorMessage}
        </div>
      )}
      <div className="mx-auto w-full max-w-screen-lg px-8 pb-8 pt-4">
        <div className='grid grid-cols-1 md:grid-col-3 items-center'>
          <div className='flex'>
            <Input
              className='mr-4'
              placeholder='Ingrese el título del plan de póliza'
              value={dataPolicyPageRequest?.name ?? ''}
              onChange={(e) => setDataPolicyPageRequest({ ...dataPolicyPageRequest, name: e.target.value })}
            />

            <Button
              className='bg-darkBlue text-white'
              onClick={() => changePage(0)}
            >
              Buscar
            </Button>
          </div>

          <div className='md:col-start-2 mt-2 mb-3 md:my-2 md:mx-8'>
            <FilterMenuStatus
              isAlwaysEmpty={false}
              policyPlanTypes={undefined}
              changeTypePoliciesResults={() => { }}
              changeStatusPoliciesResults={handleStatusChange}
            />
          </div>


          <Button
            className="bg-green-500 text-white md:col-start-3 my-2 "
            onClick={() => router.push("/policyPlanForm/")}
          >
            Crear plan póliza
          </Button>
        </div>


        <div>
          {planPolicyResponse === null ? (
            <EmptyPolicies />
          ) : planPolicyResponse.length === 0 ? (
            <NoItemsPolicy />
          ) : (
            <>
              <h6 className='text-alternGray mb-2'>
                Mostrando {(pageNumber * numberOfPoliciesPerPage) - (numberOfPoliciesPerPage - 1)}-
                {pageNumber * numberOfPoliciesPerPage + ((planPolicyResponse.length - (pageNumber * numberOfPoliciesPerPage)) < 0 ? (planPolicyResponse.length - (pageNumber * numberOfPoliciesPerPage)) : 0)} de {planPolicyResponse.length} resultados
              </h6>

              {planPolicyResponse.map((policyItem) => (
                <PolicyPlanItem policyPlanItem={policyItem} key={policyItem.idPolicyPlan} />
              ))}

              <div className="flex items-center justify-center space-x-4">
                <button
                  className="p-2 text-gray-500 hover:text-gray-800 disabled:text-gray-300"
                  onClick={() => changePage(-1)}
                  disabled={pageNumber === 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="border border-gray-300 rounded-lg flex items-center justify-center w-10 h-10">
                  <p className="text-gray-800">{pageNumber + 1}</p>
                </div>

                <button
                  className="p-2 text-gray-500 hover:text-gray-800 disabled:text-gray-300"
                  onClick={() => changePage(1)}
                  disabled={planPolicyResponse.length < 4}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

    </>
  )
}
export default isAuth(isCorrectRole(PlansPolicyList, "Administrador"))