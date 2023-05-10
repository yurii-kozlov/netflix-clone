import Link from 'next/link';
import React, { ReactElement } from 'react';
import { LinksListItem } from 'types/LinksListItem';
import styles from 'components/MainFooter/MainFooterListItem/MainFooterListItem.module.scss';

type MainFooterListItemProps = {
  linksListItem: LinksListItem;
}

export const MainFooterListItem: React.FC<MainFooterListItemProps> = ({ linksListItem }): ReactElement => {
  const {title, link } = linksListItem;

  return (
    <li className={styles.listItem}>
      <Link className={styles.link} href={link}>
        {title}
      </Link>
    </li>
  );
};
