import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import cn from 'classnames';
import { instance } from 'api/api';
import * as authActions from 'features/authorization';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { PersonalAccountPageData } from 'types/PersonalAccountPage';
import { startTokenUpdater, intervalForUpdate } from 'api/updateTokens';
import { PersonalAccountHeader } from 'components/PersonalAccountHeader';
import { Loader } from 'components/Loader';
import { MainFooter } from 'components/MainFooter';
import { Container } from 'components/Container';
import { Error } from 'components/Error';
import { RiAccountCircleLine } from 'react-icons/ri'
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { ImCancelCircle } from 'react-icons/im';
import styles from 'styles/pages/personalAccount.module.scss';

const PersonalAccount: NextPage<PersonalAccountStaticProps> = ({ personalAccountData, error }): ReactElement => {
  const {header, footerLinksList} = personalAccountData || {};

  const userEmail = useAppSelector((state) => state.authorization.user?.email);
  const usersPlan = useAppSelector((state) => state.authorization.user?.plan);
  const isAccountVerified = useAppSelector((state) => state.authorization.user?.isActivated);
  const isError = useAppSelector((state) => state.authorization.error);
  const isAuthorized = useAppSelector((state) => state.authorization.isAuth);
  const {name, monthlyPrice, videoQuality, resolution, multideviceViewing } = usersPlan || {};

  const router = useRouter();
  const dispatch = useAppDispatch();

  const logout = (): void => {
    dispatch(authActions.logout());
    router.push('/');
  };


  useEffect(() => {
    const job = startTokenUpdater(dispatch, intervalForUpdate, router);

    return () => {
      job.cancel();
    };
  }, []);


  useEffect(() => {
    const accesToken = localStorage.getItem('token');

    if (accesToken) {
      dispatch(authActions.checkAuth());
    }

    if (!accesToken) {
        dispatch(authActions.checkAuth());

        if (isError) {
          router.replace('/signIn');
        }
      }
  }, [isError])

  if (!isAuthorized) {
    return <div className={styles.loaderWrapper}><Loader /></div>
  }


  return(
    <>
      <Head>
        <title>Netflix Ukraine</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
          <PersonalAccountHeader error={error || null} headerData={header || null}/>
        </div>
        <div className={styles.accountInfoWrapper}>
          <Container>
            <div className={styles.accountInfoBlock}>
              <table className={styles.accountInfoTable}>
                <tbody>
                  <tr className={styles.accountInfoTableRow}>
                    <td>
                      <div className={styles.titleWrapper}>
                        <h1 className={styles.title}>Account</h1>
                        <RiAccountCircleLine
                          className={styles.profileicon}
                          color="#c4050e"
                          size={30}
                       />
                      </div>
                    </td>
                  </tr>
                  <tr className={cn(styles.accountInfoTableRow, styles.accountInfoSecondTableRow)}>
                    <td className={styles.tableFirstCell}>
                      <div className={styles.memberShipButtonWrapper}>
                        <span className={styles.buttonDescription}>Membership & Billing</span>
                        <button className={styles.buttonMembership} type="button">
                          Cancel Membership
                        </button>
                      </div>
                    </td>
                    <td className={styles.tableMiddleCell}>
                      <div className={styles.emailWrapper}>
                        <p className={styles.emailInfo}>Your email: </p>
                        <p className={styles.userEmail}>
                          <b>{userEmail}</b>
                        </p>
                      </div>
                    </td>
                    <td className={styles.tableLastCell}>
                      <div className={styles.changeAuthDataLinksWrapper}>
                        <Link className={styles.changeAuthDataLink} href="#changeEmail">
                          Change email
                        </Link>
                        <Link className={styles.changeAuthDataLink} href="#changePassword">
                          Change password
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr className={cn(styles.accountInfoTableRow, styles.accountInfoSecondTableRow)}>
                    <td className={styles.tableFirstCell}>
                      <p className={styles.planDetails}>Plan Details</p>
                    </td>
                    <td className={styles.tableMiddleCell}>
                      <div className={styles.planInfoWrapper}>
                        <h2 className={styles.planSectionName}>Name:</h2>
                        <p className={styles.planSectionInfo}>{name}</p>
                      </div>
                      <div className={styles.planInfoWrapper}>
                        <h2 className={styles.planSectionName}>Monthly Price:</h2>
                        <p className={styles.planSectionInfo}>EUR{monthlyPrice}</p>
                      </div>
                      <div className={styles.planInfoWrapper}>
                        <h2 className={styles.planSectionName}>Video Quality:</h2>
                        <p className={styles.planSectionInfo}>{videoQuality}</p>
                      </div>
                      <div className={styles.planInfoWrapper}>
                        <h2 className={styles.planSectionName}>Resolution:</h2>
                        <p className={styles.planSectionInfo}>{resolution}</p>
                      </div>
                      <div className={styles.planInfoWrapper}>
                        <h2 className={styles.planSectionName}>Multi-device Watching:</h2>
                        {multideviceViewing ? (
                          <IoCheckmarkDoneSharp color="#fff" size={20}/>
                        ): (
                          <ImCancelCircle color="#fff" size={20}/>
                        )}
                      </div>
                    </td>
                    <td className={styles.tableLastCell}>
                      <div className={styles.changeAuthDataLinksWrapper}>
                        <Link className={styles.changeAuthDataLink} href="#changePlan">
                          Change plan
                        </Link>
                        <Link className={styles.changeAuthDataLink} href="#managePaymentInfo">
                          Manage payment info
                        </Link>
                        <Link className={styles.changeAuthDataLink} href="#billingDetails">
                          Billing Details
                        </Link>
                        <Link className={styles.changeAuthDataLink} href="#addBackupPaymentMethod">
                          Add backup payment method
                        </Link>
                        <Link className={styles.changeAuthDataLink} href="#changeBillingDay">
                          Change billing day
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr className={cn(styles.accountInfoTableRow, styles.accountInfoSecondTableRow)}>
                    <td className={styles.tableFirstCell}>
                      <p className={styles.planDetails}>Settings</p>
                    </td>
                    <td className={styles.tableMiddleCell}>
                      <button
                        className={styles.signOutButton}
                        onClick={logout}
                        type="button"
                      >
                        Sign out of all devices
                      </button>
                    </td>
                  </tr>
                  <tr className={cn(styles.accountInfoTableRow, styles.accountInfoSecondTableRow)}>
                    <td className={styles.tableFirstCell}>
                      <p className={styles.planDetails}>Verification</p>
                    </td>
                    <td className={styles.tableMiddleCell}>
                      <p className={styles.accountVerificationStatus}>
                        {isAccountVerified
                          ? 'Your account has been successfully verified.'
                          : 'Please verify your account.\nActivation link has been sent to your email.'
                        }
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Container>
        </div>
        {footerLinksList ? (
          <MainFooter footerLinksList={footerLinksList}/>
        ): (
          <Error error={error!}/>
        )}
      </div>
    </>
    );
}

export default PersonalAccount;


type PersonalAccountPageSuccess = {
  personalAccountData: PersonalAccountPageData;
  error?: never;
}

type PersonalAccountPageError = {
  personalAccountData?: never;
  error: string;
}


type PersonalAccountStaticProps = PersonalAccountPageSuccess | PersonalAccountPageError;

export const getStaticProps: GetStaticProps<PersonalAccountStaticProps> = async () => {
  try {
      const { data } = await instance.get('/personalAccount');

      return {
        props: {
          personalAccountData: data
        }
      }
  } catch (error) {
      return {
        props: {
          error: 'Failed to fetch data'
        }
      }
  }
}
