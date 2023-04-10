import Link from 'next/link';
import React, { ReactElement } from 'react';
import { FooterListItem } from 'types/intro/FooterListItem';
import styles from 'components/SignUpContainer/SignUpFooterListItem/SignUpFooterListItem.module.scss';

type SignUpFooterListItemProps = {
  footerListItem: FooterListItem
};

export const SignUpFooterListItem: React.FC<SignUpFooterListItemProps> = ({ footerListItem}): ReactElement => {
  const {link, title } = footerListItem;

  return (
    <li className={styles.listItem} >
      <Link className={styles.link} href={link}>
        {title}
      </Link>
    </li>
  );
};
