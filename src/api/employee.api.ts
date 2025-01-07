import { fetchWithAuth } from "./fetchWithAuth";

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
