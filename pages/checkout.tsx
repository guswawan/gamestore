import Image from 'next/image';
import CheckoutConfirm from '../components/elements/CheckoutConfirm';
import CheckoutDetail from '../components/elements/CheckoutDetail';
import CheckoutItem from '../components/elements/CheckoutItem';

export default function Checkout() {
  return (
    <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
      <div className="container-fluid">
        <div className="logo text-md-center text-start pb-50">
          <a className="" href="/#">
            <Image src="/icon/logo.svg" alt="logo" height={60} width={60} />
          </a>
        </div>
        <div className="title-text pt-md-50 pt-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
          <p className="text-lg color-palette-1 mb-0">Waktunya meningkatkan cara bermain</p>
        </div>
        <CheckoutItem />
        <hr />
        <CheckoutDetail />
        <CheckoutConfirm />
      </div>
    </section>
  );
}
