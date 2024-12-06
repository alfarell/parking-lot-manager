import { useState } from "react";
import { Stage, Layer, Text } from "react-konva";
import ParkingLayoutFields from "./ParkingLayoutFields";

const spotWidth: number = 100;
const spotHeight: number = 150;

const ParkingLot: React.FC = () => {
  const [parkingSpots, setParkingSpots] = useState<string[]>([]);

  const handleSlotClick = (id: string) => {
    setParkingSpots((prevSpots) => {
      if (prevSpots.includes(id)) {
        return prevSpots.filter((item) => item !== id);
      }
      return [...prevSpots, id];
    });
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
            dataFills={parkingSpots}
            keyItemPrefix='A-'
            onSelect={handleSlotClick}
          />
          <ParkingLayoutFields
            total={10}
            x={400}
            y={400}
            itemWidth={spotWidth}
            itemHeight={spotHeight}
            dataFills={parkingSpots}
            keyItemPrefix='B-'
            onSelect={handleSlotClick}
          />
          <ParkingLayoutFields
            total={10}
            x={400}
            y={600}
            itemWidth={spotWidth}
            itemHeight={spotHeight}
            dataFills={parkingSpots}
            keyItemPrefix='C-'
            onSelect={handleSlotClick}
          />
          <ParkingLayoutFields
            total={10}
            x={400}
            y={950}
            itemWidth={spotWidth}
            itemHeight={spotHeight}
            dataFills={parkingSpots}
            keyItemPrefix='D-'
            onSelect={handleSlotClick}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default ParkingLot;
