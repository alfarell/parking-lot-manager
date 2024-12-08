import { ParkingLot } from "../../components";
import TransactionFormProvider from "../../context/TransactionFormProvider";

const HomePage = () => {
  return (
    <TransactionFormProvider>
      <ParkingLot />
    </TransactionFormProvider>
  );
};

export default HomePage;
