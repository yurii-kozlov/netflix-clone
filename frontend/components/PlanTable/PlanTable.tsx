import React, { ReactElement, useState, SetStateAction, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as authActions from 'features/authorization';
import { SubscriptionPlans } from 'types/Plan';
import { plans } from 'constants/plans';
import { TableData } from 'components/TableData';
import { LoadingIndicator } from 'components/LoadingIndicator';
import warningIcon from 'images/warning.svg';
import greyCheckMark from 'images/checkMarkGrey.svg';
import redCheckMark from 'images/checkMark.svg';
import styles from 'components/PlanTable/PlanTable.module.scss';

export const PlanTable = (): ReactElement => {
  const [isNextButtonClicked, setIsNextButtonClicked] = useState<boolean>(false);
  const [chosenPlan, setPlan] = useState<SubscriptionPlans>(SubscriptionPlans.Basic);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector((state) => state.authorization.user?.email);
  const planError = useAppSelector((state) => state.authorization.error);
  const isLoading = useAppSelector((state) => state.authorization.isLoading);

  const handlePlanChage = (event: React.ChangeEvent<HTMLInputElement>):void =>
    setPlan(event.target.value as SetStateAction<SubscriptionPlans>);

    const handleNextButtonClick = async (): Promise<void> => {

    dispatch(authActions.subscriptionPlan({
      email: userEmail!,
      plan: plans[chosenPlan]
    }));

    setIsNextButtonClicked(true);

    if (planError) {
      setIsNextButtonClicked(false);
    }
  };

  const prices = ['EUR4.99', 'EUR7.49', 'EUR9.99'];
  const quality = ['Good', 'Better', 'Best'];
  const resolutions = ['720p', '1080p', '4K+HDR'];

  if (isNextButtonClicked && !planError && !isLoading) {
    router.push('/signUp/paymentPicker')
  }

  useEffect(() => () => {
      dispatch(authActions.actions.setError(''));
  }, [dispatch])

  return (
    <div
      className={cn(
        styles.planformWrapper,
        {[styles.planformWrapperDisappear]: isNextButtonClicked && !planError && !isLoading}
      )}
    >
      <div className={styles.stepHeader}>
        <span className={styles.stepIndicator}>
          STEP&nbsp;<b>2</b>&nbsp;OF<b>&nbsp;3</b>
        </span>
        <h1 className={styles.stepTitle}>Choose the plan that&apos;s right for you</h1>
      </div>
      <ul className={styles.checkMarkList}>
        <li className={styles.checkMarkListItem}>
          <Image alt='checkmark' className={styles.checkMark} src={redCheckMark}/>
          <span className={styles.listItemText}>Watch all you want. Ad-free.</span>
        </li>
        <li className={styles.checkMarkListItem}>
          <Image alt='checkmark' className={styles.checkMark} src={redCheckMark}/>
          <span className={styles.listItemText}>Recommendations just for you.</span>
        </li>
        <li className={styles.checkMarkListItem}>
          <Image alt='checkmark' className={styles.checkMark} src={redCheckMark}/>
          <span className={styles.listItemText}>Change or cancel your plan anytime.</span>
        </li>
      </ul>
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <div className={styles.planSelectorWrapper}>
            <label className={styles.selectorlabel} htmlFor="basic">
              <input
                checked={chosenPlan === SubscriptionPlans.Basic}
                className={styles.selectorInput}
                id='basic'
                name="planType"
                onChange={handlePlanChage}
                type="radio"
                value={SubscriptionPlans.Basic}
              />
              <span className={cn(
                styles.selectorDescription,
                {[styles.selectorDescriptionActive]: chosenPlan === SubscriptionPlans.Basic}
              )}>
                Basic
              </span>
            </label>
            <label className={styles.selectorlabel} htmlFor="standard">
              <input
                checked={chosenPlan === SubscriptionPlans.Standard}
                className={styles.selectorInput}
                id='standard'
                name="planType"
                onChange={handlePlanChage}
                type="radio"
                value={SubscriptionPlans.Standard}
              />
              <span className={cn(
                styles.selectorDescription,
                {[styles.selectorDescriptionActive]: chosenPlan === SubscriptionPlans.Standard}
              )}>
                Standard
              </span>
            </label>
            <label className={styles.selectorlabel} htmlFor="premium">
              <input
                checked={chosenPlan === SubscriptionPlans.Premium}
                className={styles.selectorInput}
                id='premium'
                name="planType"
                onChange={handlePlanChage}
                type="radio"
                value={SubscriptionPlans.Premium}
              />
              <span className={cn(
                styles.selectorDescription,
                {[styles.selectorDescriptionActive]: chosenPlan === SubscriptionPlans.Premium}
              )}>
                Premium
              </span>
            </label>
          </div>
        </div>
        <table className={styles.table}>
          <tbody className={styles.tableBody}>
            <tr className={styles.tableRow}>
              <td className={styles.feature}>
                Monthly price
              </td>
              <TableData chosenPlan={chosenPlan} content={prices}/>
            </tr>
            <tr className={styles.tableRow}>
              <td className={styles.feature}>
                Video quality
              </td>
              <TableData chosenPlan={chosenPlan} content={quality} />
            </tr>
            <tr className={styles.tableRow}>
              <td className={styles.feature}>
                Resolution
              </td>
              <TableData chosenPlan={chosenPlan} content={resolutions} />
            </tr>
            <tr className={styles.tableRow}>
              <td className={styles.feature}>
                <span className={styles.featureDevices}>
                  Watch on your TV, computer, mobile phone and tablet
                </span>
              </td>
              <td className={styles.data}>
                <Image
                  alt='checkmark'
                  className={styles.checkmark}
                  src={chosenPlan === SubscriptionPlans.Basic ? redCheckMark:greyCheckMark}/>
              </td>
              <td className={styles.data}>
                <Image
                  alt='checkmark'
                  className={styles.checkmark}
                  src={chosenPlan === SubscriptionPlans.Standard ? redCheckMark:greyCheckMark}
                />
              </td>
              <td className={styles.data}>
                <Image
                  alt='checkmark'
                  className={styles.checkmark}
                  src={chosenPlan === SubscriptionPlans.Premium ? redCheckMark:greyCheckMark}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.additionalnfoBlock}>
          <small className={styles.additionalnfoWrapper}>
            <span className={styles.additionalInfo}>
              HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service
              and device capabilities. Not all content is available in all resolutions.
              See our&nbsp;
              <a
                className={styles.outerLink}
                href="https://help.netflix.com/legal/termsofuse"
                target="_blank"
              >
                Terms of Use
              </a>
              &nbsp;for more details.
            </span>
          </small>
          <small className={styles.additionalnfoWrapper}>
            <span className={styles.additionalInfo}>
              Only people who live with you may use your account. Watch on 4 different devices at the
              same time with Premium,
              2 with Standard and 1 with Basic.
            </span>
          </small>
        </div>
        <div className={styles.buttonNextContainer}>
          <button
            className={cn(
              styles.buttonNext,
              {[styles.buttonNextDisabled]: (isLoading || (isNextButtonClicked && !planError))})}
            onClick={handleNextButtonClick}
            type="button"
          >
            {((!isLoading && !isNextButtonClicked) || (!isLoading && planError)) && 'Next'}
            {(isLoading || (isNextButtonClicked && !planError)) && (<LoadingIndicator />)}
          </button>
          {planError && (
            <div className={styles.registrationErrorWrapper}>
              <Image alt='warning-icon' className={styles.warningIcon} src={warningIcon}/>
              <p className={styles.registrationError}>
                It seems that you haven&apos;t registered yet.
                <br />
                Please <b><Link className={styles.registrationLink} href="/">register</Link></b> first.
              </p>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}
