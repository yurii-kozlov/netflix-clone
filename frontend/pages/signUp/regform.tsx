import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames'
import { getStaticProps, SignUpStaticProps } from 'api/getStaticPropsSignUp';
import { RegistrationFormInputs } from 'types/formInputs/RegistrationFormInputs';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { actions as accountActions } from 'features/personalAccount';
import * as authActions from 'features/authorization';
import { registrationSchema } from 'constants/validationSchemas/registrationSchema';
import { SignUpContainer } from 'components/SignUpContainer';
import { Container } from 'components/Container';
import warningIcon from 'images/warning.svg';
import styles from 'styles/pages/regform.module.scss';

const Regform: React.FC<SignUpStaticProps> = ({ error, signUpData }): ReactElement => {
  const [isEmailLabelActive, setIsEmailLabelActive] = useState<boolean>(false);
  const [isPasswordLabelActive, setIsPasswordLabelActive] = useState<boolean>(false);
  const [isReceivingOffers, setIsReceivingOffers] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.accountInfo.email);
  const registrationError = useAppSelector((state) => state.authorization.error);
  const isAuthorized = useAppSelector((state) => state.authorization.isAuth);
  const isRegRequestLoading = useAppSelector((state) => state.authorization.isLoading);

  const {
    register,
    reset,
    formState: {errors, isSubmitSuccessful},
    watch,
    handleSubmit,
  } = useForm<RegistrationFormInputs>({
    defaultValues: {
      email
    },
    mode: 'all',
    resolver: yupResolver(registrationSchema),
  });

  const emailInput = watch('email');
  const passwordInput = watch('password');

  const updateEmail = (updatedEmail: string): void => {
    dispatch(accountActions.setEmail(updatedEmail));
  }

  const handleReceiveingOffers = (): void => setIsReceivingOffers(!isReceivingOffers);

  const handleEmailInputFocus = (): void => {
    if (emailInput) {
      setIsEmailLabelActive(true);
    } else {
      setIsEmailLabelActive(!isEmailLabelActive);
    }
  }

  const handlePasswordInputFocus = (): void => {
    if (passwordInput) {
      setIsPasswordLabelActive(true);
    } else {
      setIsPasswordLabelActive(!isPasswordLabelActive);
    }
  }

  const onSubmit = (formData: RegistrationFormInputs): void => {
    dispatch(authActions.registration(formData))

    updateEmail(formData.email);
  }

  if (isAuthorized && !registrationError && isSubmitSuccessful && !isRegRequestLoading) {
    router.push('/signUp');
    reset({
      email: '',
      password: ''
    });
    setIsEmailLabelActive(!isEmailLabelActive);
    setIsPasswordLabelActive(!isPasswordLabelActive);
    dispatch(authActions.actions.setError(''));
  }

  useEffect(() => {
    dispatch(authActions.actions.setError(''));

    return () => {
      dispatch(authActions.actions.setError(''));
    }
  } , [email]);

  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>
      <SignUpContainer error={error || null} signUpData={signUpData || null}>
        <Container>
          <div className={cn(
              styles.formWrapper,
              {[styles.formWrapperDisappear]
                : isSubmitSuccessful && !registrationError && !isRegRequestLoading}
          )}
          >
            {registrationError && (
              <div className={styles.registrationErrorWrapper}>
                <Image alt='warning-icon' className={styles.warningIcon} src={warningIcon}/>
                <p className={styles.registrationError}>
                  <b>{registrationError}</b>
                </p>
              </div>
            )}
            <form
              action="#"
              method='post'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.formHeader}>
                <span className={styles.stepIndicator}>
                  STEP&nbsp;<b>1</b>&nbsp;OF<b>&nbsp;3</b>
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
                      className={cn(styles.label, {[styles.activeLabel]: isEmailLabelActive || emailInput})}
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
                        {[styles.inputSuccess]: passwordInput && !errors.password}
                      )}
                      id='password'
                      {...register('password')}
                      autoComplete="current password"
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
              <div className={styles.submitButtonWrapper}>
                <div className={cn(
                  styles.spinner,
                  {[styles.spinnerActive]: !registrationError && isSubmitSuccessful}
                )}
                />
                <button
                  className={cn(
                    styles.buttonNext,
                    {[styles.buttonNextInactive]: !registrationError && isSubmitSuccessful && isRegRequestLoading}
                  )}
                  type="submit"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </Container>
      </SignUpContainer>
    </>
  );
}

export { getStaticProps };
export default Regform;
