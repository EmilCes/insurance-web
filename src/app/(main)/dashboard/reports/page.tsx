import TitleBar from "@/components/dashboard/TitleBar";

const ReportsPage = () => {



    return (
        <>
            <TitleBar title="Mis Reportes"/>
            
            <div className="my-10 mx-16">
                <div>
                    <h2 className="font-semibold text-xl">Información del reporte</h2>
                    <h3 className="text-sm text-alternGray">Información del reporte generado.</h3>
                </div>

            </div>
        </>
    )
}

export default ReportsPage;