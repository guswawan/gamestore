import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import NominalItem from './NominalItem';
import PaymentItem from './PaymentItem';
import {
  PaymentType,
  NominalsType,
  BanksType,
} from '../../../services/data-types';

interface TopUpFormProps {
  dataNominals: NominalsType[];
  dataPayments: PaymentType[];
}

export default function TopUpForm(props: TopUpFormProps) {
  const { dataNominals, dataPayments } = props;
  const [verifyID, setVerifyID] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [nominalItem, setNominalItem] = useState({});
  const [paymentItem, setPaymentItem] = useState({});
  const router = useRouter();

  const onNominalItemChange = (data: NominalsType) => {
    setNominalItem(data);
  };

  const onPaymentChange = (payment: PaymentType, bank: BanksType) => {
    const data = {
      payment,
      bank,
    };
    setPaymentItem(data);
  };

  const onSubmit = () => {
    const data = {
      verifyID,
      bankAccountName,
      nominalItem,
      paymentItem,
    };
    if (
      verifyID === '' ||
      bankAccountName === '' ||
      Object.getOwnPropertyNames(nominalItem).length === 0 ||
      Object.getOwnPropertyNames(paymentItem).length === 0
    ) {
      toast.error('Please fill in all data!');
    } else {
      localStorage.setItem('data-topup', JSON.stringify(data));
      router.push('/checkout');
    }
  };

  return (
    <form action="./checkout.html" method="POST">
      <div className="pt-md-50 pt-30">
        <div className="">
          <label
            htmlFor="ID"
            className="form-label text-lg fw-medium color-palette-1 mb-10"
          >
            Verify ID
          </label>
          <input
            type="text"
            className="form-control rounded-pill text-lg"
            id="ID"
            name="ID"
            aria-describedby="verifyID"
            placeholder="Enter your ID"
            value={verifyID}
            onChange={(e) => setVerifyID(e.target.value)}
          />
        </div>
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Nominal Top Up
        </p>
        <div className="row justify-content-between">
          {dataNominals.map((item) => (
            <NominalItem
              key={item._id}
              _id={item._id}
              coinName={item.coinName}
              coinQuantity={item.coinQuantity}
              price={item.price}
              onChangeItem={() => onNominalItemChange(item)}
            />
          ))}

          <div className="col-lg-4 col-sm-6">{/* <!-- Blank --> */}</div>
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Payment Method
        </p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            {dataPayments.map((payment) =>
              payment.banks.map((bank) => (
                <PaymentItem
                  bankID={bank._id}
                  name={bank.bankName}
                  type={payment.paymentType}
                  onChangePayment={() => onPaymentChange(payment, bank)}
                />
              ))
            )}

            <div className="col-lg-4 col-sm-6">{/* <!-- Blank --> */}</div>
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <label
          htmlFor="bankAccount"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Bank Account Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="bankAccount"
          name="bankAccount"
          aria-describedby="bankAccount"
          placeholder="Enter your Bank Account Name"
          value={bankAccountName}
          onChange={(e) => setBankAccountName(e.target.value)}
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <button
          type="button"
          className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
          onClick={onSubmit}
        >
          Continue
        </button>
      </div>
    </form>
  );
}
