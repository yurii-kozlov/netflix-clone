import { ReactElement } from 'react';
import Image from 'next/image';
import { paymentSystems } from 'constants/paymentSystems';
import styles from 'components/PaymentSystems/PaymentSystems.module.scss';

export const PaymentSystems = (): ReactElement => (
  <div className={styles.paymentSystemsWrapper}>
    {paymentSystems.map((paymentSystem) => {
      const {title, icon} = paymentSystem;

      return (
        <Image
          alt={title}
          className={styles.paymentSystemIcon}
          key={title}
          src={icon}
        />
      )
    })}
  </div>
  );
