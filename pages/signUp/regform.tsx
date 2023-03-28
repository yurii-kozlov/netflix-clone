import React, { ReactElement, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames'
import { instance } from 'api/api';
import { SignUp } from 'types/SignUp';
import { RegistrationFormInputs } from 'types/RegistrationFormInputs';
import { registrationSchema } from 'constants/validationSchemas/registrationSchema';
import { SignUpContainer } from 'components/SignUpContainer';
import { Container } from 'components/Container';
import styles from 'styles/pages/regform.module.scss';

const Regform: React.FC<RegformStaticProps> = ({ error, regformData }): ReactElement => {
  const [isEmailLabelActive, setIsEmailLabelActive] = useState<boolean>(false);
  const [isPasswordLabelActive, setIsPasswordLabelActive] = useState<boolean>(false);
  const [isReceivingOffers, setIsReceivingOffers] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    reset,
    formState: {errors},
    watch,
    handleSubmit
  } = useForm<RegistrationFormInputs>({
    mode: 'all',
    resolver: yupResolver(registrationSchema),
  });

  const emailInput = watch('email');
  const password = watch('password');

  const handleReceiveingOffers = (): void => setIsReceivingOffers(!isReceivingOffers);

  const handleEmailInputFocus = (): void => {
    if (emailInput) {
      setIsEmailLabelActive(true);
    } else {
      setIsEmailLabelActive(!isEmailLabelActive);
    }
  }

  const handlePasswordInputFocus = (): void => {
    if (password) {
      setIsPasswordLabelActive(true);
    } else {
      setIsPasswordLabelActive(!isPasswordLabelActive);
    }
  }

  const onSubmit = (): void => {
    reset();
    setIsEmailLabelActive(!isEmailLabelActive);
    setIsPasswordLabelActive(!isPasswordLabelActive);
    router.push('/signUp');
  }

  return (
    <SignUpContainer error={error || null} signUpData={regformData || null}>
      <Container>
        <div className={styles.formWrapper}>
          <form
            action="#"
            method='post'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.formHeader}>
              <span className={styles.stepIndicator}>
                STEP&nbsp;<b>1</b>&nbsp;OF <b>&nbsp;3</b>
              </span>
              <h1 className={styles.stepTitle}>Create a password to start your membership</h1>
              <p className={styles.contentBox}>
                Just a few more steps and you&apos;re done!
              </p>
              <p className={styles.contentBox}>
                We hate paperwork, too.
              </p>
            </div>
            <ul className={styles.inputsList}>
              <li className={styles.inputListItem}>
                <div className={styles.inputAndLabelWrapper}>
                  <label
                    className={cn(styles.label, {[styles.activeLabel]: isEmailLabelActive})}
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    className={cn(
                      styles.input,
                      {[styles.inputError]: errors.email},
                      {[styles.inputSuccess]: emailInput && !errors.email}
                    )}
                    {...register('email')}
                    id='email'
                    maxLength={50}
                    minLength={5}
                    onBlur ={handleEmailInputFocus}
                    onFocus={handleEmailInputFocus}
                    type="email"
                  />
                  {errors.email && <p className={styles.error} >{errors.email.message}</p>}
                </div>
              </li>
              <li className={styles.inputListItem}>
                <div className={styles.inputAndLabelWrapper}>
                  <label
                    className={cn(styles.label, {[styles.activeLabel]: isPasswordLabelActive})}
                    htmlFor='password'
                  >
                    Add a password
                  </label>
                  <input
                    className={cn(
                      styles.input,
                      {[styles.inputError]: errors.password},
                      {[styles.inputSuccess]: password && !errors.password}
                    )}
                    id='password'
                    {...register('password')}
                    maxLength={50}
                    minLength={5}
                    onBlur={handlePasswordInputFocus}
                    onFocus={handlePasswordInputFocus}
                    type="password"
                  />
                  {errors.password && <p className={styles.error} >{errors.password.message}</p>}
                </div>
              </li>
              <li className={styles.inputListItem}>
                <div className={styles.checkBoxWrapper}>
                  <label
                    className={cn(styles.emailCheckboxLabel, {[styles.emailCheckboxLabelActive]: isReceivingOffers})}
                    htmlFor='emailPreference'
                  >
                    Please do not email me Netflix special offers.
                    <input
                      checked={isReceivingOffers}
                      className={styles.emailCheckbox}
                      id='emailPreference'
                      name='emailPreference'
                      onChange={handleReceiveingOffers}
                      type="checkbox"
                    />
                  </label>
                </div>
              </li>
            </ul>
            <button
              className={styles.buttonNext}
              type="submit"
            >
              Next
            </button>
          </form>
        </div>
      </Container>
    </SignUpContainer>
    );
}

type RegformSuccess = {
  regformData: SignUp;
  error?: never
}

type RegformError = {
  regformData?: never;
  error: string;
}


type RegformStaticProps = RegformSuccess | RegformError;

export const getStaticProps: GetStaticProps<RegformStaticProps> = async () => {
  try {
    const { data } = await instance.get('/signUp');

    return {
      props: {
        regformData: data
      }
    }

  } catch (error) {

    return {
      props: {
        error: 'Failed to fetch Data'
      }
    }
  }
}

export default Regform;
