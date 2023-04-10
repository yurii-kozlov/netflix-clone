import React, { ReactElement, ReactNode } from 'react';
import styles from 'components/Container/Container.module.scss';

type ContainerProps = {
  children: ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }): ReactElement => (
  <div className={styles.container} >
    {children}
  </div>
  );
