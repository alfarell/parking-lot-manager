import "./ParkingListPage.css";
import { useParkingLotContext } from "../context/ParkingLotProvider";
import { calculateTimeRemaining } from "../utils";
import { useState } from "react";
import { Modal } from "../components";
import { ParkingTransaction } from "../types";

const convertEpochToDate = (timeMs: number) => {
  return new Date(timeMs).toLocaleString();
};

type SelectedSessionState = ParkingTransaction | null | undefined;

const ParkingListPage = () => {
  const { activeSessions, handleEndParkingSession } = useParkingLotContext();

  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [selectedSession, setSelectedSession] =
    useState<SelectedSessionState>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleOpenDialog = (data: ParkingTransaction) => {
    setConfirmDialog(true);
    setSelectedSession(data);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialog(false);
  };

  const handleConfirm = (data: SelectedSessionState) => {
    handleEndParkingSession(data?.id);
    handleCloseConfirmDialog();
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSelectedSession(null);
  };

  return (
    <div className='parking-list-page-wrapper'>
      <h1 className='parking-page-header'>Daftar Sesi Parkir Aktif</h1>
      <div className='parking-table-container'>
        <table className='parking-table'>
          <thead className='parking-table-head'>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Plat nomor</th>
              <th>Spot parkir</th>
              <th>Durasi</th>
              <th>Sisa waktu</th>
              <th>Waktu masuk</th>
              <th>Action</th>
            </tr>
          </thead>
          {!!activeSessions?.length && (
            <tbody>
              {activeSessions.map((activeSession, index) => {
                const { isExceeded, resultText } = calculateTimeRemaining({
                  dateStart: activeSession.createdAt,
                  duration: activeSession.durationMs,
                });
                const formatTime = isExceeded
                  ? `Waktu terlewat ${resultText}`
                  : resultText;
                const formatTimeDuration = `${activeSession.duration} ${activeSession.durationType}`;

                return (
                  <tr key={index} className='parking-table-item'>
                    <td>{index + 1}</td>
                    <td>{activeSession.name}</td>
                    <td>{activeSession.licence}</td>
                    <td>{activeSession.parkingSpot}</td>
                    <td>{formatTimeDuration}</td>
                    <td data-time-exceeded={isExceeded}>{formatTime}</td>
                    <td>{convertEpochToDate(activeSession.createdAt)}</td>
                    <td>
                      <button
                        className='parking-end-session'
                        onClick={() => handleOpenDialog(activeSession)}
                      >
                        Akhiri sesi
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {!activeSessions?.length && (
          <div className='parking-table-nodata'>Tidak ada sesi aktif</div>
        )}
      </div>

      {confirmDialog && (
        <Modal title='Akhiri sesi'>
          <div className='confirm-modal-contents'>
            <p>Apakah anda yakin ingin mengakhiri sesi parkir untuk spot :</p>
            <span className='content-spot-badge'>
              {selectedSession?.parkingSpot}
            </span>
            <p>
              Dengan nama pelanggan : <b>{selectedSession?.name}</b>
            </p>
          </div>
          <div className='confirm-modal-actions'>
            <button
              type='button'
              className='button-close'
              onClick={handleCloseConfirmDialog}
            >
              Batal
            </button>
            <button
              type='button'
              className='button-confirm'
              onClick={() => handleConfirm(selectedSession)}
            >
              Ya
            </button>
          </div>
        </Modal>
      )}

      {showSuccess && (
        <Modal title='Berhasil'>
          <div className='confirm-modal-contents'>
            <p>Sesi parkir untuk spot :</p>
            <span className='content-spot-badge'>
              {selectedSession?.parkingSpot}
            </span>
            <p>telah berakhir</p>
          </div>
          <div className='confirm-modal-actions'>
            <button
              type='button'
              className='button-close'
              onClick={handleCloseSuccess}
            >
              Tutup
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ParkingListPage;
