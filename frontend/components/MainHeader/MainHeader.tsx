import { ReactElement, FC } from 'react';
import { MainHeader as MainHeaderData } from 'types/mainPage/MainHeader';
import { Container } from 'components/Container';
import { MainHeaderListItem } from 'components/MainHeader/MainHeaderListItem';
import styles from 'components/MainHeader/MainHeader.module.scss';
import Image from 'next/image';
import { v4 as uuid_v4 } from 'uuid';

type MainHeaderProps = {
  error: string | null;
  headerData: MainHeaderData | null;
}

export const MainHeader: FC<MainHeaderProps> = ({ error, headerData }): ReactElement => {
  const { images, headerLinksList } = headerData || {};

  return (
    <header className={styles.header}>
      <Container>
        <Image
          alt='Netflix'
          className={styles.logo}
          height={40}
          src={images?.netflixLogo || ''}
          width={184}
          priority
        />
        <ul className={styles.list}>
          {error ? (
            <p className={styles.error}>{error}</p>
          ): (
            headerLinksList?.map((listItem) => (
              <MainHeaderListItem key={uuid_v4()} mainHeaderListItem={listItem}/>
            ))
          )}
        </ul>
        <div className={styles.buttonsBlock}>
          <h1 className={styles.title}>hi this is header</h1>
        </div>
      </Container>
    </header>
    );
}
