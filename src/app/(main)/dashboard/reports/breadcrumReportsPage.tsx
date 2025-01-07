"use client"
// BreadcrumbReportsPage.tsx
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface BreadcrumbReportsPageProps {
  id: string | null;
  isCreating?: boolean;
}

const BreadcrumbReportsPage: React.FC<BreadcrumbReportsPageProps> = ({ id, isCreating = false }) => {
  return (
    <div className='bg-sky-100'>
      <div className="mx-auto max-w-screen-lg py-1 ml-8 md:ml-20">
        <Breadcrumb>
          <BreadcrumbList>

            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />


            <BreadcrumbItem>
              <BreadcrumbLink href='/dashboard/reports'>Mis reportes</BreadcrumbLink>
            </BreadcrumbItem>

            {
              isCreating ? (
                <>
                  <BreadcrumbSeparator />

                  <BreadcrumbItem>
                    <BreadcrumbPage>Crear reporte</BreadcrumbPage>
                  </BreadcrumbItem>
                </>

              ) : id != null ? (
                <>
                  <BreadcrumbSeparator />

                  <BreadcrumbItem>
                    <BreadcrumbPage>Reporte #{id}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              ) : (
                null
              )
            }

          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BreadcrumbReportsPage;