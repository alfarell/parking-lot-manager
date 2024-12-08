import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Text, Arrow } from "react-konva";
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

interface PositionState {
  x: number;
  y: number;
}
interface ParkingLotProps {
  onItemSelect: Function;
}

const ParkingLot: React.FC<ParkingLotProps> = ({ onItemSelect }) => {
  const { activeSessions } = useParkingLotContext();

  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<PositionState>({
    x: 0,
    y: 0,
  });
  const stageRef = useRef<Konva.Stage>(null);

  const handleSpotClick = (id: string) => {
    onItemSelect(id);
  };

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = stageRef.current;

    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    if (!pointer || !oldScale) return;

    // Zoom factor
    const scaleBy = 1.1;
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    if (newScale >= maxScale || newScale <= minScale) return;

    // Update position and scale
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    setScale(newScale);
    setPosition(newPos);
  };

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    const newPos = { x: e.target.x(), y: e.target.y() };
    setPosition(newPos);
  };

  const updateOrientation = () => {
    const minimumScreen: number =
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
            x={totalSpotWidth + 200}
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
      </Stage>
    </div>
  );
};

export default ParkingLot;
