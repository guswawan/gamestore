import Sidebar from '../../../components/elements/Sidebar';
import TransactionContent from '../../../components/elements/TransactionContent';

export default function Transactions() {
  return (
    <section className="transactions overflow-auto">
      <Sidebar activeMenu="transactions" />
      <TransactionContent />
    </section>
  );
}
