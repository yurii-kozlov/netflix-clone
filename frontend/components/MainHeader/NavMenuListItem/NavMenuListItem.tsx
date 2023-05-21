import React, { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { LinksListItem } from 'types/LinksListItem';
import styles from 'components/MainHeader/NavMenuListItem/NavMenuListItem.module.scss';

type NavMenuListItemProps = {
  mainHeaderNavListItem: LinksListItem
}

export const NavMenuListItem: React.FC<NavMenuListItemProps> = ({ mainHeaderNavListItem }): ReactElement => {
  const {link, title } = mainHeaderNavListItem;

  const { asPath: currentPath } = useRouter();

  return (
    <li className={styles.listItem}>
      <Link
        className={cn(styles.link, {[styles.activeLink]: currentPath === link})}
        href={link}
        prefetch
      >
        {title}
      </Link>
    </li>
  );
}
