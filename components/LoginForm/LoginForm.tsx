import { ReactElement, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInValidation } from 'constants/validationSchemas/signInValidation';
import { SignInFormInputs } from 'types/SignInFormInputs';
import styles from 'components/LoginForm/LoginForm.module.scss';

export const LoginForm = (): ReactElement => {
  const [isEmailLabelActive, setIsEmailLabelActive] = useState<boolean>(false);
  const [isPasswordLabelActive, setIsPasswordLabelActive] = useState<boolean>(false);

  const {
    register, handleSubmit, reset, formState: {errors}, watch
  } = useForm<SignInFormInputs>({
    mode: 'all',
    resolver: yupResolver(signInValidation)
  })

  const passwordInput = watch('password');
  const emailInput = watch('email');
  const rememberMeInput = watch('rememberMe');

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

  const onSubmit = (): void => {
    reset();
    setIsEmailLabelActive(!isEmailLabelActive);
    setIsPasswordLabelActive(!isPasswordLabelActive);
  }

  return (
    <div className={styles.block}>
      <div className={styles.content}>
        <h1 className={styles.title}>Sign In</h1>
        <form
          action="#"
          className={styles.form}
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ul className={styles.inputsList}>
            <li className={styles.inputsListItem}>
              <div
                className={cn(
                  styles.inputAndLabelWrapper,
                  {[styles.inputAndLabelWrapperError]: errors.email}
                )}
              >
                <label
                  className={cn(
                    styles.label,
                    {[styles.labelActive]: isEmailLabelActive}
                  )}
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  {...register('email')}
                  className={styles.input}
                  id='email'
                  maxLength={50}
                  minLength={5}
                  onBlur={handleEmailInputFocus}
                  onFocus={handleEmailInputFocus}
                  type="email"
                />
              </div>
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </li>
            <li className={styles.inputsListItem}>
              <div className={cn(
                  styles.inputAndLabelWrapper,
                  {[styles.inputAndLabelWrapperError]: errors.password}
              )}
              >
                <label
                  className={cn(
                    styles.label,
                    {[styles.labelActive]: isPasswordLabelActive}
                  )}
                  htmlFor='password'
                >
                  Password
                </label>
                <input
                  {...register('password')}
                  autoComplete='current password'
                  className={styles.input}
                  id='password'
                  maxLength={50}
                  minLength={5}
                  onBlur={handlePasswordInputFocus}
                  onFocus={handlePasswordInputFocus}
                  type="password"
                />
              </div>
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </li>
          </ul>
          <button className={styles.buttonSubmit} type="submit">
            Sign In
          </button>
          <div className={styles.checkboxAndNeedHelpWrapper}>
            <div className={styles.checkBoxWrapper}>
              <input
                {...register('rememberMe')}
                className={styles.checkbox}
                id='remember'
                type="checkbox"
              />
              <label
                className={cn(styles.checkBoxlabel, {[styles.checkboxLabelActive]: rememberMeInput})}
                htmlFor='remember'
              >
                <span className={styles.rememberMeLabelText}>Remember me</span>
              </label>
            </div>
            <Link className={styles.needHelpLink} href="#help">
              Need help?
            </Link>
          </div>
        </form>
        <div className={styles.regInfo}>
          <p className={styles.regInfoOffer}>
            New to Netflix?&nbsp;
            <Link className={styles.signUpLink} href="/">
              Sign up now.
            </Link>
          </p>
          <p className={styles.additionalInfo}>
            <span className={styles.securityInfo}>
              This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.&nbsp;
            </span>
            <Link className={styles.termsOfUseLink} href="#termsOfUse">
              Learn more.
            </Link>
          </p>
        </div>
      </div>
    </div>
    );
}
