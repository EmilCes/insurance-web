import TitleBar from "@/components/dashboard/TitleBar";
import ReportForm from "@/components/forms/report.form";

const ReportsPage = () => {



    return (
        <>
            <TitleBar title="Mis Reportes"/>
            
            <div className="my-10 mx-16">
                <div>
                    <h2 className="font-semibold text-xl">Información del reporte</h2>
                    <h3 className="text-sm text-alternGray">Información del reporte generado.</h3>
                </div>

                <ReportForm />

            </div>
        </>
    )
}

export default ReportsPage;