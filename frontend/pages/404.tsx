import React, { ReactElement } from 'react';
import Link from 'next/link';
import styles from 'styles/pages/error.module.scss';

const Custom404: React.FC = (): ReactElement => (
  <section className={styles.section} >
    <h1 className={styles.errorDescription} >This Page hasn&apos;t been found.</h1>
    <p className={styles.instruction} >
      Please go back to <Link className={styles.homePageLink} href="/main">safety</Link>
    </p>
  </section>
);

export default Custom404;
