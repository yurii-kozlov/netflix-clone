import Link from 'next/link';
import React from 'react';
import styles from 'components/Footer/FooterListItem/FooterListItem.module.scss';
import { FooterListItem as FooterListItemLink } from 'types/intro/FooterListItem';

type FooterListItemProps = {
  listItem: FooterListItemLink
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
