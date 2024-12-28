import React from 'react'

const ProgressInPolicyForm = ({ currentStep }: { currentStep: number }) => {

    return (
        <>
            <div className='grid grid-cols-3 bg-sky-100 px-8 pt-4 pb-4'>
                <div className='row-start-1 col-start-1 col-span-3 w-2/3 h-0.5 m-auto'
                    style={currentStep < 2 ?
                        { background: "linear-gradient(90deg, rgba(9,105,114,1) 0%, rgba(208,213,221,1) 10%)" } :
                        currentStep == 2 ?
                            {background: "linear-gradient(90deg, rgba(9,105,114,1) 50%, rgba(208,213,221,1) 65%)"} :
                            {background: "linear-gradient(90deg, rgba(9,105,114,1) 95%, rgba(208,213,221,1) 100%)"}
                    }>
                </div>
                <div className="row-start-1 col-start-1 m-auto flex items-center justify-center w-10 h-10 bg-teal-700 text-white font-bold rounded-full">
                    1
                </div>
                <div className={currentStep >= 2 ? "row-start-1 col-start-2 m-auto flex items-center justify-center w-10 h-10 bg-teal-700 text-white font-bold rounded-full" :
                    "row-start-1 col-start-2 m-auto flex items-center justify-center w-10 h-10 bg-gray-400 text-white font-bold rounded-full"}>
                    2
                </div>
                <div className={currentStep >= 3 ? "row-start-1 col-start-3 m-auto flex items-center justify-center w-10 h-10 bg-teal-700 text-white font-bold rounded-full" :
                    "row-start-1 col-start-3 m-auto flex items-center justify-center w-10 h-10 bg-gray-400 text-white font-bold rounded-full"}>
                    3
                </div>
                <p className="col-start-1 row-start-2 m-auto text-teal-700 mt-2 text-sm">Información vehículo</p>
                <p className={currentStep >= 2 ? "col-start-2 row-start-2 m-auto text-teal-700 mt-2 text-sm" :
                    "col-start-2 row-start-2 m-auto text-gray-400 mt-2 text-sm"}>Selección plan póliza</p>
                <p className={currentStep >= 3 ? "col-start-3 row-start-2 m-auto text-teal-700 mt-2 text-sm" :
                    "col-start-3 row-start-2 m-auto text-gray-400 mt-2 text-sm"}>Información de pago</p>
            </div>
        </>
    );
};
export default ProgressInPolicyForm
