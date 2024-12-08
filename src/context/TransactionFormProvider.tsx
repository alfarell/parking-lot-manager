import { createContext, PropsWithChildren, useContext, useState } from "react";
import { TransactionForm } from "../components";

interface TransactionFormContextType {
  isModalOpen: boolean;
  selectedParkingSpot: string;
  handleOpenModalForm: Function;
  handleCloseModalForm: Function;
}

export const TransactionFormContext = createContext<TransactionFormContextType>(
  {
    isModalOpen: false,
    selectedParkingSpot: "",
    handleOpenModalForm: () => {},
    handleCloseModalForm: () => {},
  }
);

export const useTransactionFormContext = () =>
  useContext(TransactionFormContext);

const TransactionFormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedParkingSpot, setSelectedParkingSpot] = useState<string>("");

  const handleOpenModalForm = (id: string) => {
    setSelectedParkingSpot(id);
    setIsModalOpen(true);
  };

  const handleCloseModalForm = () => {
    setSelectedParkingSpot("");
    setIsModalOpen(false);
  };

  return (
    <TransactionFormContext.Provider
      value={{
        isModalOpen,
        selectedParkingSpot,
        handleOpenModalForm,
        handleCloseModalForm,
      }}
    >
      {children}
      <TransactionForm />
    </TransactionFormContext.Provider>
  );
};

export default TransactionFormProvider;
