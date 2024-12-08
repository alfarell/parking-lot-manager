import { Group, Image, Rect, Text } from "react-konva";
import useImage from "use-image";
import { ParkingTransaction } from "../../types";

import CarIcon from "../../assets/car-svgrepo-com.svg";
import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";

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
  filledColor = "#dc2626",
  emptyColor = "#16a34a",
  keyItemPrefix,
  dataFills,
  onSelect,
}) => {
  const [carIcon] = useImage(CarIcon);
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

  const handleClickSpot = (
    e: KonvaEventObject<MouseEvent>,
    spotKey: string
  ) => {
    if (e.evt.button !== 0) {
      e.evt.preventDefault();
      return;
    }
    onSelect(spotKey);
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
              onClick={(e) => handleClickSpot(e, spotKey)}
            />
            {isFilledSpot && (
              <Image
                image={carIcon}
                x={width / 2 - 25}
                y={height / 2 - 25}
                width={50}
                height={50}
              />
            )}
            <Text
              text={String(index + 1)}
              x={width / 2 - 12}
              y={height - 34}
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
