import { FC, ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { instance } from 'api/api';
import { fetchMovies } from 'api/moviesFetching';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as authActions from 'features/authorization';
import { MainPageData } from 'types/mainPage/MainPage';
import { Movies } from 'types/MovieAPI';
import { MainHeader } from 'components/MainHeader';
import { Loader } from 'components/Loader';
import styles from 'styles/pages/main.module.scss';

const Main: FC<MainPageServerSideProps> = ({ mainPageData, error, movies }): ReactElement => {
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
  movies: Movies;
  error?: never;
}

type MainPageError = {
  mainPageData?: never;
  movies?: never;
  error: string;
}

type MainPageServerSideProps = MainPageSuccess | MainPageError;

export const getServerSideProps: GetStaticProps<MainPageServerSideProps> = async () => {
  try {
      const [
        { data },
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
      ] = await Promise.all([
        instance.get('/main'),
        fetchMovies('fetchNetflixOriginals'),
        fetchMovies('fetchTrending'),
        fetchMovies('fetchActionMovies'),
        fetchMovies('fetchComedyMovies'),
        fetchMovies('fetchDocumentaries'),
        fetchMovies('fetchHorrorMovies'),
        fetchMovies('fetchRomanceMovies'),
        fetchMovies('fetchTopRated'),
      ]);

      const movies: Movies = {
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries
      }

      return {
        props: {
          mainPageData: data,
          movies
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


