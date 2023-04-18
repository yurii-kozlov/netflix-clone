import React, { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuid_v4 } from 'uuid';
import { instance } from 'api/api';
import { SignIn as SignInData } from 'types/intro/SignIn';
import { Container } from 'components/Container';
import { Error } from 'components/Error';
import { SignInFooterListItem } from 'components/SignInFooterListItem';
import styles from 'styles/pages/signIn.module.scss';

const DynamicLoginForm = dynamic(() =>
  import('components/LoginForm/LoginForm').then((res) => res.LoginForm),
  {ssr: false}
)

export const SignIn: React.FC<SignInStaticProps> = ({ signInData, error }): ReactElement => {

  const { netflixLogo } = signInData?.images || {};
  const { footerLinksList } = signInData || {};

  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>
      <div className={styles.wrapper}>
        <Container>
          <div className={styles.loginAndHeaderWrapper}>
            <header className={styles.header}>
              {netflixLogo ? (
                <Link href="/">
                  <Image
                    alt='Netflix'
                    className={styles.logo}
                    height={40}
                    src={netflixLogo}
                    width={184}
                  />
                </Link>
              ) : (
                <Link href="/">Home</Link>
              )}
            </header>
            <div className={styles.formContainer}>
              <DynamicLoginForm />
            </div>
          </div>
        </Container>
        <footer className={styles.footer}>
          <Container>
            <div className={styles.heading}>
              Questions? Call:&nbsp;
              <a className={styles.phoneNumber} href="tel:0800-509-417">0800-509-417</a>
            </div>
            {error ? (
              <Error error={error}/>
          ): (
            <ul className={styles.linksList}>
              {footerLinksList?.map((listItem) => (
                <SignInFooterListItem  key={uuid_v4()} listItem={listItem}/>
              ))}
            </ul>
          )}
          </Container>
        </footer>
      </div>
    </>
  );
}

export default SignIn;

type SingInSuccess = {
  signInData: SignInData;
  error?: never;
}

type SignInError = {
  signInData?: never;
  error: string;
}

type SignInStaticProps = SingInSuccess | SignInError;

export const getStaticProps: GetStaticProps<SignInStaticProps> = async () => {
  try {
    const { data } = await instance.get('/signIn');

    return {
      props: {
        signInData: data
      }
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch data'
      }
    };
  }
};
