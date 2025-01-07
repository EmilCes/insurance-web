import React from "react";

export interface ReportCardProps {
  reportNumber: string;
  description: string;
  date: string;
  latitude: string;
  longitude: string;
  driverName: string;
  driverPhone: string;
  plates: string;
  adjusters: { id: number; name: string }[];
  onAssign: (reportNumber: string, adjusterId: number) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  reportNumber,
  description,
  date,
  latitude,
  longitude,
  driverName,
  driverPhone,
  plates,
  adjusters,
  onAssign,
}) => {
  const [selectedAdjuster, setSelectedAdjuster] = React.useState<number | null>(null);

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Reporte: #{reportNumber}</h3>
          <p className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString()}{" "}
            {new Date(date).toLocaleTimeString()}
          </p>
        </div>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong>Descripción:</strong> {description}
          </p>
          <p>
            <strong>Ubicación:</strong> Lat {latitude}, Long {longitude}
          </p>
          <p>
            <strong>Conductor:</strong> {driverName} | {driverPhone}
          </p>
          <p>
            <strong>Placas:</strong> {plates}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <select
          className="border rounded-lg p-2 w-full sm:w-56"
          value={selectedAdjuster || ""}
          onChange={(e) => setSelectedAdjuster(Number(e.target.value))}
        >
          <option value="">Seleccione un ajustador disponible</option>
          {adjusters.map((adjuster) => (
            <option key={adjuster.id} value={adjuster.id}>
              {adjuster.name}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          disabled={!selectedAdjuster}
          onClick={() => selectedAdjuster && onAssign(reportNumber, selectedAdjuster)}
        >
          Asignar
        </button>
      </div>
    </div>
  );
};
