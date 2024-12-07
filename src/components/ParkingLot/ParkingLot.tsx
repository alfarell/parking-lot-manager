import { Stage, Layer, Text } from "react-konva";
import ParkingLayoutFields from "../ParkingLayoutFields/ParkingLayoutFields";
import { useParkingLotContext } from "../../context/ParkingLotProvider";

const spotWidth: number = 100;
const spotHeight: number = 150;

interface ParkingLotProps {
  onItemSelect: Function;
}

const ParkingLot: React.FC<ParkingLotProps> = ({ onItemSelect }) => {
  const { activeSessions } = useParkingLotContext();

  const handleSpotClick = (id: string) => {
    onItemSelect(id);
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
    </div>
  );
};

export default ParkingLot;
