import { useState } from "react";
import { Stage, Layer, Text } from "react-konva";
import ParkingLayoutFields from "../ParkingLayoutFields/ParkingLayoutFields";
import TransactionForm from "../TransactionForm/TransactionForm";
import { useParkingLotContext } from "../../context/ParkingLotProvider";

const spotWidth: number = 100;
const spotHeight: number = 150;

const ParkingLot: React.FC = () => {
  const { activeSessions } = useParkingLotContext();
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
    <div className='w-full min-h-screen'>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text='Denah Parkir' x={20} y={0} fontSize={24} fill='black' />
          <ParkingLayoutFields
            total={10}
            x={400}
            y={50}
            itemWidth={spotWidth}
            itemHeight={spotHeight}
            dataFills={activeSessions}
            keyItemPrefix='A-'
            onSelect={handleSpotClick}
          />
          <ParkingLayoutFields
            total={10}
            x={400}
            y={400}
            itemWidth={spotWidth}
            itemHeight={spotHeight}
            dataFills={activeSessions}
            keyItemPrefix='B-'
            onSelect={handleSpotClick}
          />
          <ParkingLayoutFields
            total={10}
            x={400}
            y={600}
            itemWidth={spotWidth}
            itemHeight={spotHeight}
            dataFills={activeSessions}
            keyItemPrefix='C-'
            onSelect={handleSpotClick}
          />
          <ParkingLayoutFields
            total={10}
            x={400}
            y={950}
            itemWidth={spotWidth}
            itemHeight={spotHeight}
            dataFills={activeSessions}
            keyItemPrefix='D-'
            onSelect={handleSpotClick}
          />
        </Layer>
      </Stage>

      {openModalForm && (
        <TransactionForm
          parkingSpot={parkingSpots}
          onClose={handleCloseModalForm}
        />
      )}
    </div>
  );
};

export default ParkingLot;
