import TitleBar from "@/components/dashboard/TitleBar";
import { Button } from "@/components/ui/button";

const PolicyPlanDetail = () => {
  return (
    <div className="p-0">
      <TitleBar title="Plan de Póliza Detalle" />

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Plan de Póliza</h2>
          <div className="flex items-center">
            <span className="text-black font-semibold mr-1">Plan póliza:</span>
            <span className="text-green-500 font-semibold mr-2">Activa</span>
            <Button className="bg-blue-500 text-white mr-2">Cambiar Estatus</Button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Información del plan de póliza</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-300 rounded-md p-4">
            <div>
              <h4 className="text-gray-700 font-medium">Título de plan</h4>
              <p className="text-black font-bold">Póliza de Seguro Vehicular Básico</p>
            </div>
            <div>
              <h4 className="text-gray-700 font-medium">Precio base</h4>
              <p className="text-black font-bold">15,000 pesos</p>
            </div>
            <div>
              <h4 className="text-gray-700 font-medium">Plazo máximo</h4>
              <p className="text-black font-bold">12 meses</p>
            </div>
            <div className="md:col-span-2">
            <div>
              <hr className="border-gray-300 my-4 mx-3.5 w-11/12" />
            </div>
              <h4 className="text-gray-700 font-medium">Descripción</h4>
              <p className="text-black font-bold">
                Este seguro de automóvil ofrece una cobertura completa y protección en caso de accidentes, daños al vehículo, robo y responsabilidades hacia terceros.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Información de servicios de póliza</h3>
          <table className="w-full border-collapse border border-gray-300 mt-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Coste asegurado</th>
                <th className="border border-gray-300 px-4 py-2">Es amparada</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center">Responsabilidad Civil Bienes</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Sí</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex place-items-end float-end space-x-4 ">
          <Button className="bg-red-500 text-white py-3 rounded-md float-right">Eliminar plan de póliza</Button>
          <Button className="bg-blue-500 text-white py-3 rounded-md float-right">Editar</Button>
        </div>
        <br />
      </div>
    </div>
  );
};

export default PolicyPlanDetail;
