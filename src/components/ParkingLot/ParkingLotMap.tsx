import { Layer, Text } from "react-konva";
import { useParkingLotContext } from "../../context/ParkingLotProvider";
import ParkingLayoutFields from "./ParkingLayoutFields";
import { useTransactionFormContext } from "../../context/TransactionFormProvider";

const totalSpot: number = 10;
const spotWidth: number = 100;
const spotHeight: number = 150;
const totalSpotWidth: number = totalSpot * spotWidth;

const ParkingLotMap = () => {
  const { activeSessions } = useParkingLotContext();
  const { handleOpenModalForm } = useTransactionFormContext();

  const handleSpotClick = (id: string) => {
    handleOpenModalForm(id);
  };

  return (
    <>
      <Layer>
        <Text
          text='Denah Parkir'
          x={totalSpotWidth / 2 - 70}
          y={0}
          fontSize={24}
          fill='black'
        />
        <ParkingLayoutFields
          total={10}
          x={0}
          y={50}
          itemWidth={spotWidth}
          itemHeight={spotHeight}
          dataFills={activeSessions}
          keyItemPrefix='A-'
          onSelect={handleSpotClick}
        />
        <ParkingLayoutFields
          total={10}
          x={0}
          y={400}
          rotateCenter={180}
          itemWidth={spotWidth}
          itemHeight={spotHeight}
          dataFills={activeSessions}
          keyItemPrefix='B-'
          onSelect={handleSpotClick}
        />
        <ParkingLayoutFields
          total={10}
          x={0}
          y={600}
          itemWidth={spotWidth}
          itemHeight={spotHeight}
          dataFills={activeSessions}
          keyItemPrefix='C-'
          onSelect={handleSpotClick}
        />
        <ParkingLayoutFields
          total={10}
          x={0}
          y={950}
          rotateCenter={180}
          itemWidth={spotWidth}
          itemHeight={spotHeight}
          dataFills={activeSessions}
          keyItemPrefix='D-'
          onSelect={handleSpotClick}
        />
      </Layer>
    </>
  );
};

export default ParkingLotMap;
