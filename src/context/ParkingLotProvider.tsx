import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ParkingTransaction } from "../types";

interface ParkingLotContextType {
  transactions: ParkingTransaction[];
  activeSessions: ParkingTransaction[];
  handleAddNewTransaction: Function;
}

export const ParkingLotContext = createContext<ParkingLotContextType>({
  transactions: [],
  activeSessions: [],
  handleAddNewTransaction: () => {},
});

export const useParkingLotContext = () => useContext(ParkingLotContext);

const ParkingLotProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // all time transaction history
  const [transactions, setTransactions] = useState<ParkingTransaction[]>(() => {
    const savedTransactions = localStorage.getItem("saved-transactions");
    const parseData = JSON.parse(savedTransactions || "[]");

    return parseData;
  });
  // current active parking session
  const [activeSessions, setActiveSessions] = useState<ParkingTransaction[]>(
    () => {
      const savedTransactions = localStorage.getItem("saved-sessions");
      const parseData = JSON.parse(savedTransactions || "[]");

      return parseData;
    }
  );

  const handleAddNewTransaction = (data: ParkingTransaction): void => {
    const addTransaction = [...transactions, data];
    const addSession = [...activeSessions, data];

    setTransactions(addTransaction);
    setActiveSessions(addSession);

    localStorage.setItem("saved-transactions", JSON.stringify(addTransaction));
    localStorage.setItem("saved-sessions", JSON.stringify(addSession));
  };

  return (
    <ParkingLotContext.Provider
      value={{
        transactions,
        activeSessions,
        handleAddNewTransaction,
      }}
    >
      {children}
    </ParkingLotContext.Provider>
  );
};

export default ParkingLotProvider;
