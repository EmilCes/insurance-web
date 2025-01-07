// app/dashboard/reports/success/page.tsx

"use client";

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import isCorrectRole from '@/lib/auth/isCorrectRole';
import isAuth from '@/lib/auth/isAuth';

const ReportSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const reportNumber = searchParams.get('reportNumber');

    return (
        <div className="my-10 mx-16">
            <h2 className="font-semibold text-2xl">¡Reporte creado con éxito!</h2>
            <p className="mt-4 text-lg">
                Su reporte ha sido creado exitosamente. El número de su reporte es: <strong>{reportNumber}</strong>
            </p>
            <p className="mt-2">
                Por favor, guarde este número para futuras referencias.
            </p>
            {/* Puedes agregar un botón para volver a la lista de reportes o al dashboard */}
            <div className="mt-8">
                <Button onClick={() => router.push('/dashboard/reports')} className="bg-darkBlue">
                    Ver mis reportes
                </Button>
            </div>
        </div>
    );
};

export default isAuth(isCorrectRole(ReportSuccessPage, "Conductor"));