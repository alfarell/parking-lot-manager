import { FormEventHandler, useState } from "react";
import "./TransactionForm.css";
import { useParkingLotContext } from "../../context/ParkingLotProvider";
import { ParkingTransaction } from "../../types";
import Modal from "../Modal/Modal";

interface TransactionFormProps {
  parkingSpot: string;
  onClose: Function;
}

const durationMultiplier: Record<string, number> = {
  minutes: 60000,
  hours: 3600000,
  days: 86400000,
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  parkingSpot,
  onClose,
}) => {
  const { handleAddNewTransaction } = useParkingLotContext();
  const [success, setSuccess] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const targetForm = e.target as HTMLFormElement;
    const formElements: HTMLFormControlsCollection = targetForm.elements;
    const nameInput = formElements.namedItem("name") as HTMLInputElement;
    const licenceInput = formElements.namedItem("licence") as HTMLInputElement;
    const durationInput = formElements.namedItem(
      "duration"
    ) as HTMLInputElement;
    const durationType = formElements.namedItem(
      "duration-type"
    ) as HTMLInputElement;

    const durationInMs =
      Number(durationInput.value) * durationMultiplier[durationType.value];
    const generateId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    const data: ParkingTransaction = {
      id: generateId,
      name: nameInput.value,
      licence: licenceInput.value,
      parkingSpot,
      duration: Number(durationInput.value),
      durationMs: durationInMs,
      durationType: durationType.value,
      createdAt: Date.now(),
    };

    handleAddNewTransaction(data);
    setSuccess(true);
  };

  const handleCloseModal = () => {
    onClose();
    setSuccess(false);
  };

  return (
    <Modal
      title={success ? "Transaksi berhasil dibuat" : "Pesan tempat parkir"}
    >
      {success ? (
        <>
          <div></div>
          <button className='button-form' onClick={handleCloseModal}>
            Tutup
          </button>
        </>
      ) : (
        <>
          <div className='my-2 flex items-center text-lg'>
            Isi form pemesanan tempat parkir untuk Spot :{" "}
            <span className='bg-primary px-2 ml-2 text-white rounded'>
              {parkingSpot}
            </span>
          </div>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <label className='text-gray-700' htmlFor='name'>
              Nama
            </label>
            <input
              id='name'
              name='name'
              title='Nama'
              type='text'
              placeholder='Masukkan nama pelanggan'
              className='input-form'
            />
            <label className='text-gray-700' htmlFor='licence'>
              Plat nomor
            </label>
            <input
              id='licence'
              name='licence'
              title='Plat nomor'
              type='text'
              placeholder='Masukkan plat nomor pelanggan'
              className='input-form'
            />
            <label className='text-gray-700' htmlFor='duration'>
              Durasi
            </label>
            <div className='flex'>
              <input
                id='duration'
                name='duration'
                title='Durasi'
                type='number'
                min={0}
                placeholder='Masukkan durasi parkir'
                className='input-form w-full'
              />
              <select
                id='duration-type'
                name='duration-type'
                className='select-form'
              >
                <option value='minutes'>Menit</option>
                <option value='hours'>Jam</option>
                <option value='days'>Hari</option>
              </select>
            </div>
            <button type='submit' className='button-form-submit'>
              Buat pesanan
            </button>
            <button
              type='button'
              className='button-form-close'
              onClick={() => onClose()}
            >
              Batal
            </button>
          </form>
        </>
      )}
    </Modal>
  );
};

export default TransactionForm;
