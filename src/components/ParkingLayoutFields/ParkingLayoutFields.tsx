import { Group, Rect, Text } from "react-konva";
import { ParkingTransaction } from "../../types";

interface CreateParkingLayoutProps {
  total: number;
  x?: number;
  y?: number;
  rotateCenter?: number;
  itemWidth: number;
  itemHeight: number;
  filledColor?: string;
  emptyColor?: string;
  keyItemPrefix: string;
  dataFills: ParkingTransaction[];
  onSelect: Function;
}

const ParkingLayoutFields: React.FC<CreateParkingLayoutProps> = ({
  total,
  x = 0,
  y = 0,
  rotateCenter,
  itemWidth,
  itemHeight,
  filledColor = "red",
  emptyColor = "green",
  keyItemPrefix,
  dataFills,
  onSelect,
}) => {
  const defineX = () => {
    if (rotateCenter) {
      const totalWidth = total * itemWidth + x;
      return totalWidth;
    }

    return x;
  };

  const defineY = () => {
    if (rotateCenter) {
      const totalHeight = itemHeight + y;
      return totalHeight;
    }

    return y;
  };

  return (
    <Group x={defineX()} y={defineY()} rotation={rotateCenter}>
      {[...new Array(total)].map((_, index) => {
        const itemNumber: number = index + 1;
        const itemXPoint: number = index * itemWidth;
        const itemYPoint: number = 0;
        const width: number = itemWidth;
        const height: number = itemHeight;
        const spotKey: string = `${keyItemPrefix}${itemNumber}`;
        const isFilledSpot = dataFills.find(
          (item) => item.parkingSpot === spotKey
        );

        return (
          <Group key={index} x={itemXPoint} y={itemYPoint}>
            <Rect
              key={index}
              x={0}
              y={0}
              width={width}
              height={height}
              fill={isFilledSpot ? filledColor : emptyColor}
              stroke='black'
              strokeWidth={2}
              onClick={() => onSelect(spotKey)}
              onTouchEnd={() => onSelect(spotKey)}
            />
            <Text
              text={String(index + 1)}
              x={width / 2 - 12}
              y={height / 2 - 12}
              fontSize={24}
              fill='black'
            />
          </Group>
        );
      })}
    </Group>
  );
};

export default ParkingLayoutFields;
