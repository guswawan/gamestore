import cx from 'classnames';

interface TableContentProps {
    image: 'overview-1' | 'overview-2' | 'overview-3' | 'overview-4';
    title: string;
    category: string;
    item: number;
    price: number;
    status: 'Pending' | 'Success' | 'Failed';
}

export default function TableContent(props: TableContentProps) {
  const {
    image, title, category, price, item, status,
  } = props;
  const statusClass = cx({
    'float-start icon-status': true,
    success: status === 'Success',
    pending: status === 'Pending',
    failed: status === 'Failed',
  });

  return (
    <tr className="align-middle text-center">
      <th scope="row">
        <img
          className="float-start me-3 mb-lg-0 mb-3"
          src={`/img/${image}.png`}
          width="80"
          height="60"
          alt="cover-game"
        />
        <div className="game-title-header">
          <p className="game-title fw-medium text-start color-palette-1 m-0">
            {title}
          </p>
          <p className="text-xs fw-normal text-start color-palette-2 m-0">{category}</p>
        </div>
      </th>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">
          {item}
          {' '}
          Gold
        </p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">{price}</p>
      </td>
      <td>
        <div>
          <span className={statusClass} />
          <p className="fw-medium text-start color-palette-1 m-0 position-relative">
            {status}
          </p>
        </div>
      </td>
    </tr>
  );
}
