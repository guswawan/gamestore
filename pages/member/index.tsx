import jwtDecode from 'jwt-decode';
import OverviewContent from '../../components/elements/OverviewContent';
import Sidebar from '../../components/elements/Sidebar';
import { JWTPayloadTypes } from '../../services/data-types';

export default function Member() {
  return (
    <section className="overview overflow-auto">
      <Sidebar activeMenu="overview" />
      <OverviewContent />
    </section>
  );
}

interface getServerSidePropsType {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: getServerSidePropsType) {
  const { token } = req.cookies;

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
  return {
    props: {
      user: userFromPayload,
    },
  };
}
