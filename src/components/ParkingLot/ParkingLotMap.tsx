import { Layer, Text } from "react-konva";
import { useParkingLotContext } from "../../context/ParkingLotProvider";
import ParkingLayoutFields from "./ParkingLayoutFields";
import { useTransactionFormContext } from "../../context/TransactionFormProvider";
import {
  spotHeight,
  spotWidth,
  totalSpot,
  totalSpotWidth,
} from "../../const/parking-lot-const";
import React from "react";

const labelXPos = spotWidth * totalSpot + 20;
const labelSize = 50;

const layoutFieldsData = [
  {
    label: "A",
    xPos: 0,
    yPos: 50,
    rotateCenter: 0,
  },
  {
    label: "B",
    xPos: 0,
    yPos: 400,
    rotateCenter: 180,
  },
  {
    label: "C",
    xPos: 0,
    yPos: 600,
    rotateCenter: 0,
  },
  {
    label: "D",
    xPos: 0,
    yPos: 950,
    rotateCenter: 180,
  },
];

const ParkingLotMap = () => {
  const { activeSessions } = useParkingLotContext();
  const { handleOpenModalForm } = useTransactionFormContext();

  const handleSpotClick = (id: string) => {
    handleOpenModalForm(id);
  };

  return (
    <Layer>
      <Text
        text='Denah Parkir'
        x={totalSpotWidth / 2 - 70}
        y={0}
        fontSize={24}
        fill='black'
      />

      {layoutFieldsData.map((field, index) => {
        return (
          <React.Fragment key={index}>
            <Text
              text={field.label}
              x={labelXPos}
              y={field.yPos}
              fontSize={labelSize}
              fill='black'
            />
            <ParkingLayoutFields
              total={10}
              x={field.xPos}
              y={field.yPos}
              rotateCenter={field.rotateCenter}
              itemWidth={spotWidth}
              itemHeight={spotHeight}
              dataFills={activeSessions}
              keyItemPrefix={field.label}
              onSelect={handleSpotClick}
            />
          </React.Fragment>
        );
      })}
    </Layer>
  );
};

export default ParkingLotMap;
