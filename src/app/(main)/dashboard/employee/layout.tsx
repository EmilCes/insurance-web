"use client";
import React from "react";
import TitleBar from "@/components/dashboard/TitleBar";

const Layout = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div className="min-h-screen">
      {/* Título dinámico */}
      <TitleBar title={title}></TitleBar>

      {/* Contenido dinámico */}
      <div className="flex justify-center items-center bg-white">
        <div className="w-full m-0 p-0">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
