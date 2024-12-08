import { Arrow, Layer, Text } from "react-konva";
import { totalSpotWidth } from "../../const/parking-lot-const";

interface ParkingLotRoadDirectinProps {}
const ParkingLotRoadDirectin: React.FC<ParkingLotRoadDirectinProps> = () => {
  return (
    <Layer>
      <Text x={-130} y={10} text='Masuk' fontSize={20} fill='black' />
      <Arrow
        x={0}
        y={50}
        rotation={90}
        points={[0, 100, 150, 100]}
        pointerLength={15}
        pointerWidth={20}
        fill='black'
        stroke='black'
        strokeWidth={10}
      />
      <Arrow
        x={totalSpotWidth / 2 - 100}
        y={200}
        points={[0, 100, 200, 100]}
        pointerLength={15}
        pointerWidth={20}
        fill='black'
        stroke='black'
        strokeWidth={10}
      />
      <Arrow
        x={totalSpotWidth + 300}
        y={480}
        rotation={90}
        points={[0, 100, 200, 100]}
        pointerLength={15}
        pointerWidth={20}
        fill='black'
        stroke='black'
        strokeWidth={10}
      />
      <Arrow
        x={totalSpotWidth / 2 + 100}
        y={950}
        rotation={180}
        points={[0, 100, 200, 100]}
        pointerLength={15}
        pointerWidth={20}
        fill='black'
        stroke='black'
        strokeWidth={10}
      />
      <Arrow
        x={0}
        y={950}
        rotation={90}
        points={[0, 100, 150, 100]}
        pointerLength={15}
        pointerWidth={20}
        fill='black'
        stroke='black'
        strokeWidth={10}
      />
      <Text x={-130} y={1130} text='Keluar' fontSize={20} fill='black' />
    </Layer>
  );
};

export default ParkingLotRoadDirectin;
