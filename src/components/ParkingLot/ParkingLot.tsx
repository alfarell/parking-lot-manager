import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Text } from "react-konva";
import Konva from "konva";
import ParkingLayoutFields from "../ParkingLayoutFields/ParkingLayoutFields";
import { useParkingLotContext } from "../../context/ParkingLotProvider";

const totalSpot: number = 10;
const spotWidth: number = 100;
const spotHeight: number = 150;
const totalSpotWidth: number = totalSpot * spotWidth;

const baseMaxScreenWidth: number = 2000;
const baseMinScreenWidth: number = 700;
const baseScaler: number = 1;
// const basePortraitScaler: number = 0.3;
const maxScale: number = 3;
const minScale: number = 0.8;

interface ParkingLotProps {
  onItemSelect: Function;
}

const ParkingLot: React.FC<ParkingLotProps> = ({ onItemSelect }) => {
  const { activeSessions } = useParkingLotContext();

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);

  const handleSpotClick = (id: string) => {
    onItemSelect(id);
  };

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage: any = stageRef.current;

    if (stage) {
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();

      // Zoom factor
      const scaleBy = 1.1;
      const newScale =
        e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

      // Update position and scale
      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };

      if (newScale >= maxScale || newScale <= minScale) return;

      setScale(newScale);
      setPosition(newPos);
    }
  };

  const handleDragMove = (e: any) => {
    const newPos = { x: e.target.x(), y: e.target.y() };
    setPosition(newPos);
  };

  const updateOrientation = () => {
    const minimumScreen =
      window.innerWidth > baseMinScreenWidth
        ? window.innerWidth
        : baseMinScreenWidth;
    const scaler: number =
      window.innerWidth > baseMaxScreenWidth
        ? baseScaler
        : minimumScreen / baseMaxScreenWidth;

    const halfOfScren: number = window.innerWidth / 2;
    const halfOfContent: number = ((totalSpot * spotWidth) / 2) * scaler;

    // set stage to center
    const updateCenter: number = halfOfScren - halfOfContent;
    setPosition({
      x: updateCenter,
      y: 50,
    });
    setScale(scaler);
  };

  useEffect(() => {
    updateOrientation();
    window.addEventListener("resize", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
    };
  }, []);

  return (
    <div className='overflow-hidden'>
      <Stage
        className='bg-gray-400'
        width={window.innerWidth}
        height={window.innerHeight}
        draggable
        onDragMove={handleDragMove}
        drag
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
        onWheel={handleWheel}
        ref={stageRef}
      >
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
      </Stage>
    </div>
  );
};

export default ParkingLot;
