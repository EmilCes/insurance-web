"use client"
import { useState, useEffect } from "react";
import TitleBar from "@/components/dashboard/TitleBar";
import { Button } from "@/components/ui/button";
import { deletePolicyPlan, getPolicyPlanStatusData, updatePolicyPlanStatusData } from "@/api/policyplan.api";
import { useParams, useRouter } from "next/navigation";

const PolicyPlanDetail = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [policyPlan, setPolicyPlan] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);

  const params = useParams();
  const idPolicyPlan = Array.isArray(params?.idPolicyPlan)
    ? params.idPolicyPlan[0]
    : params?.idPolicyPlan || "";

  const router = useRouter();

  useEffect(() => {
    const fetchPolicyPlanData = async () => {
      try {
        if (!idPolicyPlan) {
          return;
        }
        const response = await getPolicyPlanStatusData(idPolicyPlan);
        if (response) {
          setPolicyPlan({
            title: response.title,
            description: response.description,
            maxPeriod: response.maxPeriod,
            basePrice: response.basePrice,
            status: response.PolicyPlanStatus.policyPlanStatusType || "Desconocido",
            statusId: response.PolicyPlanStatus.idPolicyPlanStatus
          });
          setServices(response.Service);
        } else {
          setErrorMessage("No se pudo obtener el plan de póliza.");
        }
      } catch (error) {
        setErrorMessage("Hubo un error al cargar el plan de póliza.");
      }
    };

    fetchPolicyPlanData();
  }, []);

  const handleChangeStatus = async () => {
    try {
      const nextStatusId = policyPlan.statusId === 1 ? 2 : 1;

      const statusPayload = { idPolicyPlanStatus: nextStatusId };
      const response = await updatePolicyPlanStatusData(statusPayload, idPolicyPlan);

      if (response === null) {
        setErrorMessage("La solicitud falló. Por favor, intente nuevamente.");
        return;
      }
      if ('status' in response) {
        if (response.status === 400) {
          setErrorMessage("La solicitud es incorrecta. Por favor, revise los datos enviados.");
        } else {
          setErrorMessage("La solicitud falló. Por favor, intente nuevamente.");
        }
        setErrorMessage(response.message);
      } else {
        setErrorMessage("");
        setPolicyPlan({
          title: response.title,
          description: response.description,
          maxPeriod: response.maxPeriod,
          basePrice: response.basePrice,
          status: response.PolicyPlanStatus.policyPlanStatusType || "Desconocido",
          statusId: response.PolicyPlanStatus.idPolicyPlanStatus
        });
      }
    } catch (error: any) {
      console.error("Error al cambiar el estado:", error);
      setErrorMessage("La solicitud falló. Por favor, intente nuevamente.");
    }
  };


  const handleDeletePolicyPlan = async () => {
    const response = await deletePolicyPlan(idPolicyPlan);
    if (response == 200) {
      router.push(`/policyPlans/`);
      setErrorMessage("");
    } else {
      if (response === 404) {
        setErrorMessage("No se encontró el plan de políticas. Verifique el ID proporcionado.");
      } else if (response === 400) {
        setErrorMessage("La solicitud es incorrecta. Por favor, revise los datos enviados.");
      } else {
        setErrorMessage("La solicitud falló. Por favor, intente nuevamente.");
      }
    }
  };

  return (
    <div className="p-0">
      <div className="bg-white p-6 rounded-lg shadow">
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold">Plan de Póliza</h2>
          <div className="flex items-center">
            <span className="text-black font-semibold mr-1">Plan póliza:</span>
            {policyPlan && (
              <span className="text-gray-700 font-semibold mr-2">
                {policyPlan.status}
              </span>
            )}
            <Button className="bg-darkBlue text-white mr-2" onClick={handleChangeStatus}>
              Cambiar Estatus
            </Button>
          </div>
        </div>


        {policyPlan && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Información del plan de póliza</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-300 rounded-md p-6">
              <div>
                <h4 className="text-gray-700 font-medium">Título de plan</h4>
                <p className="text-black font-bold">{policyPlan.title}</p>
              </div>
              <div>
                <h4 className="text-gray-700 font-medium">Precio base</h4>
                <p className="text-black font-bold">{policyPlan.basePrice} pesos</p>
              </div>
              <div>
                <h4 className="text-gray-700 font-medium">Plazo máximo</h4>
                <p className="text-black font-bold">{policyPlan.maxPeriod} meses</p>
              </div>
              <div className="col-span-3">
                <hr className="border-gray-300 my-4 mx-auto w-full" />
              </div>
              <div className="col-span-3">
                <h4 className="text-gray-700 font-medium">Descripción</h4>
                <p className="text-black font-bold break-words">{policyPlan.description}</p>
              </div>
            </div>
          </div>
        )}

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
              {services.map((service, index) => (
                <tr key={index} className="bg-white hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">{service.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{service.coveredCost || "-"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{service.isCovered ? "Sí" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            className="bg-red-500 text-white py-3 px-6 rounded-md"
            onClick={handleDeletePolicyPlan}
          >
            Eliminar plan de póliza
          </Button>
          <Button
            className="bg-darkBlue text-white py-3 px-6 rounded-md"
            onClick={() => router.push(`/policyPlanForm/${idPolicyPlan}`)}
            >
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PolicyPlanDetail;
