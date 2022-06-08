import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { setCheckout } from '../../../services/player';

export default function CheckoutConfirm() {
  const [checkbox, setCheckbox] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
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

      const response = await setCheckout(data);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success('Checkout has been successful');
        router.push('/complete-checkout');
        localStorage.removeItem('data-item');
        localStorage.removeItem('data-topup');
      }
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
