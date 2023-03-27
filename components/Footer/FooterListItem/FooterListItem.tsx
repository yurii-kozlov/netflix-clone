import Link from 'next/link';
import React from 'react';
import styles from 'components/Footer/FooterListItem/FooterListItem.module.scss';
import { footerListItem } from 'types/footerListItem';

type FooterListItemProps = {
  listItem: footerListItem
};

export const FooterListItem: React.FC<FooterListItemProps> = ({ listItem }) => {
  const {title,link } = listItem;

  return (
    <li className={styles.listItem}>
      <Link className={styles.link} href={link}>
        {title}
      </Link>
    </li>
  );
};
