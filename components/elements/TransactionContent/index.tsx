import { useCallback, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { TransactionTypes } from '../../../services/data-types';
import { getDataMemberTransactions } from '../../../services/member';
import ButtonTab from './ButtonTab';
import TableRow from './TableRow';

export default function TransactionContent() {
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState([]);
  const [tab, setTab] = useState('');
  const IMG = process.env.NEXT_PUBLIC_IMG;

  const fetchData = useCallback(async (value) => {
    const response = await getDataMemberTransactions(value);
    if (response.error) {
      toast.error(response.message);
    } else {
      setTotal(response.data.total);
      setHistory(response.data.history);
    }
  }, []);

  useEffect(() => {
    fetchData('').catch(console.error);
  }, []);

  const onClickTab = (value: string) => {
    setTab(value);
    fetchData(value);
  };

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          My Transactions
        </h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">
            <NumberFormat
              value={total}
              prefix="Rp"
              displayType="text"
              decimalSeparator=","
              thousandSeparator="."
            />
          </h3>
        </div>
        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              <ButtonTab
                onClick={() => onClickTab('')}
                title="All Trx"
                active={tab === ''}
              />
              <ButtonTab
                onClick={() => onClickTab('success')}
                title="Success"
                active={tab === 'success'}
              />
              <ButtonTab
                onClick={() => onClickTab('pending')}
                title="Pending"
                active={tab === 'pending'}
              />
              <ButtonTab
                onClick={() => onClickTab('failed')}
                title="Failed"
                active={tab === 'failed'}
              />
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Transactions
          </p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
                {history.map((item: TransactionTypes) => {
                  const tax = item.historyVoucherTopup.price * (10 / 100);
                  const totalPrice = item.historyVoucherTopup.price + tax;

                  return (
                    <TableRow
                      key={item._id}
                      image={`${IMG}/${item.historyVoucherTopup.thumbnail}`}
                      title={item.historyVoucherTopup.gameName}
                      category={item.historyVoucherTopup.category}
                      item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`}
                      price={totalPrice}
                      status={item.status}
                      idDetail={item._id}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
