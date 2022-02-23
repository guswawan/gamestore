import OverviewContent from '../../components/elements/OverviewContent';
import Sidebar from '../../components/elements/Sidebar';

export default function Member() {
  return (
    <section className="overview overflow-auto">
      <Sidebar activeMenu="overview" />
      <OverviewContent />
    </section>
  );
}
