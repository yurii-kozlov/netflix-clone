import React, { ReactElement, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import cn from 'classnames'
import { getStaticProps, SignUpStaticProps } from 'api/getStaticPropsSignUp';
import { SignUpContainer } from 'components/SignUpContainer';
import { Container } from 'components/Container';
import { PaymentSystems } from 'components/PaymentSystems';
import encryptionIcon from 'images/encryption.svg';
import arrow from 'images/arrow.svg';
import styles from 'styles/pages/paymentPicker.module.scss';

const PaymentPicker: React.FC<SignUpStaticProps> = ({ signUpData, error }): ReactElement => {
  const [isButtonPaymentClicked, setIsButtonPaymentClicked] = useState<boolean>(false);
  const router = useRouter();

  const handleButtonPaymentClick = (): void => {
    setIsButtonPaymentClicked(true);
    router.push('/signUp/creditOption');
  }

  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>
      <SignUpContainer error={error || null} signUpData={signUpData || null}>
        <Container>
          <section
            className={cn(
            styles.section,
            {[styles.sectionDisappear]: isButtonPaymentClicked}
            )}
          >
            <div className={styles.heading} >
              <div className={styles.logoContainer}>
                <span className={styles.logo} />
              </div>
              <span className={styles.stepIndicator}>
                STEP&nbsp;<b>3</b>&nbsp;OF<b>&nbsp;3</b>
              </span>
              <h1 className={styles.stepTitle}>Choose how to pay</h1>
            </div>
            <div className={styles.additionalInfoWrapper}>
              <p className={styles.additionalInfo}>Your payment is encrypted and you can change how you pay anytime.</p>
              <p className={styles.benefit}>Secure for peace of mind.</p>
              <p className={styles.benefit}>Cancel easily online.</p>
            </div>
            <div className={styles.encryptionInfoWrapper}>
              <Image alt='encryption' className={styles.encryptionIcon} src={encryptionIcon} />
              <span className={styles.encryptionInfo}>End-to-end encrypted</span>
            </div>
            <div className={styles.buttonWrapper}>
              <div className={cn(styles.spinner, {[styles.spinnerActive]: isButtonPaymentClicked})}/>
              <button
                className={cn(
              styles.buttonCard,
              {[styles.buttonCardInactive]: isButtonPaymentClicked}
                )}
                disabled={isButtonPaymentClicked}
                onClick={handleButtonPaymentClick}
                type="button"
              >
                <div className={styles.cardAndLogosWrapper}>
                  <p className={styles.cardType}>Credit or Debit Card</p>
                  <PaymentSystems />
                </div>
                <Image alt='arrow' className={styles.arrow} src={arrow} />
              </button>
            </div>
          </section>
        </Container>
      </SignUpContainer>
    </>
  );
}

export { getStaticProps };
export default PaymentPicker;
