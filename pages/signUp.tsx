import React, { ReactElement } from 'react';
import Image from 'next/image';
import { getStaticProps, SignUpStaticProps } from 'api/getStaticPropsSignUp';
import { SignUpContainer } from 'components/SignUpContainer';
import { Container } from 'components/Container';
import checkMark from 'images/checkMark.svg';
import styles from 'styles/pages/signUp.module.scss';
import { useRouter } from 'next/router';

const SignUp: React.FC<SignUpStaticProps> = ({ signUpData, error }): ReactElement => {
  const router = useRouter();

  const handleNextButtonClick = (): Promise<boolean> => router.push('/signUp/planform');

  return (
    <SignUpContainer error={error || null} signUpData={signUpData || null}>
      <Container>
        <div className={styles.planWrapper}>
          <span className={styles.logo} />
          <div className={styles.stepWrapper} >
            <span className={styles.stepIndicator}>
              STEP&nbsp;<b>2</b>&nbsp;OF<b>&nbsp;3</b>
            </span>
            <h1 className={styles.stepTitle}>Choose your plan.</h1>
          </div>
          <div className={styles.contextBody}>
            <ul className={styles.checkMarkList}>
              <li className={styles.checkMarkListItem}>
                <Image alt='checkmark' className={styles.checkMark} src={checkMark}/>
                <span className={styles.listItemText}>No commitments, cancel anytime.</span>
              </li>
              <li className={styles.checkMarkListItem}>
                <Image alt='checkmark' className={styles.checkMark} src={checkMark}/>
                <span className={styles.listItemText}>Everything on Netflix for one low price.</span>
              </li>
              <li className={styles.checkMarkListItem}>
                <Image alt='checkmark' className={styles.checkMark} src={checkMark}/>
                <span className={styles.listItemText}>Unlimited viewing on all your devices.</span>
              </li>
            </ul>
          </div>
          <button
            className={styles.buttonNext}
            onClick={handleNextButtonClick}
            type="button"
          >
            Next
          </button>
        </div>
      </Container>
    </SignUpContainer>
  );
}

export { getStaticProps };
export default SignUp;
