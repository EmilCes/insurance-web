"use client";

import React from "react";
import EmployeeForm from "@/components/forms/employee.form"; // Reutilizamos el mismo formulario
import isAuth from "@/lib/auth/isAuth";
import Layout from "../layout"; // Reutilizamos el layout

const EmployeeModifyPage = () => {
  return (
    <Layout title="Modificar información del empleado">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Encabezado */}
        <div className="text-center sm:text-left">
          <h2 className="font-semibold text-2xl">Modificar empleado</h2>
          <h3 className="text-sm text-gray-500 mt-2">
            Actualice los datos del empleado.
          </h3>
        </div>

        {/* Formulario */}
        <div className="mt-8">
          <EmployeeForm isEditMode={true} /> {/* Indicamos que es modo edición */}
        </div>
      </div>
    </Layout>
  );
};

export default isAuth(EmployeeModifyPage);
