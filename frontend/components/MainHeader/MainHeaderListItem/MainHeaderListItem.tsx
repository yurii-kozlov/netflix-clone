import React, { ReactElement } from 'react';
import { LinksListItem } from 'types/LinksListItem';
import styles from 'components/MainHeader/MainHeaderListItem/MainHeaderListItem.module.scss';

type MainHeaderListItemProps = {
  mainHeaderListItem: LinksListItem
}

export const MainHeaderListItem: React.FC<MainHeaderListItemProps> = ({ mainHeaderListItem }): ReactElement => (
  <li className={styles.listItem}>
    {mainHeaderListItem.title}
  </li>
  );
