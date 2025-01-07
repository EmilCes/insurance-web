"use client";
import React from "react";
import TitleBar from "@/components/dashboard/TitleBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      {/* Título para el módulo de empleados */}
      <TitleBar title="Registro de empleados"></TitleBar>

      {/* Contenido dinámico */}
      <div className="flex justify-center items-center bg-white">
        <div className="w-full m-0 p-0">{children}</div>
      </div>
    </div>
  );
};

export default layout;
