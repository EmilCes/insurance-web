"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { registerEmployee, updateEmployee, getEmployeeInfo } from "@/api/employee.api";

interface EmployeeFormProps {
  isEditMode?: boolean;
  employeeId?: number; // Se usa para identificar al empleado a modificar
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ isEditMode = false, employeeId }) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    postalCode: "",
    address: "",
    idMunicipality: "",
    employeeNumber: "",
    idEmployeeType: "",
  });

  const [errors, setErrors] = useState({
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Cargar datos iniciales en modo edición
  useEffect(() => {
    if (isEditMode && employeeId) {
      const fetchEmployeeInfo = async () => {
        try {
          const employeeData = await getEmployeeInfo(employeeId); // Llamar al backend
          console.log("Employee data fetched:", employeeData); // Agrega un log para verificar
          setFormData({
            ...formData,
            name: employeeData.name || "",
            lastName: employeeData.lastName || "",
            dateOfBirth: employeeData.dateOfBirth
              ? new Date(employeeData.dateOfBirth).toISOString().split("T")[0]
              : "",
            email: employeeData.email || "",
            postalCode: employeeData.postalCode || "",
            address: employeeData.address || "",
            idMunicipality: employeeData.idMunicipality?.toString() || "",
            employeeNumber: employeeData.employeeNumber?.toString() || "",
            idEmployeeType: employeeData.idEmployeeType?.toString() || "",
            password: "", // No cargar la contraseña por seguridad
          });
        } catch (error) {
          console.error("Error fetching employee info:", error); // Agrega un log para errores
          toast({
            variant: "destructive",
            title: "Error",
            description: "No se pudo cargar la información del empleado.",
          });
        }
      };
  
      fetchEmployeeInfo();
    }
  }, [isEditMode, employeeId]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrors({
        ...errors,
        password: "La contraseña debe tener al menos 8 caracteres, incluir una letra y un carácter especial.",
      });
    } else {
      setErrors({
        ...errors,
        password: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (errors.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Corrige los errores en el formulario antes de continuar.",
      });
      return;
    }

    try {
      const requestData = {
        ...formData,
        dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
        idMunicipality: parseInt(formData.idMunicipality),
      };

      if (isEditMode && employeeId) {
        // Actualizar empleado
        await updateEmployee(employeeId, requestData);
        setSuccessMessage("El empleado fue actualizado con éxito.");
        toast({
          title: "Éxito",
          description: "El empleado fue actualizado con éxito.",
        });
      } else {
        // Registrar empleado
        await registerEmployee({
          ...requestData,
          employeeNumber: parseInt(formData.employeeNumber),
          idEmployeeType: parseInt(formData.idEmployeeType),
        });
        setSuccessMessage("El empleado fue registrado con éxito.");
        toast({
          title: "Éxito",
          description: "El empleado fue registrado con éxito.",
        });

        // Limpiar el formulario después del envío
        setFormData({
          name: "",
          lastName: "",
          dateOfBirth: "",
          email: "",
          password: "",
          postalCode: "",
          address: "",
          idMunicipality: "",
          employeeNumber: "",
          idEmployeeType: "",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Error al procesar el formulario.",
      });
    }
  };

  return (
    <div className="relative">
      {successMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              {successMessage}
            </h2>
            <button
              onClick={() => setSuccessMessage(null)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Apellido */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Código postal */}
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
              Código postal
            </label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Dirección */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Municipio */}
          <div>
            <label htmlFor="idMunicipality" className="block text-sm font-medium text-gray-700">
              Municipio
            </label>
            <select
              name="idMunicipality"
              id="idMunicipality"
              value={formData.idMunicipality}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Seleccione un municipio</option>
              <option value="1">Xalapa</option>
              <option value="2">Puebla</option>
            </select>
          </div>

          {/* Tipo de empleado */}
          {isEditMode ? (
            <div>
              <label htmlFor="idEmployeeType" className="block text-sm font-medium text-gray-700">
                Tipo de empleado
              </label>
              <input
                type="text"
                name="idEmployeeType"
                id="idEmployeeType"
                value={formData.idEmployeeType}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                disabled
              />
            </div>
          ) : (
            <div>
              <label htmlFor="idEmployeeType" className="block text-sm font-medium text-gray-700">
                Tipo de empleado
              </label>
              <select
                name="idEmployeeType"
                id="idEmployeeType"
                value={formData.idEmployeeType}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Seleccione un tipo</option>
                <option value="1">Administrador</option>
                <option value="2">Ejecutivo de asistencia</option>
                <option value="3">Ajustador</option>
              </select>
            </div>
          )}

          {/* Número de empleado */}
          {isEditMode ? (
            <div>
              <label htmlFor="employeeNumber" className="block text-sm font-medium text-gray-700">
                Número de empleado
              </label>
              <input
                type="text"
                name="employeeNumber"
                id="employeeNumber"
                value={formData.employeeNumber}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                disabled
              />
            </div>
          ) : (
            <div>
              <label htmlFor="employeeNumber" className="block text-sm font-medium text-gray-700">
                Número de empleado
              </label>
              <input
                type="number"
                name="employeeNumber"
                id="employeeNumber"
                value={formData.employeeNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {isEditMode ? "Actualizar" : "Registrar"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
