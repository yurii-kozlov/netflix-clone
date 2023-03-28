import React, { ReactElement, ReactNode } from 'react';
import Image from 'next/image';
import { v4 as uuid_v4 } from 'uuid';
import { SignUp } from 'types/SignUp';
import { SignUpFooterListItem } from 'components/SignUpContainer/SignUpFooterListItem';
import { Error } from 'components/Error';
import { Container } from 'components/Container';
import styles from 'components/SignUpContainer/SignUpContainer.module.scss';
import Link from 'next/link';

type SignUpContainerProps = {
  children: ReactNode,
  signUpData: SignUp | null,
  error: string | null;
}

export const SignUpContainer: React.FC<SignUpContainerProps> = ({ children, signUpData, error }): ReactElement => {
  const {images, footerLinksList } = signUpData || {};

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Container>
          <div className={styles.headerWrapper} >
            {images &&
              <Link href="/">
                <Image
                  alt='Netflix'
                  className={styles.logo}
                  height={40}
                  src={images?.netflixLogo}
                  width={184}
              />
              </Link>
            }
            <Link className={styles.signOutLink} href="#">Sign In</Link>
          </div>
        </Container>
      </header>
      {children}
      <footer className={styles.footer}>
        <Container>
          <p className={styles.contact}>
            Questions? Call:&nbsp;
            <a className={styles.contactPhone} href="tel:0800-509-417">0800-509-417</a>
          </p>
          <ul className={styles.linksList}>
            {error ? (
              <Error error={error} />
          ): (
            footerLinksList?.map((footerListItem) => (
              <SignUpFooterListItem footerListItem={footerListItem} key={uuid_v4()} />
            ))
          )}
          </ul>
        </Container>
      </footer>
    </div>
    );
}

