import { ReactElement, useState } from 'react';
import cn from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { emailValidationSchema } from 'constants/validationSchemas/introPageEmailValidation';
import { introPageForminputs } from 'types/introPageFormInputs';
import styles from 'components/SubscriptionForm/SubscriptionForm.module.scss';

export const SubscriptionForm = (): ReactElement => {
  const [isLabelActive, setIsLabelActive] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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

  const onSubmit = (): void => {
    reset();
    setIsLabelActive(!isLabelActive);
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
        <h3 className={styles.subtitle}>
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
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
          <button className={styles.buttonSubmit} type="submit">Get Started</button>
        </div>
      </form>
    </div>
    )
} ;
