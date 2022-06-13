import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  CountTopupCategoriestTypes,
  TransactionTypes,
} from '../../../services/data-types';
import getDataOverview from '../../../services/member';
import Category from './Category';
import TableContent from './TableContent';

export default function OverviewContent() {
  const [count, setCount] = useState([]);
  const [history, setHistory] = useState([]);
  const IMG = process.env.NEXT_PUBLIC_IMG;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDataOverview();
      if (response.error) {
        toast.error(response.message);
      } else {
        setCount(response.data.count);
        setHistory(response.data.history);
      }
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="top-up-categories mb-30">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Top Up Categories
          </p>
          <div className="main-content">
            <div className="row">
              {count.map((data: CountTopupCategoriestTypes) => (
                <Category key={data._id} nominal={data.value} icon="ic-desktop">
                  Game
                  <br />
                  {data.name}
                </Category>
              ))}
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
                  <th className="text-start" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item: TransactionTypes) => {
                  const tax = item.historyVoucherTopup.price * (10 / 100);
                  const total = item.historyVoucherTopup.price + tax;

                  return (
                    <TableContent
                      key={item._id}
                      title={item.historyVoucherTopup.gameName}
                      category={item.historyVoucherTopup.category}
                      item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`}
                      price={total}
                      image={`${IMG}/${item.historyVoucherTopup.thumbnail}`}
                      status={item.status}
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
