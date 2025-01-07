import ReportForm from "@/components/forms/report.form";
import BreadcrumbReportsPage from "../breadcrumReportsPage";

const ReportsPage = () => {

    return (
        <>
            <BreadcrumbReportsPage id={null} isCreating={true} />
            <div className="my-10 mx-16">

                <ReportForm mode="create" role="Conductor"/>

            </div>
        </>
    )
}

export default ReportsPage;