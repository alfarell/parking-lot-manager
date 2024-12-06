import "./App.css";
import { Navbar, ParkingLot } from "./components";
import ParkingLotProvider from "./context/ParkingLotProvider";

function App() {
  return (
    <ParkingLotProvider>
      <Navbar />
      <main>
        <ParkingLot />
      </main>
    </ParkingLotProvider>
  );
}

export default App;
