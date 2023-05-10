import { FC, ReactElement, useEffect} from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { AnimationOnScroll} from 'react-animation-on-scroll';
import { useInView } from 'react-intersection-observer';
import { CSSTransition } from 'react-transition-group';
import { instance } from 'api/api';
import { fetchMovies } from 'api/moviesFetching';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as authActions from 'features/authorization';
import { MainPageData } from 'types/mainPage/MainPage';
import { Movies } from 'types/MovieAPI';
import { MainHeader } from 'components/MainHeader';
import { Loader } from 'components/Loader';
import { Banner } from 'components/Banner';
import { Error } from 'components/Error';
import { Container } from 'components/Container';
import styles from 'styles/pages/main.module.scss';

const DynamicMovieRow = dynamic(() => import('components/MoviesRow').then((res) => res.MoviesRow));
const DynamicMoviePopup = dynamic(() => import('components/MoviePopup').then((res) => res.MoviePopup));
const DynamicMainFooter = dynamic(() =>import('components/MainFooter').then((res) => res.MainFooter));

const Main: FC<MainPageServerSideProps> = ({ mainPageData, error, movies }): ReactElement => {
  const { header, footerLinksList } = mainPageData || {};

  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.authorization.isAuth);
  const isActivated = useAppSelector((state) => state.authorization.user?.isActivated);
  const userEmail = useAppSelector((state) => state.authorization.user?.email);
  const isMoviePopupActive = useAppSelector((state) => state.moviePreview.isMoviePopupVisible);
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

  useEffect(() => {
    if (!isAuthorized) {
      router.replace('/signIn');
    }
  }, [])

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
        <MainHeader error={error || null} headerData={header || null}/>
        <main>
          {netflixOriginals ? (
            <div className={styles.bannerWrapper}>
              <Banner netflixOriginals={netflixOriginals}/>
            </div>
          ): <Error error={error!}/>}
          <section className={styles.content}>
            <Container>
              <div className={styles.moviesRows}>
                <div ref={firstPartTunnelsRef}>
                  {firstPartTunnelsView && (
                    <>
                      <div className={styles.movieRowWrapper}>
                        <DynamicMovieRow movies={trendingNow} rowTitle="Trending Now"/>
                      </div>
                      <div className={styles.movieRowWrapper}>
                        <DynamicMovieRow movies={topRated} rowTitle="Top Rated"/>
                      </div>
                    </>
                  )}
                </div>
                <div ref={secondPartTunnelsRef}>
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
              <div className={styles.temporaryAuth}>
                <h1>Hi, you are authorized</h1>
                <h1>
                  {isActivated ? `The account has been verified via email ${userEmail}`: 'VERIFY YOUR ACCOUNT'}
                </h1>
                <button onClick={(): void => {
                dispatch(authActions.logout());
                router.push('/');
                }} type="button">Log out</button>
              </div>
            </Container>
            <CSSTransition
              classNames="popup"
              in={isMoviePopupActive}
              timeout={300}
              unmountOnExit
            >
              <DynamicMoviePopup />
            </CSSTransition>
          </section>
        </main>
        {footerLinksList ? (
          <div className={styles.footerWrapper} ref={footerRef}>
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
