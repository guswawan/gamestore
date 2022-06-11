import cx from 'classnames';
import NumberFormat from 'react-number-format';

interface TableContentProps {
  image: string;
  title: string;
  category: string;
  item: string;
  price: number;
  status: string;
}

export default function TableContent(props: TableContentProps) {
  const { image, title, category, price, item, status } = props;
  const statusClass = cx({
    'float-start icon-status': true,
    success: status === 'success',
    pending: status === 'pending',
    failed: status === 'failed',
  });

  return (
    <tr className="align-middle text-center">
      <th scope="row">
        <img
          className="float-start me-3 mb-lg-0 mb-3"
          src={image}
          width="80"
          height="60"
          alt="cover-game"
        />
        <div className="game-title-header">
          <p className="game-title fw-medium text-start color-palette-1 m-0">
            {title}
          </p>
          <p className="text-xs fw-normal text-start color-palette-2 m-0">
            {category}
          </p>
        </div>
      </th>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">{item}</p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">
          <NumberFormat
            value={price}
            prefix="Rp"
            displayType="text"
            decimalSeparator=","
            thousandSeparator="."
          />
        </p>
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
