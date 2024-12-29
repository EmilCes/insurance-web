import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

const NoItemsPolicy = () => {
    const router = useRouter();
    const noItemsImage = '/noitems-image.png';

    return (
        <>
            <div className='flex items-center justify-center flex-col h-full border-slate-300 border rounded-xl m-4' >
                <div
                    className="flex items-center justify-between h-20 mx-auto"
                    style={{
                        backgroundImage: `url(${noItemsImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: "180px",
                        height: "180px"
                    }}
                ></div>
                <h1 className='text-xl font-semibold mb-2 text-darkBlue'>Todavía no hay pólizas registradas</h1>
                <h2 className='text-alternGray'>Si adquiere una póliza podrá consultarla aquí</h2>
                <Button
                    className="mt-2 min-h-8 bg-white text-alternGray border border-alternGray hover:text-white"
                    onClick={() => router.push("/dashboard")}>
                    Regresar a inicio
                </Button>
            </div>
        </>
    )
}

export default NoItemsPolicy