import { ReactElement } from 'react';
import styles from 'components/LoadingIndicator/LoadingIndicator.module.scss';

export const LoadingIndicator = (): ReactElement => (
  <div className={styles.waitIndicator} >
    <div className={styles.loadingIndicator} />
  </div>
  );

