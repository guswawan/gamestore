import cx from 'classnames';
import Link from 'next/link';

interface MenuItemProps {
  title: string;
  icon:
    | 'ic-menu-overview'
    | 'ic-menu-transaction'
    | 'ic-menu-message'
    | 'ic-menu-card'
    | 'ic-menu-reward'
    | 'ic-menu-setting'
    | 'ic-menu-logout';
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export default function MenuItem(props: Partial<MenuItemProps>) {
  const { title, icon, active, href, onClick } = props;
  const classItem = cx({
    item: true,
    'mb-30': true,
    active,
  });

  return (
    <div className={classItem} onClick={onClick}>
      <img
        className="me-3"
        src={`/icon/${icon}.svg`}
        height={25}
        width={25}
        alt="icon-menu"
      />
      <p className="item-title m-0">
        {onClick ? (
          <Link href="/">
            <a className="text-lg text-decoration-none">{title}</a>
          </Link>
        ) : (
          <Link href={href!}>
            <a className="text-lg text-decoration-none">{title}</a>
          </Link>
        )}
      </p>
    </div>
  );
}
