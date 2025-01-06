"use client"

import React from 'react';
import { ReportData } from '@/api/reports.api';
import { ListItemProps } from './ListPage';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const ReportItem: React.FC<ListItemProps<ReportData>> = ({ item }) => {
  const router = useRouter();

  const creationDate = new Date(item.creationDate);
  const dictumDate = item.decisionDate ? new Date(item.decisionDate) : '';

  return (
    <div className='mb-2 border-slate-400 border-solid border rounded-lg px-6 py-4'>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-2 items-center'>
        <h2 className='text-lg md:text-xl font-semibold col-start-1 row-start-1 md:col-span-2'>
          <span className='text-xl md:text-2xl text-alternGray '>Reporte #{item.reportNumber}</span>
        </h2>

        <h3 className='text-lg md:text-xl font-semibold col-start-1 row-start-2 md:col-span-2'>
          <span className='text-lg md:text-xl text-alternGray '>Plan {item.policyPlan}</span>
        </h3>

        <div className='flex items-center justify-center border-slate-400 border-solid border rounded-lg py-2 col-start-2 md:col-start-3 row-start-1 md:row-span-2 w-2/3 md:w-4/5 mx-auto'>
          <p className='text-lg text-lightBlue font-semibold text-center'>
            {item.status}
          </p>
        </div>
      </div>

      <div className='grid md:grid-cols-3 gap:5 mt-2'>
        <div className='mb-1 col-start-1 row-start-1'>
          <h4 className="text-alternGray">Fecha de creación</h4>
          <h4 className="text-alternGray font-semibold">
            {creationDate.getDate()} de {creationDate.toLocaleString('es', { month: 'long' })} del {creationDate.getFullYear()}
          </h4>
        </div>

        <div className='mb-1 col-start-1 row-start-2'>
          <h4 className="text-alternGray">Fecha de dictamen</h4>
          <h4 className="text-alternGray font-semibold">
            {
              dictumDate !== '' ? `${dictumDate.getDate()} de ${dictumDate.toLocaleString('es', { month: 'long' })} del ${dictumDate.getFullYear()}`
                : 'Sin dictamen'
            }
          </h4>
        </div>

        <div className='mb-1 md:col-start-2 md:row-start-1 md:ml-10'>
          <h4 className="text-alternGray">Vehículo</h4>
          <h4 className="text-alternGray font-semibold">{item.vehicle.brand}</h4>
        </div>

        <div className='mb-1 md:col-start-2 md:row-start-2 md:ml-10'>
          <h4 className="text-alternGray">Modelo</h4>
          <h4 className="text-alternGray font-semibold">{item.vehicle.modelYear}</h4>
        </div>

        <Button
          className="md:row-start-2 w-2/3 md:w-4/5 mx-auto text-center mt-auto bg-darkBlue"
          onClick={() => {
            router.push(`/dashboard/reports/${item.reportNumber}`);
          }}
        >
          Ver más
        </Button>
      </div>

    </div>
  );
};

export default ReportItem;