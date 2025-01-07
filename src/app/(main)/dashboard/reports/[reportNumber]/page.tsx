"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DetailedReportData, getDetailedReport } from '@/api/reports.api';
import { useStatusPageContext } from '@/lib/statusPage/statusContext';
import Loading from '@/components/loading/Loading';
import ErrorMessage from '@/components/errorMessage/errorMessage';
import ReportForm from '@/components/forms/report.form';
import BreadcrumbReportsPage from '../breadcrumReportsPage';
import { useAuth } from '@/lib/auth/authContext';
import DictumForm from '@/components/forms/dictum.from';
import isCorrectRole from '@/lib/auth/isCorrectRole';
import isAuth from '@/lib/auth/isAuth';

const ReportDetailPage = () => {
    const { reportNumber } = useParams();
    const { role } = useAuth();
    const [reportData, setReportData] = useState<DetailedReportData | null>(null);
    const { isLoading, setIsLoading, showMessageError, setShowMessageError } = useStatusPageContext();
    const mode = "view";

    useEffect(() => {
        const fetchReport = async () => {
            setIsLoading(true);
            try {
                const data = await getDetailedReport(reportNumber?.toString() || '');
                setReportData(data);
            } catch (error) {
                console.error(error);
                setShowMessageError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReport();
    }, [reportNumber]);

    if (isLoading) {
        return <Loading />;
    }

    if (showMessageError) {
        return <ErrorMessage />;
    }

    if (!reportData) {
        return <p>No se encontró el reporte.</p>;
    }

    return (
        <>
            <BreadcrumbReportsPage id={reportNumber?.toString() || ''} />
            <div className="my-10 mx-16">

                <ReportForm mode={mode} role={role} defaultValues={reportData} />

                <DictumForm
                    role={role}
                    mode={mode}
                    defaultValues={reportData}
                />
            </div>
        </>
    );
};

export default isAuth(isCorrectRole(ReportDetailPage, "Conductor,Ajustador"));