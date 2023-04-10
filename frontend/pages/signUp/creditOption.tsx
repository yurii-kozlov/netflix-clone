import React, { ReactElement, useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputMask from 'react-input-mask';
import { getStaticProps, SignUpStaticProps } from 'api/getStaticPropsSignUp';
import { creditCardValidation } from 'constants/validationSchemas/creditCardValidation';
import { CreditCardFormInputs } from 'types/CreditCardFormInputs';
import { SignUpContainer } from 'components/SignUpContainer';
import { Container } from 'components/Container';
import { PaymentSystems } from 'components/PaymentSystems';
import styles from 'styles/pages/creditOption.module.scss';

const CreditOption: React.FC<SignUpStaticProps> = ({ error, signUpData }): ReactElement => {
  const [isCardNumberLabelActive, setIsCardNumberActive] = useState<boolean>(false);
  const [isExpirationDateLabelActive, setIsExpirationDateLabelActive] = useState<boolean>(false);
  const [isCVVlabelActive, setisCVVlabelActive] = useState<boolean>(false);
  const [isFirstNameLabelActive, setIsFirstNameLabelActive] = useState<boolean>(false);
  const [isLastNameLabelActive, setIsLastNameLabelActive] = useState<boolean>(false);

  const {
    handleSubmit, reset, register, formState: {errors, isSubmitSuccessful}, watch, setValue
  } = useForm<CreditCardFormInputs>({
    mode: 'all',
    resolver: yupResolver(creditCardValidation)
  })

  const onSubmit = (): void => {
    reset();
    setIsCardNumberActive(!isCardNumberLabelActive);
    setIsExpirationDateLabelActive(!isExpirationDateLabelActive);
    setisCVVlabelActive(!isCVVlabelActive);
    setIsFirstNameLabelActive(!isFirstNameLabelActive);
    setIsLastNameLabelActive(!isLastNameLabelActive);

    setValue('cardNumber', '');
    setValue('CVVcode', '');
    setValue('expirationDate', '');
  }

  const cardNumber = watch('cardNumber');
  const expirationDate = watch('expirationDate');
  const CVVcode = watch('CVVcode');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const usersAgreement = watch('agree');

  const handleExpitationDateInputFocus = (): void => {
    if (expirationDate) {
      setIsExpirationDateLabelActive(true);
    } else {
      setIsExpirationDateLabelActive(!isExpirationDateLabelActive)
    }
  }

  const handleCardNumberInputFocus = (): void => {
    if (cardNumber) {
      setIsCardNumberActive(true);
    } else {
      setIsCardNumberActive(!isCardNumberLabelActive)
    }
  }

  const handleCVVinputFocus = (): void => {
    if (CVVcode) {
      setisCVVlabelActive(true);
    } else {
      setisCVVlabelActive(!isCVVlabelActive);
    }
  }

  const handleFirstNameInputFocus = (): void => {
    if (firstName) {
      setIsFirstNameLabelActive(true);
    } else {
      setIsFirstNameLabelActive(!isFirstNameLabelActive);
    }
  }

  const handleLastNameInputFocus = (): void => {
    if (lastName) {
      setIsLastNameLabelActive(true);
    } else {
      setIsLastNameLabelActive(!isLastNameLabelActive);
    }
  }

  return (
    <>
      <SignUpContainer error={error || null} signUpData={signUpData || null}>
        <Container>
          <section
            className={cn(
            styles.section,
            {[styles.sectionDisappear]: isSubmitSuccessful}
            )}
          >
            <div className={styles.heading} >
              <span className={styles.stepIndicator}>
                STEP&nbsp;<b>3</b>&nbsp;OF<b>&nbsp;3</b>
              </span>
              <h1 className={styles.stepTitle}>Set up your credit or debit card</h1>
              <PaymentSystems />
            </div>
            <form
              action="#"
              className={styles.form}
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <ul className={styles.inputsList}>
                <li className={styles.inputsListItem}>
                  <div className={styles.inputAndLabelWrapper}>
                    <label
                      className={cn(
                    styles.label,
                    {[styles.activeLabel ]: isCardNumberLabelActive}
                      )}
                      htmlFor="card-number"
                    >
                      Card number
                    </label>

                    <InputMask
                      {...register('cardNumber')}
                      className={cn(
                      styles.input,
                      {[styles.inputError]: errors.cardNumber},
                      {[styles.inputSuccess]: !errors.cardNumber && cardNumber}
                      )}
                      id="cardNumber"
                      mask="9999 9999 9999 9999"
                      maskChar={null}
                      onBlur={handleCardNumberInputFocus}
                      onFocus={handleCardNumberInputFocus}
                      type="tel"
                    />
                  </div>
                  {errors.cardNumber && <p className={styles.error}>{errors.cardNumber.message}</p>}
                </li>
                <li className={styles.inputsListItemCardInfo}>
                  <div className={styles.inputAndLabelWrapper}>
                    <label
                      className={cn(
                      styles.label,
                      {[styles.activeLabel]: isExpirationDateLabelActive}
                      )}
                      htmlFor="expiration-date"
                    >
                      Expiration date
                    </label>
                    <InputMask
                      {...register('expirationDate')}
                      className={cn(
                      styles.input,
                      {[styles.inputError]: errors.expirationDate},
                      {[styles.inputSuccess]: !errors.expirationDate && expirationDate}
                      )}
                      id="expiration-date"
                      mask="99 / 99"
                      maskChar={null}
                      onBlur={handleExpitationDateInputFocus}
                      onFocus={handleExpitationDateInputFocus}
                      type="tel"
                    />
                  </div>
                  {errors.expirationDate && <p className={styles.error}>{errors.expirationDate.message}</p>}
                </li>
                <li className={styles.inputsListItemCardInfo}>
                  <div className={styles.inputAndLabelWrapper}>
                    <label
                      className={cn(
                      styles.label,
                      {[styles.activeLabel]: isCVVlabelActive}
                      )}
                      htmlFor="cvv"
                    >
                      CVV
                    </label>
                    <InputMask
                      {...register('CVVcode')}
                      className={cn(
                      styles.input,
                      {[styles.inputError]: errors.CVVcode},
                      {[styles.inputSuccess]: !errors.CVVcode && CVVcode}
                      )}
                      id="cvv"
                      mask="999"
                      maskChar={null}
                      onBlur={handleCVVinputFocus}
                      onFocus={handleCVVinputFocus}
                      type="tel"
                    />
                  </div>
                  {errors.CVVcode && <p className={styles.error}>{errors.CVVcode.message}</p>}
                </li>
                <li className={styles.inputsListItem}>
                  <div className={styles.inputAndLabelWrapper}>
                    <label
                      className={cn(
                      styles.label,
                      {[styles.activeLabel]: isFirstNameLabelActive}
                      )}
                      htmlFor="first-name"
                    >
                      First Name
                    </label>
                    <input
                      {...register('firstName')}
                      className={cn(
                      styles.input,
                      {[styles.inputError]: errors.firstName},
                      {[styles.inputSuccess]: !errors.firstName && firstName}
                      )}
                      id="first-name"
                      onBlur={handleFirstNameInputFocus}
                      onFocus={handleFirstNameInputFocus}
                      type="text"
                    />
                  </div>
                  {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
                </li>
                <li className={styles.inputsListItem}>
                  <div className={styles.inputAndLabelWrapper}>
                    <label
                      className={cn(
                      styles.label,
                      {[styles.activeLabel]: isLastNameLabelActive}
                      )}
                      htmlFor="last-name"
                    >
                      Last Name
                    </label>
                    <input
                      {...register('lastName')}
                      className={cn(
                      styles.input,
                      {[styles.inputError]: errors.lastName},
                      {[styles.inputSuccess]: !errors.lastName && lastName}
                      )}
                      id="last-name"
                      onBlur={handleLastNameInputFocus}
                      onFocus={handleLastNameInputFocus}
                      type="text"
                    />
                  </div>
                  {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
                </li>
              </ul>
              <div className={styles.userConsent}>
                <p className={styles.termsOfUseDisclosure}>
                  By checking the checkbox below, you agree to our&nbsp;
                  <a
                    className={styles.outerLink}
                    href="https://help.netflix.com/legal/termsofuse"
                    target="_blank"
                  >
                    Terms of Use
                  </a>,&nbsp;
                  <a
                    className={styles.outerLink}
                    href="https://help.netflix.com/legal/privacy"
                    target="_blank"
                  >
                    Privacy Statement
                  </a>
                  , and that you are over 18. Netflix will automatically continue your membership and charge
                  the membership fee (currently EUR4.99/month) to your payment method until you cancel.
                  You may cancel at any time to avoid future charges.
                </p>
              </div>
              <div className={styles.agreementInputWrapper}>
                <input
                  className={styles.agreementInput}
                  id="hasAcceptedTermsOfUse"
                  type="checkbox"
                  {...register('agree')}
                />
                <label
                  className={cn(
                  styles.agreementInputLabel,
                  {[styles.agreementInputLabelActive]: usersAgreement === true}
                  )}
                  htmlFor="hasAcceptedTermsOfUse"
                >
                  I agree.
                </label>
                {errors.agree && <p className={styles.error}>{errors.agree.message}</p>}
              </div>
              <button className={styles.buttonSubmit} type="submit">
                Start Membership
              </button>
            </form>
          </section>
        </Container>
      </SignUpContainer>
    </>
  );
}

export { getStaticProps };
export default CreditOption;
