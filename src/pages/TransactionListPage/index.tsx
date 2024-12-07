import "./TransactionListPage.css";
import { useParkingLotContext } from "../../context/ParkingLotProvider";
import {
  convertEpochToDate,
  formatTimeTypeToLocale,
  formatTotalTime,
} from "../../utils";

const TransactionListPage = () => {
  const { transactions } = useParkingLotContext();
  return (
    <div className='transaction-page-wrapper'>
      <h1 className='transaction-page-header'>Daftar Transaksi</h1>
      <div className='table-wrapper'>
        <table className='table-container'>
          <thead className='table-head'>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Plat nomor</th>
              <th>Spot parkir</th>
              <th>Durasi</th>
              <th>Melebihi durasi</th>
              <th>Waktu masuk</th>
              <th>Waktu berakhir</th>
            </tr>
          </thead>
          {!!transactions?.length && (
            <tbody>
              {transactions.map((transaction, index) => {
                const {
                  id,
                  name,
                  licence,
                  parkingSpot,
                  duration,
                  durationType,
                  durationMs,
                  createdAt,
                  closedAt,
                } = transaction;

                const timeCheckout = closedAt ? closedAt - createdAt : 0;
                const { totalTimeText } = formatTotalTime(timeCheckout);

                const isExceeded = timeCheckout > durationMs;
                const formatTime = isExceeded ? totalTimeText : "-";
                const formatDurationType = formatTimeTypeToLocale(durationType);
                const formatTimeDuration = `${duration} ${formatDurationType}`;

                return (
                  <tr key={id} className='table-item'>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{licence}</td>
                    <td>{parkingSpot}</td>
                    <td>{formatTimeDuration}</td>
                    <td data-time-exceeded={isExceeded}>{formatTime}</td>
                    <td>{convertEpochToDate(createdAt)}</td>
                    <td>{closedAt && convertEpochToDate(closedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {!transactions?.length && (
          <div className='table-nodata'>Tidak ada sesi aktif</div>
        )}
      </div>
    </div>
  );
};

export default TransactionListPage;
