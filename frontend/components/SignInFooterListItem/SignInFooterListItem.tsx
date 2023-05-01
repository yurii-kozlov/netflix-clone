import React from 'react';
import Link from 'next/link';
import { LinksListItem } from 'types/LinksListItem';
import styles from 'components/SignInFooterListItem/SignInFooterListItem.module.scss';

type SignInFooterListItemProps = {
  listItem: LinksListItem
}

export const SignInFooterListItem: React.FC<SignInFooterListItemProps> = ({ listItem }) => {
  const { title, link } = listItem;

  return (
    <li className={styles.listItem}>
      <Link className={styles.link} href={link}>
        {title}
      </Link>
    </li>
  );
};
