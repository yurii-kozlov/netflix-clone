import { FC, ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as authActions from 'features/authorization';
import { MainHeader } from 'components/MainHeader';
import { Loader } from 'components/Loader';
import styles from 'styles/pages/main.module.scss';
import { MainPageData } from 'types/mainPage/MainPage';
import { GetStaticProps } from 'next';
import { instance } from 'api/api';

const Main: FC<MainPageStaticProps> = ({ mainPageData, error }): ReactElement => {
  const { header } = mainPageData || {};

  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.authorization.isAuth);
  const isActivated = useAppSelector((state) => state.authorization.user?.isActivated);
  const userEmail = useAppSelector((state) => state.authorization.user?.email);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized) {
      router.replace('/signIn');
    }
  }, [])

  if (!isAuthorized) {
    return <div className={styles.loaderWrapper}><Loader /></div>
  }

  return (
    <>
      <MainHeader error={error || null} headerData={header || null}/>
      <section className={styles.section}>
        <h1>Hi, you are authorized</h1>
        <h1>
          {isActivated ? `The account has been verified via email ${userEmail}`: 'VERIFY YOUR ACCOUNT'}
        </h1>
        <button onClick={(): void => {
        dispatch(authActions.logout());
        router.push('/');
        }} type="button">Log out</button>
      </section>
    </>
  );
}

export default Main;


type MainPageSuccess = {
  mainPageData: MainPageData;
  error?: never;
}

type MainPageError = {
  mainPageData?: never;
  error: string;
}

type MainPageStaticProps = MainPageSuccess | MainPageError;

export const getStaticProps: GetStaticProps<MainPageStaticProps> = async () => {
  try {
      const { data } = await instance.get('/main');

      return {
        props: {
          mainPageData: data
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


