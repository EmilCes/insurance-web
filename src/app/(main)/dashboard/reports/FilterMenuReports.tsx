// FilterMenuReports.tsx
"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { ReportFilters } from '@/api/reports.api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterMenuReportsProps {
    filters: ReportFilters;
    setFilters: React.Dispatch<React.SetStateAction<ReportFilters>>;
    isAlwaysEmpty: boolean;
}

const FilterMenuReports: React.FC<FilterMenuReportsProps> = ({
    filters,
    setFilters,
    isAlwaysEmpty,
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const menuImage = '/menu-icon.svg';

    const handleStatusChange = (status: number) => {
        setFilters({ ...filters, status });
    };

    const handleStartDateChange = (value: string) => {
        setFilters({ ...filters, startYear: parseInt(value, 10) });
    };

    const handleEndDateChange = (value: string) => {
        setFilters({ ...filters, endYear: parseInt(value, 10) });
    };

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2023; year <= currentYear; year++) {
        years.push(year);
    }

    return (
        <>
            <div className={`${isOpen ? 'opacity-100' : 'opacity-0 max-h-0 md:max-h-full md:opacity-100 md:block'} transition-all duration-700 ease-in-out overflow-hidden mb-4`}>
                <div className='flex'>
                    <h2 className='text-2xl font-semibold'>Filtros</h2>
                </div>

                <hr className="h-0.5 bg-slate-400 mt-4 mb-4"></hr>

                <p className='text-lg font-semibold text-alternGray mb-2'>Rango de tiempo</p>

                <label className='block mb-2'>
                    Inicio
                    <Select value={filters.startYear?.toString() || ''} onValueChange={handleStartDateChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona el año inicial" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                years.map((year) => (
                                    <SelectItem key={year} value={year.toString()}>
                                        {year}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </label>

                <label className='block mb-2'>
                    Fin
                    <Select value={filters.endYear?.toString() || ''} onValueChange={handleEndDateChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona el año final" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                years.map((year) => (
                                    <SelectItem key={year} value={year.toString()}>
                                        {year}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </label>

                <hr className="h-0.5 bg-slate-400 mt-2 mb-4"></hr>

                <p className='text-lg font-semibold text-alternGray mb-2'>Estado del reporte</p>
                <div className='flex mb-1'>
                    <Input type='radio' name='stateReport' value={0} defaultChecked onChange={() => handleStatusChange(0)}
                        className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
                    <label className='ml-2'>Todos</label>
                </div>

                <div className='flex mb-1'>
                    <Input type='radio' name='stateReport' value={1} onChange={() => handleStatusChange(1)}
                        className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
                    <label className='ml-2'>Pendiente</label>
                </div>

                <div className='flex mb-1'>
                    <Input type='radio' name='stateReport' value={2} onChange={() => handleStatusChange(2)}
                        className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
                    <label className='ml-2'>Dictaminado</label>
                </div>
            </div>
        </>
    );
};

export default FilterMenuReports;