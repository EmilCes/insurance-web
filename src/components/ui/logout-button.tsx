"use client"

import { useAuth } from "@/lib/auth/authContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./button";
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from "./dropdown-menu";
import Image from "next/image";

const UserInfo = () => {
    const { logout, role } = useAuth();

    return (
        <div className="rounded-3xl text-white mr-8">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex flex-col ">
                        <Button
                            variant="outline"
                            className="bg-transparent border-none"
                        >
                            <Image 
                                src="/driver-icon.svg"
                                alt="Icono de conductor"
                                width={25}
                                height={25}
                            />
                            Usuario {role}
                        </Button>
                        <h6>
                        </h6>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white text-black rounded-sm">
                    <DropdownMenuRadioGroup>
                        <DropdownMenuRadioItem className="cursor-pointer" onClick={logout} value={""}>Cerrar sesión</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UserInfo;