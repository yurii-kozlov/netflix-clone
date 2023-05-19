import { ReactElement, FC, useState, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { v4 as uuid_v4 } from 'uuid';
import * as authActions from 'features/authorization';
import { useAppDispatch } from 'store/hooks';
import { IoIosNotifications, IoMdLogOut} from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MainHeader as MainHeaderData } from 'types/mainPage/MainHeader';
import { Container } from 'components/Container';
import { NavMenuListItem } from 'components/MainHeader/NavMenuListItem';
import styles from 'components/PersonalAccountHeader/PersonalAccountHeader.module.scss';

type PersonalAccountHeaderProps = {
  error: string | null;
  headerData: MainHeaderData | null;
}

export const PersonalAccountHeader: FC<PersonalAccountHeaderProps> = ({ error, headerData }): ReactElement => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

  const { headerLinksList } = headerData || {};
  const { avatar, netflixLogo} = headerData?.images || {};

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleNavMenuButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setIsNavMenuOpen(!isNavMenuOpen);
    event.stopPropagation();
  };

  const handleNavMenuVisibility = (): void => {
    setIsNavMenuOpen(false);
  };

  const logout = (): void => {
    dispatch(authActions.logout());
    router.push('/');
  };


  useEffect(() => {
    document.addEventListener('click', handleNavMenuVisibility);

    return () => {
      document.removeEventListener('click', handleNavMenuVisibility);
    };
  }, [isNavMenuOpen])

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.navigation}>
          <div className={cn(
            styles.contentWrapper
          )}>
            <Link className={styles.mainPageLink} href="/main">
              <Image
                alt='Netflix'
                className={styles.logo}
                height={25}
                src={netflixLogo || ''}
                width={90}
                priority
              />
            </Link>
            <div className={styles.navMenuOnMobileAndTabletWrapper}>
              <button
                aria-label='menu'
                className={cn(styles.button, styles.navMenuButton)}
                onClick={handleNavMenuButtonClick}
                type="button"
              >
                <GiHamburgerMenu color='#fff' size={24}/>
              </button>
              <ul className={cn(
                  styles.navMenOnMobileAndTablet,
                  {[styles.navMenOnMobileAndTabletActive]: isNavMenuOpen}
              )}
                >
                {headerLinksList?.map((listItem) => (
                  <NavMenuListItem key={uuid_v4()} mainHeaderNavListItem={listItem}/>
                  ))}
              </ul>
            </div>
            <h1 className={styles.title}>Netflix</h1>
            <ul className={styles.navList}>
              {error ? (
                <p className={styles.error}>{error}</p>
                  ): (
                  headerLinksList?.map((listItem) => (
                    <NavMenuListItem key={uuid_v4()} mainHeaderNavListItem={listItem}/>
                  ))
                )}
            </ul>
            <ul className={styles.buttonsList}>
              <li className={styles.buttonsListItem}>
                <button
                  aria-label="notification"
                  className={styles.button}
                  type="button"
                >
                  <IoIosNotifications color='#fff' size={24}/>
                </button>
              </li>
              <li className={styles.buttonsListItem}>
                <button
                  aria-label="log out"
                  className={cn(styles.button, styles.buttonLogout)}
                  onClick={logout}
                  type="button"
                >
                  <IoMdLogOut color='#fff' size={24}/>
                </button>
              </li>
              <li className={styles.buttonsListItem}>
                <Link className={cn(styles.button, styles.buttonProfile)} href="/personalAccount">
                  <Image
                    alt="avatar"
                    className={styles.avatar}
                    height={35}
                    src={avatar || ''}
                    width={35}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}
