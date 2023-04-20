import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as authActions from 'features/authorization';
import { Loader } from 'components/Loader';
import styles from 'styles/pages/main.module.scss';

const Main = (): ReactElement => {
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
  );
}

export default Main;
