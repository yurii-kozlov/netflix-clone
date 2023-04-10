import React, { ReactElement } from 'react';
import Link from 'next/link';
import { Container } from 'components/Container';
import styles from 'components/Error/Error.module.scss';

type ErrorProps = {
  error: string
};

export const Error: React.FC<ErrorProps> = ({ error }): ReactElement => (
  <section className={styles.section}>
    <Container>
      <h1 className={styles.title}>Error: {error}</h1>
      <p className={styles.additionalInfo}>
        Please try again later or contact our support team for assistance.
      </p>
      <p className={styles.additionalInfo}>In the meantime, you may find the following pages helpful:</p>
      <ul className={styles.linksList} >
        <li className={styles.listItem}>
          <Link className={styles.link} href="/main">
            Main
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link className={styles.link} href="/contact">
            Contact Us
          </Link>
        </li>
      </ul>
    </Container>
  </section>
  );
