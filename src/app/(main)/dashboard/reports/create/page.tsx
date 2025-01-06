import ReportForm from "@/components/forms/report.form";
import BreadcrumbReportsPage from "../breadcrumReportsPage";

const ReportsPage = () => {

    return (
        <>
            <BreadcrumbReportsPage id={null} isCreating={true} />
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