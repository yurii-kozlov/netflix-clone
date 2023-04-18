import React, { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import { useAppSelector } from 'store/hooks';
import { Container } from 'components/Container';
import { SubscriptionForm } from 'components/SubscriptionForm';
import styles from 'components/Header/Header.module.scss';

type HeaderProps = {
  netflixLogo: string
}

export const Header: React.FC<HeaderProps> = ({ netflixLogo }): ReactElement => {
  const isAuthorized = useAppSelector((state) => state.authorization.isAuth);

  return (
    <div className={cn(styles.sectionWrapper, styles.marginBottom)}>
      <Container>
        <header className={styles.section}>
          <div className={styles.upperPart}>
            <Link href="/">
              <Image
                alt='Netflix'
                className={styles.logo}
                height={40}
                src={netflixLogo}
                width={184}
              />
            </Link>
            <Link className={styles.linkToSignInPage} href={isAuthorized ? '/main' : 'signIn'}>
              Sign In
            </Link>
          </div>
          <div className={styles.content} >
            <h1 className={styles.title}>Unlimited movies, TV shows, and more.</h1>
            <p className={styles.benefits}>Watch anywhere. Cancel anytime.</p>
            <SubscriptionForm />
          </div>
        </header>
      </Container>
    </div>
  )
}
