import { FormEventHandler, useState } from "react";
import "./TransactionForm.css";
import { useParkingLotContext } from "../../context/ParkingLotProvider";
import { useTransactionFormContext } from "../../context/TransactionFormProvider";
import { ParkingTransaction } from "../../types";
import Modal from "../Modal/Modal";

interface TransactionFormProps {}

const durationMultiplier: Record<string, number> = {
  minutes: 60000,
  hours: 3600000,
  days: 86400000,
};

const TransactionForm: React.FC<TransactionFormProps> = () => {
  const { isModalOpen, selectedParkingSpot, handleCloseModalForm } =
    useTransactionFormContext();
  const { handleAddNewTransaction } = useParkingLotContext();

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string }>({ message: "" });

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

    const nameValue = nameInput.value;
    const licenceValue = licenceInput.value;
    const durationValue = durationInput.value;

    if (!nameValue) return setError({ message: "Nama harus diisi" });
    if (!licenceValue) return setError({ message: "Plat nomor harus diisi" });
    if (!durationValue) return setError({ message: "Durasi harus diisi" });

    setError({ message: "" });

    const durationInMs =
      Number(durationInput.value) * durationMultiplier[durationType.value];
    const generateId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);

    const data: ParkingTransaction = {
      id: generateId,
      name: nameInput.value,
      licence: licenceInput.value,
      parkingSpot: selectedParkingSpot,
      duration: Number(durationInput.value),
      durationMs: durationInMs,
      durationType: durationType.value,
      createdAt: Date.now(),
    };

    handleAddNewTransaction(data);
    setSuccess(true);
  };

  const handleCloseModal = () => {
    handleCloseModalForm();
    setSuccess(false);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <Modal
      title={success ? "Transaksi berhasil dibuat" : "Pesan tempat parkir"}
    >
      {success ? (
        <>
          <div className='success-content'></div>
          <div className='flex justify-center'>
            <button className='button-form-close' onClick={handleCloseModal}>
              Tutup
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='my-2 flex items-center text-lg flex-wrap'>
            <p className='mr-2'>
              Isi form pemesanan tempat parkir untuk Spot :{" "}
            </p>
            <span className='bg-primary px-2 text-white rounded whitespace-nowrap'>
              {selectedParkingSpot}
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
            {error?.message && (
              <span className='text-red-600'>{error?.message}</span>
            )}
            <button type='submit' className='button-form-submit'>
              Buat pesanan
            </button>
            <button
              type='button'
              className='button-form-close'
              onClick={() => handleCloseModal()}
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
