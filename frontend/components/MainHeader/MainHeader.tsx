import { ReactElement, FC, useState, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import { v4 as uuid_v4 } from 'uuid';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoIosNotifications } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MainHeader as MainHeaderData } from 'types/mainPage/MainHeader';
import { Container } from 'components/Container';
import { NavMenuListItem } from 'components/MainHeader/NavMenuListItem';
import styles from 'components/MainHeader/MainHeader.module.scss';

type MainHeaderProps = {
  error: string | null;
  headerData: MainHeaderData | null;
}

export const MainHeader: FC<MainHeaderProps> = ({ error, headerData }): ReactElement => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = (): void => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }

  const handleSearchButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setIsSearchInputVisible(!isSearchInputVisible);
    event.stopPropagation();
  };

  const handleSearchInputVisibility = (): void => setIsSearchInputVisible(false);

  const { headerLinksList } = headerData || {};
  const { avatar, netflixLogo} = headerData?.images || {};

  const handleNavMenuButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setIsNavMenuOpen(!isNavMenuOpen);
    event.stopPropagation();
  };

  const handleNavMenuVisibility = (): void => {
    setIsNavMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleNavMenuVisibility);
    document.addEventListener('click', handleSearchInputVisibility);

    return () => {
      document.removeEventListener('click', handleNavMenuVisibility);
      document.removeEventListener('click', handleSearchInputVisibility);
    };
  }, [isNavMenuOpen, isSearchInputVisible])

  return (
    <header className={cn(styles.header, {[styles.scrolledHeader]: isScrolled})}>
      <Container>
        <nav className={styles.navigation}>
          <div className={cn(
            styles.contentWrapper,
            {[styles.contentWrapperWithActiveSearch]: isSearchInputVisible}
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
              <li className={cn(
                styles.buttonsListItem,
                styles.buttonsListItemSearchInput,
                {[styles.activeButtonsListItemSearchInput]: isSearchInputVisible}
              )}
              >
                <button
                  className={cn(styles.button, styles.buttonSearch)}
                  onClick={handleSearchButtonClick}
                  type="button"
                >
                  <BiSearchAlt2 color='#fff' size={isSearchInputVisible ? 20 : 24}/>
                </button>
                <input
                  className={cn(styles.searchInput, {[styles.searchInputActive]: isSearchInputVisible})}
                  onClick={(e): void => e.stopPropagation()}
                  placeholder="Titles, people, genres"
                  type="search"
                />
              </li>
              <li className={styles.buttonsListItem}>
                <button className={cn(styles.button, styles.buttonNotification)} type="button">
                  <IoIosNotifications color='#fff' size={24}/>
                </button>
              </li>
              <li className={styles.buttonsListItem}>
                <button className={cn(styles.button, styles.buttonProfile)} type="button">
                  <Image
                    alt="avatar"
                    className={styles.avatar}
                    height={35}
                    src={avatar || ''}
                    width={35}
                  />
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}
