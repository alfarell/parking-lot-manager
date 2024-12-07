import { useState } from "react";
import { ParkingLot, TransactionForm } from "../../components";

const HomePage = () => {
  const [parkingSpots, setParkingSpots] = useState<string>("");
  const [openModalForm, setOpenModalForm] = useState<boolean>(false);

  const handleSpotClick = (id: string) => {
    setParkingSpots(id);
    setOpenModalForm(true);
  };

  const handleCloseModalForm = () => {
    setParkingSpots("");
    setOpenModalForm(false);
  };

  return (
    <>
      <ParkingLot onItemSelect={handleSpotClick} />

      {openModalForm && (
        <TransactionForm
          parkingSpot={parkingSpots}
          onClose={handleCloseModalForm}
        />
      )}
    </>
  );
};

export default HomePage;
