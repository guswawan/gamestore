import { useState } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function CheckoutConfirm() {
  const [checkbox, setCheckbox] = useState(false);

  const onSubmit = () => {
    const dataItemFromLocal = localStorage.getItem('data-item');
    const dataTopupFromLocal = localStorage.getItem('data-topup');
    const dataItem = JSON.parse(dataItemFromLocal!);
    const dataTopup = JSON.parse(dataTopupFromLocal!);

    if (!checkbox) {
      toast.error('Please complete the payment');
    } else {
      const data = {
        voucher: dataItem._id,
        nominal: dataTopup.nominalItem._id,
        payment: dataTopup.paymentItem.payment._id,
        bank: dataTopup.paymentItem.bank._id,
        name: dataTopup.bankAccountName,
        accountUser: dataTopup.verifyID,
      };
      console.log('SUBMIT', data);
    }
  };
  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input
          type="checkbox"
          checked={checkbox}
          onChange={() => setCheckbox(!checkbox)}
        />
        <span className="checkmark" />
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button
          className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
          type="button"
          onClick={onSubmit}
        >
          Confirm Payment
        </button>
      </div>
    </>
  );
}
