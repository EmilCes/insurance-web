import { fetchWithAuth } from "./fetchWithAuth";

// Registrar empleado
export async function registerEmployee(employeeData: any) {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al registrar el empleado");
  }

  return await response.json();
}

// Actualizar empleado
export async function updateEmployee(id: number, employeeData: any) {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/employee/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al actualizar el empleado");
  }

  return await response.json();
}

// Obtener información del empleado autenticado
export async function getEmployeeInfo(employeeId: number) {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/employee/account/info`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al obtener la información del empleado");
  }

  return await response.json();
}
