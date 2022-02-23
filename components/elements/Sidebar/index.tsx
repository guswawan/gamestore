import Footer from './Footer';
import Profile from './Profile';
import MenuItem from './MenuItem';

interface SidebarProps {
  activeMenu: 'overview' | 'transactions' | 'settings';
}

export default function Sidebar(props: SidebarProps) {
  const { activeMenu } = props;

  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem title="Overview" icon="ic-menu-overview" href="/member" active={activeMenu === 'overview'} />
          <MenuItem title="Transactions" icon="ic-menu-transaction" href="/member/transactions" active={activeMenu === 'transactions'} />
          <MenuItem title="Messages" icon="ic-menu-message" href="/member/message" />
          <MenuItem title="Card" icon="ic-menu-card" href="/member/card" />
          <MenuItem title="Rewards" icon="ic-menu-reward" href="/member/reward" />
          <MenuItem title="Settings" icon="ic-menu-setting" href="/member/edit-profile" active={activeMenu === 'settings'} />
          <MenuItem title="Log Out" icon="ic-menu-logout" href="/sign-in" />
        </div>
        <Footer />
      </div>
    </section>
  );
}
