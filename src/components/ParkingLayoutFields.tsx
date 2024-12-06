import { Group, Rect, Text } from "react-konva";

interface CreateParkingLayoutProps {
  total: number;
  x?: number;
  y?: number;
  itemWidth: number;
  itemHeight: number;
  filledColor?: string;
  emptyColor?: string;
  keyItemPrefix: string;
  dataFills: string[];
  onSelect: Function;
}

const ParkingLayoutFields: React.FC<CreateParkingLayoutProps> = ({
  total,
  x = 0,
  y = 0,
  itemWidth,
  itemHeight,
  filledColor = "red",
  emptyColor = "green",
  keyItemPrefix,
  dataFills,
  onSelect,
}) => {
  return [...new Array(total)].map((_, index) => {
    const itemXPoint: number = index * itemWidth + x;
    const itemYPoint: number = y;
    const width: number = itemWidth;
    const height: number = itemHeight;
    const spotKey: string = `${keyItemPrefix}-${index}`;
    const isFilledSpot: boolean = dataFills.includes(spotKey);

    return (
      <Group x={itemXPoint} y={itemYPoint}>
        <Rect
          key={index}
          x={0}
          y={0}
          width={width}
          height={height}
          fill={isFilledSpot ? filledColor : emptyColor}
          stroke='black'
          strokeWidth={2}
          onClick={() => onSelect?.(spotKey)}
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
  });
};

export default ParkingLayoutFields;
