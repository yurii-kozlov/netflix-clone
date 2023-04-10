import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import cn from 'classnames';
import { getStaticProps, SignUpStaticProps } from 'api/getStaticPropsSignUp';
import { SignUpContainer } from 'components/SignUpContainer';
import { Container } from 'components/Container';
import styles from 'styles/pages/registration.module.scss';

export const Registration: React.FC<SignUpStaticProps> = ({ signUpData, error }):ReactElement => {
  const [isNextButtonClicked, setIsNextButtonClicked] = useState<boolean>(false);

  const router = useRouter();
  const handleNextButtonClick = (): void => {
    router.push('/signUp/regform');
    setIsNextButtonClicked(true);

  };

  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>
      <SignUpContainer error={error || null} signUpData={signUpData || null}>
        <Container>
          <div className={cn(styles.regContainer, {[styles.regContainerDisappear]: isNextButtonClicked})}>
            <div className={styles.stepLogoContainer}>
              <span className={styles.stepLogo} />
            </div>
            <div className={styles.stepHeaderContainer} role="status">
              <span className={styles.stepIndicator}>
                STEP&nbsp;<b>1</b>&nbsp;OF<b>&nbsp;3</b>
              </span>
              <h1 className={styles.stepTitle}>Finish setting up your account</h1>
              <p className={styles.contentBox}>
                Netflix is personalized for you. Create a password to watch on any device at any time.
              </p>
            </div>
            <div className={styles.buttonWrapper}>
              <button
                className={styles.buttonNext}
                onClick={handleNextButtonClick}
                type="button"
              >
                Next
              </button>
            </div>
          </div>
        </Container>
      </SignUpContainer>
    </>

  );
}

export { getStaticProps };
export default Registration;
