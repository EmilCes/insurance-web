import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface StatusContextType {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    showMessageError: boolean;
    setShowMessageError: (showMessageError : boolean) => void;
}

export const StatusPageContext = createContext<StatusContextType | undefined>(undefined);

export const StatusPageProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMessageError, setShowMessageError] = useState<boolean>(false);


  const value: StatusContextType = {
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    showMessageError: showMessageError,
    setShowMessageError: setShowMessageError
  };

  return (
    <StatusPageContext.Provider value={value}>
      {children}
    </StatusPageContext.Provider>
  );
};

export const useStatusPageContext = () => {
    const context = useContext(StatusPageContext);
    if(!context){
        throw new Error("useStatusPageContext must be used within a StatusPageProvider");
    }
    return context;
}