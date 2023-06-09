import { FC, ReactElement, useEffect} from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { instance } from 'api/api';
import { fetchMovies } from 'api/moviesFetching';
import * as authActions from 'features/authorization';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { MainPageData } from 'types/mainPage/MainPage';
import { Movies } from 'types/MovieAPI';
import { startTokenUpdater, intervalForUpdate } from 'api/updateTokens';
import { Loader } from 'components/Loader';
import { Banner } from 'components/Banner';
import { Error } from 'components/Error';
import { Container } from 'components/Container';
import { MoviePopup } from 'components/MoviePopup';
import styles from 'styles/pages/main.module.scss';

const CSSTransition = dynamic(() => import('react-transition-group/CSSTransition'), {
  ssr: false
});
const AnimationOnScroll = dynamic(() => import('react-animation-on-scroll').then((mod) => mod.AnimationOnScroll));
const DynamicMainHeader = dynamic(() => import('components/MainHeader').then((res) => res.MainHeader));
const DynamicMovieRow = dynamic(() => import('components/MoviesRow').then((res) => res.MoviesRow));
const DynamicMainFooter = dynamic(() =>import('components/MainFooter').then((res) => res.MainFooter));

const Main: FC<MainPageServerSideProps> = ({ mainPageData, error, movies }): ReactElement => {
  const { header, footerLinksList } = mainPageData || {};


  const isAuthorized = useAppSelector((state) => state.authorization.isAuth);
  const isMoviePopupActive = useAppSelector((state) => state.moviePreview.isMoviePopupVisible);
  const isError = useAppSelector((state) => state.authorization.error);
  const router = useRouter();

  const { ref: firstPartTunnelsRef, inView: firstPartTunnelsView } = useInView({
    triggerOnce: true,
    rootMargin: '15px'
  });

  const { ref: secondPartTunnelsRef, inView: secondPartTunnelsView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const dispatch = useAppDispatch();

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

  if (!isAuthorized || !movies) {
    return <div className={styles.loaderWrapper}><Loader /></div>
  }

  const {
    netflixOriginals,
    actionMovies,
    trendingNow,
    topRated,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries
  } = movies || {};

  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>
      <div className={styles.section}>
        <DynamicMainHeader error={error || null} headerData={header || null}/>
        <main>
          {netflixOriginals ? (
            <div className={styles.bannerWrapper}>
              <Banner netflixOriginals={netflixOriginals}/>
            </div>
          ): <Error error={error!}/>}
          <section className={styles.content}>
            <Container>
              <div className={styles.moviesRows}>
                <div className={styles.moviesRowsWrapper} ref={firstPartTunnelsRef}>
                  <div className={styles.movieRowWrapper}>
                    <DynamicMovieRow movies={trendingNow} rowTitle="Trending Now"/>
                  </div>
                  {firstPartTunnelsView && (
                    <>
                      <div className={styles.movieRowWrapper}>
                        <DynamicMovieRow movies={topRated} rowTitle="Top Rated"/>
                      </div>
                    </>
                  )}
                </div>
                <div
                  className={styles.moviesRowsWrapper}
                  ref={secondPartTunnelsRef}
                >
                  {secondPartTunnelsView && (
                    <>
                      <div className={styles.movieRowWrapper}>
                        <DynamicMovieRow movies={actionMovies} rowTitle="Action Thrillers"/>
                      </div>
                      <div className={styles.movieRowWrapper}>
                        <DynamicMovieRow movies={comedyMovies} rowTitle="Comedies"/>
                      </div>
                      <div className={styles.movieRowWrapper}>
                        <DynamicMovieRow movies={horrorMovies} rowTitle="Scary Movies"/>
                      </div>
                      <div className={styles.movieRowWrapper}>
                        <DynamicMovieRow movies={romanceMovies} rowTitle="Romance Movies"/>
                      </div>
                      <div className={styles.movieRowWrapper}>
                        <DynamicMovieRow movies={documentaries} rowTitle="Documentaries"/>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Container>
            <CSSTransition
              classNames={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                enterDone: styles.enterDone,
                exit: styles.exit,
              }}
              in={isMoviePopupActive}
              timeout={300}
              appear
              unmountOnExit
            >
              <MoviePopup/>
            </CSSTransition>
          </section>
        </main>
        {footerLinksList ? (
          <div
            className={styles.footerWrapper}
            ref={footerRef}
          >
            {footerInView && (
              <AnimationOnScroll animateIn="animate__fadeInUp" >
                <DynamicMainFooter footerLinksList={footerLinksList}/>
              </AnimationOnScroll>
            )}
          </div>
        ): (
          <Error error='Failed to fetch footer data'/>
        )}
      </div>
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
        { data: mainPageData },
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
          mainPageData,
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
