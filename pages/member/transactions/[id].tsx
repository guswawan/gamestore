import jwtDecode from 'jwt-decode';
import TransactionContentDetail from '../../../components/elements/TransactionContentDetail';
import {
  JWTPayloadTypes,
  TransactionTypes,
} from '../../../services/data-types';
import { getTransactionsDetail } from '../../../services/member';

interface TransactionDetailProps {
  transactionDetail: TransactionTypes;
}
export default function detail(props: TransactionDetailProps) {
  const { transactionDetail } = props;

  return (
    <section className="transactions-detail overflow-auto">
      <TransactionContentDetail data={transactionDetail} />
    </section>
  );
}

interface getServerSidePropsType {
  req: {
    cookies: {
      token: string;
    };
  };
  params: {
    id: string;
  };
}

export async function getServerSideProps({
  req,
  params,
}: getServerSidePropsType) {
  const { token } = req.cookies;
  const { id } = params;

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  const userFromPayload = payload.player;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
  const response = await getTransactionsDetail(id, jwtToken);
  return {
    props: {
      transactionDetail: response.data,
    },
  };
}
