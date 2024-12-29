import React from 'react'

const SessionExpired = ({setSessionExpired} : {setSessionExpired: (value: boolean)=> void}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg text-center z-50">
            <h2 className="text-xl font-bold mb-4">Sesión expirada</h2>
            <p>Tu sesión ha caducado. Por favor, inicia sesión nuevamente.</p>
            <button
              onClick={() => {
                setSessionExpired(false);
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Aceptar
            </button>
          </div>
        </div>
  )
}

export default SessionExpired