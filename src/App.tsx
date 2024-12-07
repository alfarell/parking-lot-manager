import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import ParkingLotProvider from "./context/ParkingLotProvider";
import { HomePage, ParkingListPage, TransactionListPage } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <ParkingLotProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/parking-list' element={<ParkingListPage />} />
            <Route path='/transaction-list' element={<TransactionListPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ParkingLotProvider>
  );
}

export default App;
