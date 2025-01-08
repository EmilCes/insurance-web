"use client";

import React from "react";
import EmployeeForm from "@/components/forms/employee.form"; // Formulario que ya creaste
import isCorrectRole from "@/lib/auth/isCorrectRole";
import isAuth from "@/lib/auth/isAuth";
import Layout from "../layout"; // Importamos el layout reutilizable

const EmployeeRegisterPage = () => {
  return (
    <Layout title="Registro de empleados">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Encabezado */}
        <div className="text-center sm:text-left">
          <h2 className="font-semibold text-2xl">Registro de empleado</h2>
          <h3 className="text-sm text-gray-500 mt-2">
            Ingrese los datos del nuevo empleado.
          </h3>
        </div>

        {/* Formulario */}
        <div className="mt-8">
          <EmployeeForm isEditMode={false} /> {/* Indicamos que no es modo edición */}
        </div>
      </div>
    </Layout>
  );
};

export default isAuth(isCorrectRole(EmployeeRegisterPage, "Administrador"));
