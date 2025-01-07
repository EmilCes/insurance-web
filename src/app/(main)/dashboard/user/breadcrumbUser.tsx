"use client";
// BreadcrumbUserPage.tsx
import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbUserPageProps {
    isModifying?: boolean;
}

const BreadcrumbUserPage: React.FC<BreadcrumbUserPageProps> = ({ isModifying = false }) => {
    return (
        <div className="bg-sky-100">
            <div className="mx-auto w-full max-w-screen-lg py-1 ml-8 md:ml-20">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/user">Usuarios</BreadcrumbLink>
                        </BreadcrumbItem>

                        {isModifying && (
                            <>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Modificar usuario</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
};

export default BreadcrumbUserPage;
