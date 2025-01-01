import TitleBar from "@/components/dashboard/TitleBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PolicyPlanPage = () => {
  return (
    <div className="p-0">
      <TitleBar title="Registrar Plan de Póliza" />

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Datos del plan de póliza</h3>
        <h3 className="text-alternGray">Ingrese los datos para el nuevo plan de póliza.</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border border-black-200 p-4 rounded">
          <div>
            <label className="block text-sm font-medium mb-2">Título de plan</label>
            <Input placeholder="ex: Póliza de Seguro Vehicular Básico" />
          </div>
          <br/>
          <div>
            <label className="block text-sm font-medium mb-2">Precio base</label>
            <Input placeholder="ex: 15,000 pesos" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Plazo máximo</label>
            <Input placeholder="ex: 12 meses" />
          </div>
          <div className="col-span-full">
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea className="w-full p-2 border rounded" rows={4} placeholder="ex: Seguro completo para vehículos particulares."></textarea>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-4">Servicios de póliza</h3>
        <h3 className="text-alternGray">Ingrese los datos de los servicios que cubre el nuevo plan de póliza.</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border border-black-200 p-4 rounded">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <Input placeholder="ex: Gastos Médicos Ocupantes"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Coste asegurado</label>
            <Input placeholder="ex: 1625"/>
          </div>
          <div className="col-span-full flex items-center space-x-2">
            <input type="checkbox"/>
            <label>¿Es amparada?</label>
          </div>
          <div className="col-span-full">
            <Button className="bg-green-500 text-white w-full">Agregar Servicio</Button>
          </div>
          <div className="col-span-full">
          <table className="w-full border-collapse border border-gray-300 mt-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2">Coste asegurado</th>
                  <th className="border border-gray-300 px-4 py-2">Es amparada</th>
                  <th className="border border-gray-300 px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2">
                    </td>
                    <td className="px-4 py-2 flex justify-center items-center space-x-2">
                      <Button className="bg-blue-500 text-white mr-2">Editar</Button>
                      <Button className="bg-red-500 text-white mr-2" >Eliminar</Button>
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <Button className="bg-blue-500 text-white px-20 py-3 rounded-md float-right">Guardar</Button>
        </div>
        <br />
      </div>
    </div>
  );
};

export default PolicyPlanPage;

