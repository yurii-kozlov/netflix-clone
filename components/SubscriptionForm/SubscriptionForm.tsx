import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'store/hooks';
import { actions as accountActions } from 'features/personalAccount';
import { emailValidationSchema } from 'constants/validationSchemas/introPageEmailValidation';
import { introPageForminputs } from 'types/introPageFormInputs';
import { LoadingIndicator } from 'components/LoadingIndicator';
import styles from 'components/SubscriptionForm/SubscriptionForm.module.scss';

export const SubscriptionForm = (): ReactElement => {
  const [isLabelActive, setIsLabelActive] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const addEmail = (email: string): void => {
    dispatch(accountActions.setEmail(email));
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    watch
  } = useForm<introPageForminputs>({
    mode: 'all',
    resolver: yupResolver(emailValidationSchema),
  });

  const emailName = watch('email');

  const handleInputFocus = (): void => {
    if (emailName) {
      setIsLabelActive(true);
    } else {
      setIsLabelActive(!isLabelActive)
    }
  };

  interface EmailInput {
    email: string
  }

  const onSubmit = (data: EmailInput): void => {
    addEmail(data.email);
    reset();
    setIsLabelActive(!isLabelActive);
    router.push('/signUp/registration');
  };


  return (
    <div className={styles.formWrapper} >
      <form
        action="#"
        aria-label="Sign up or restart your membership with Netflix."
        className={styles.emailForm}
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        >
        <h1 className={styles.subtitle}>
          Ready to watch? Enter your email to create or restart your membership.
        </h1>
        <div className={styles.inputAndButtonWrapper}>
          <div className={styles.inputAndLabelWrapper}>
            <label
              className={cn(styles.emailLabel, {[styles.activeEmailLabel]: isLabelActive})}
              htmlFor='email'
            >
              Email address
            </label>
            <input
              className={cn(
                styles.emailInput,
                {[styles.emailInputError]: errors.email},
                {[styles.emailInputSuccess]: emailName && !errors.email}
              )}
              id='email'
              maxLength={50}
              minLength={5}
              {...register('email')}
              onBlur={handleInputFocus}
              onFocus={handleInputFocus}
              type="email"
            />
            {errors.email && <p className={styles.error} >{errors.email.message}</p>}
          </div>
          <button
            className={cn(
              styles.buttonSubmit,
              {[styles.buttonSubmitDisabled]: isSubmitSuccessful}
            )}
            disabled={isSubmitSuccessful}
            type="submit"
          >
            {isSubmitSuccessful ? <LoadingIndicator /> : 'Get Started'}
          </button>
        </div>
      </form>
    </div>
  )
} ;
