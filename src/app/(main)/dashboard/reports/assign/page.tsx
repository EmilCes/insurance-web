"use client";

import React, { useEffect, useState } from "react";
import { 
  getPendingReports, 
  getAvailableAdjusters, 
  PendingReportData, 
  assignAdjusterToReport 
} from "@/api/reports.api";
import { ReportCard } from "./reportCard";

export default function AssignAdjusterPage() {
  const [reports, setReports] = useState<PendingReportData[]>([]);
  const [adjusters, setAdjusters] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch pending reports
        const pendingReports = await getPendingReports();
        setReports(pendingReports);

        // Fetch available adjusters
        const availableAdjusters = await getAvailableAdjusters();
        setAdjusters(availableAdjusters);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAssignAdjuster = async (reportNumber: string, adjusterId: number) => {
    console.log(`Asignando ajustador ${adjusterId} al reporte ${reportNumber}`);
    try {
      const success = await assignAdjusterToReport({
        reportNumber,
        assignedEmployeeId: adjusterId,
      });

      if (success) {
        // Actualizar los estados después de asignar el ajustador
        setReports((prevReports) =>
          prevReports.filter((report) => report.reportNumber !== reportNumber)
        );
        setAdjusters((prevAdjusters) =>
          prevAdjusters.filter((adjuster) => adjuster.id !== adjusterId)
        );

        alert(`Ajustador asignado exitosamente al reporte ${reportNumber}`);
      } else {
        alert("No se pudo asignar el ajustador. Inténtalo nuevamente.");
      }
    } catch (error) {
      console.error("Error al asignar ajustador:", error);
      alert("Ocurrió un error al asignar el ajustador. Inténtalo nuevamente.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Cargando reportes...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Siniestros</h1>
      <p className="text-gray-600 mb-4 text-center sm:text-left">
        Asignar ajustador a siniestro
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.length === 0 ? (
          <p className="text-gray-600 col-span-full">No hay reportes pendientes.</p>
        ) : (
          reports.map((report) => (
            <ReportCard
              key={report.reportNumber}
              reportNumber={report.reportNumber}
              description={report.description}
              date={report.date}
              latitude={report.latitude}
              longitude={report.longitude}
              driverName={report.Driver.Account.name || "Sin nombre"}
              driverPhone={report.Driver.phone || "Sin teléfono"}
              plates={report.Vehicle.plates || "Sin placas"}
              adjusters={adjusters}
              onAssign={handleAssignAdjuster}
            />
          ))
        )}
      </div>
    </div>
  );
}
