import Sidebar from '../../../components/elements/Sidebar';
import TransactionContentDetail from '../../../components/elements/TransactionContentDetail';

export default function detail() {
  return (
    <section className="transactions-detail overflow-auto">
      <Sidebar activeMenu="transactions" />
      <TransactionContentDetail />
    </section>
  );
}
