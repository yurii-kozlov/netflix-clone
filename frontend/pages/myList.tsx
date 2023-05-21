import { GetStaticProps, NextPage } from 'next';
import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { v4 as uuid_v4 } from 'uuid';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { instance } from 'api/api';
import * as authActions from 'features/authorization';
import { MyListPageData } from 'types/MyList';
import { startTokenUpdater, intervalForUpdate } from 'api/updateTokens';
import { PersonalAccountHeader } from 'components/PersonalAccountHeader';
import { MainFooter } from 'components/MainFooter';
import { MovieCard } from 'components/MovieCard';
import { Error } from 'components/Error';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { MoviePopup } from 'components/MoviePopup';
import { Container } from 'components/Container';
import { Loader } from 'components/Loader';
import { LoadingIndicator } from 'components/LoadingIndicator';
import styles from 'styles/pages/myList.module.scss';

const MyList: NextPage<MyListStaticProps> = ({ error, myListData }): ReactElement => {
  const [isClearWatchListButtonClicked, setIsClearWatchListButtonClicked] = useState<boolean>(false);
  const [isClearLikedListButtonClicked, setIsClearLikedListButtonClicked] = useState<boolean>(false);

  const {header, footerLinksList} = myListData || {};
  const isError = useAppSelector((state) => state.authorization.error);
  const isMoviePopupActive = useAppSelector((state) => state.moviePreview.isMoviePopupVisible);
  const watchLaterMovies = useAppSelector((state) => state.authorization.user?.watchLaterMovies);
  const likedMovies = useAppSelector((state) => state.authorization.user?.likedMovies);
  const userEmail = useAppSelector((state) => state.authorization.user?.email);
  const isClearListLoading = useAppSelector((state) => state.authorization.isLoading);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const clearWatchLaterList = (): void => {
    setIsClearWatchListButtonClicked(true);

    if (!userEmail) {
      return;
    }
    dispatch(authActions.clearWatchLaterList({email: userEmail}))
  }

  const clearLikedMoviesList = (): void => {
    setIsClearLikedListButtonClicked(true);

    if (!userEmail) {
      return;
    }

    dispatch(authActions.clearLikedMoviesList({email: userEmail}))
  }

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

  const isAuthorized = useAppSelector((state) => state.authorization.isAuth);

  if (!isAuthorized) {
    return <div className={styles.loaderWrapper}><Loader /></div>
  }

  return (
    <>
      <Head>
        <title>Netflix Ukraine</title>
      </Head>
      <div className={styles.wrapper}>
        <PersonalAccountHeader error={error || null} headerData={header || null}/>
        <Container>
          <section className={styles.listsSection}>
            <div className={styles.listSubsection}>
              {watchLaterMovies?.length === 0 ? (
                <h1 className={styles.subsectionTitle}>
                  Your watchlist is empty
                </h1>
                ): (
                  <>
                    <div className={styles.buttonsAndSubsectionTitleWrapper}>
                      <h1 className={styles.subsectionTitle}>
                        Watchlist
                      </h1>
                      <div className={styles.buttonsWrapper}>
                        <button
                          className={cn(
                        styles.button,
                        styles.buttonClearWatchlist,
                        {[styles.buttonDisabled]: isClearWatchListButtonClicked && isClearListLoading}
                          )}
                          disabled={isClearListLoading}
                          onClick={clearWatchLaterList}
                          type="button"
                        >
                          {(isClearListLoading && isClearWatchListButtonClicked) ? <LoadingIndicator /> : 'Clear list'}
                        </button>
                      </div>
                    </div>
                    <div className={styles.moviesRowWrapper}>
                      {watchLaterMovies?.map((movie) => (
                        <MovieCard key={uuid_v4()} movie={movie}/>
                      ))}
                    </div>
                  </>
                )}
            </div>
            <div className={styles.listSubsection}>
              {likedMovies?.length === 0 ? (
                <h1 className={styles.subsectionTitle}>
                  Your favorites list is empty
                </h1>
                  ): (
                    <>
                      <div className={styles.buttonsAndSubsectionTitleWrapper}>
                        <h1 className={styles.subsectionTitle}>
                          Liked Movies
                        </h1>
                        <div className={styles.buttonsWrapper}>
                          <button
                            className={cn(
                              styles.button,
                              styles.buttonClearLikedMovieslist,
                              {[styles.buttonDisabled]: isClearLikedListButtonClicked && isClearListLoading}
                            )}
                            disabled={isClearListLoading}
                            onClick={clearLikedMoviesList}
                            type="button"
                          >
                            {(isClearListLoading && isClearLikedListButtonClicked)
                              ? <LoadingIndicator />
                              : 'Clear list'
                            }
                          </button>
                        </div>
                      </div>
                      <div className={styles.moviesRowWrapper}>
                        {likedMovies?.map((movie) => (
                          <MovieCard key={uuid_v4()} movie={movie}/>
                        ))}
                      </div>
                    </>
                  )}
            </div>
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
        </Container>
        {footerLinksList ? (
          <MainFooter footerLinksList={footerLinksList}/>
        ): (
          <Error error={error!}/>
        )}
      </div>
    </>
  );
}

export default MyList;


type MyListPageSuccess = {
  myListData: MyListPageData;
  error?: never;
}

type MyListPageError = {
  myListData?: never;
  error: string;
}

type MyListStaticProps = MyListPageSuccess | MyListPageError;

export const getStaticProps: GetStaticProps<MyListStaticProps> = async () => {
  try {
      const { data } = await instance.get('/myList');

      return {
        props: {
          myListData: data
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
