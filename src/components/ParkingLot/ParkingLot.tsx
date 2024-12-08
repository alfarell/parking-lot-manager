import { useEffect, useRef, useState } from "react";
import { Stage } from "react-konva";
import Konva from "konva";
import ParkingLotRoadDirectin from "./ParkingLotRoadDirectin";
import ParkingLotMap from "./ParkingLotMap";
import { spotWidth, totalSpot } from "../../const/parking-lot-const";

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
interface ParkingLotProps {}

const ParkingLot: React.FC<ParkingLotProps> = () => {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<PositionState>({
    x: 0,
    y: 0,
  });
  const stageRef = useRef<Konva.Stage>(null);

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
        <ParkingLotMap />
        <ParkingLotRoadDirectin />
      </Stage>
    </div>
  );
};

export default ParkingLot;
