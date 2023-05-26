import React, { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import * as userActions from 'features/authorization';
import { actions as moviePreviewActions } from 'features/moviePreview';
import { PayloadAction } from '@reduxjs/toolkit';
import { Element, ElementType, Genre, ProductionCountry } from 'types/MovieAPI';
import { movieFetcher } from 'api/api';
import playIcon from 'images/play.svg';
import styles from 'components/MoviePopup/MoviePopup.module.scss';
import dynamic from 'next/dynamic';

const RiThumbUpFill = dynamic(() => import('react-icons/ri').then((module) => module.RiThumbUpFill));
const AiOutlinePlus = dynamic(() => import('react-icons/ai').then((module) => module.AiOutlinePlus));
const HiOutlineX = dynamic(() => import('react-icons/hi').then((module) => module.HiOutlineX));
const ImCheckmark = dynamic(() => import('react-icons/im').then((module) => module.ImCheckmark));
const BiVolumeFull = dynamic(() => import('react-icons/bi').then((module) => module.BiVolumeFull));
const BiVolumeMute = dynamic(() => import('react-icons/bi').then((module) => module.BiVolumeMute));
const GoThumbsup = dynamic(() => import('react-icons/go').then((module) => module.GoThumbsup));

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: true,
});

const MoviePopup: React.FC = (): ReactElement => {
  const [trailer, setTrailer] = useState<string>('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isMovieInWatchLaterList, setIsMovieInWatchLaterList] = useState<boolean>(false);
  const [isMovieInLikedList, setIsMovieInLikedList] = useState<boolean>(false);
  const [isVolumeMuted, setIsMuted] = useState<boolean>(false);
  const [productionCountries, setProductionCountries] = useState<ProductionCountry[]>([]);

  const [isDeleteFromWatchlistPopupVisible, setIsDeleteFromWatchlistPopupVisible] = useState<boolean>(false);
  const [isDeleteFromLikedlistPopupVisible, setIsDeleteFromLikedlistPopupVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const previewMovie = useAppSelector((state) => state.moviePreview.movieForPreview);
  const watchLaterMoviesList = useAppSelector((state) => state.authorization.user?.watchLaterMovies);
  const likedMoviesList = useAppSelector((state) => state.authorization.user?.likedMovies);
  const userEmail = useAppSelector((state) => state.authorization.user?.email);

  const handleDeleteFromWatchlistPopupVisibility = (): void =>
    setIsDeleteFromWatchlistPopupVisible(!isDeleteFromWatchlistPopupVisible);

  const handleDeleteFromLikedlistPopupVisibility = (): void =>
  setIsDeleteFromLikedlistPopupVisible(!isDeleteFromLikedlistPopupVisible);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Escape') {
      dispatch(moviePreviewActions.closeMoviePopup());
    }
  }

  const addMovieToWatchLaterList = (): void => {
    if (isMovieInWatchLaterList) {
      handleDeleteFromWatchlistPopupVisibility();
      setIsDeleteFromLikedlistPopupVisible(false);
    }

    if (!userEmail || !previewMovie || isMovieInWatchLaterList) {
      return;
    }

    setIsMovieInWatchLaterList(true);

    dispatch(userActions.addMovieToWatchLaterList({
      email: userEmail,
      watchLaterMovie: previewMovie,
    }));
  }

  const addMovieToLikedList = (): void => {
    if (isMovieInLikedList) {
      handleDeleteFromLikedlistPopupVisibility();
      setIsDeleteFromWatchlistPopupVisible(false);
    }

    if (!userEmail || !previewMovie || isMovieInLikedList) {
      return;
    }

    setIsMovieInLikedList(true);

    dispatch(userActions.addMovieToLikedList({
      email: userEmail,
      likedMovie: previewMovie,
    }))
  }

  const deleteMovieFromWatchList = (): void => {
    if (!userEmail || !previewMovie || !isMovieInWatchLaterList) {
      return;
    }

    setIsMovieInWatchLaterList(false);
    setIsDeleteFromWatchlistPopupVisible(false);

    dispatch(userActions.deleteMovieFromWatchList({
      email: userEmail,
      movieTitle: previewMovie.title,
    }));
  }

  const deleteMovieFromLikedList = (): void => {
    if (!userEmail || !previewMovie || !isMovieInLikedList) {
      return;
    }

    setIsMovieInLikedList(false);
    setIsDeleteFromWatchlistPopupVisible(false);

    dispatch(userActions.deleteMovieFromLikedList({
      email: userEmail,
      movieTitle: previewMovie.title
    }))
  }

  useEffect(() => {
    const isMovieInWatchLaterListAlready = watchLaterMoviesList?.some((movie) => movie.title === previewMovie?.title);
    const isMovieInLikedListAlready = likedMoviesList?.some((movie) => movie.title === previewMovie?.title);

    if (isMovieInWatchLaterListAlready) {
      setIsMovieInWatchLaterList(true);
    }

    if (isMovieInLikedListAlready) {
      setIsMovieInLikedList(true);
    }

  }, [])

  useEffect(() => {
    if (!previewMovie) return;

    async function fetchMovie(): Promise<void> {
      const { data } = await movieFetcher.get(
        `/${
          previewMovie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${previewMovie?.id}?api_key=${
          process.env.NEXT_PUBLIC_MOVIE_API_KEY
        }&language=en-US&append_to_response=videos`
      )

      if (data?.production_countries) {
        setProductionCountries(data.production_countries);
      }

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === ElementType.Trailer
        )
        setTrailer(data.videos?.results[index]?.key)
      }

      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [previewMovie])

  const closeMoviePopup = (): PayloadAction<void> => dispatch(moviePreviewActions.closeMoviePopup());
  const toggleVolume = (): void => setIsMuted(!isVolumeMuted);

  const {
    vote_average,
    release_date,
    first_air_date,
    overview,
    original_language,
    vote_count,
  } = previewMovie || {};

  return (
    <div
      aria-label="handle popup visibility"
      className={styles.block}
      onClick={closeMoviePopup}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {previewMovie && (
        <div
          className={styles.content}
          onClick={(event): void => event.stopPropagation()}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
            >
          <div className={styles.playerWrapper}>
            <button
              className={styles.buttonClose}
              onClick={closeMoviePopup}
              type="button"
            >
              <HiOutlineX color='fff' size={23}/>
            </button>
            <button
              className={cn(styles.userButton, styles.buttonVolume)}
              onClick={toggleVolume}
              type="button"
                >
              {isVolumeMuted ? (
                <BiVolumeMute color='fff' size={23}/>
              ): (
                <BiVolumeFull color='fff' size={23}/>
              )}
            </button>
            <div className={styles.userButtonsGroup}>
              <button className={cn(styles.button, styles.buttonPlay)} type="button">
                <Image alt="play" className={styles.icon} src={playIcon}/>
                <span>Play</span>
              </button>
              <button
                className={cn(styles.userButton, styles.buttonAddToWatchLater)}
                onClick={addMovieToWatchLaterList}
                type="button"
              >
                {isMovieInWatchLaterList
                  ? <ImCheckmark color='fff' size={23}/>
                  : <AiOutlinePlus color='fff' size={23}/>
                }
              </button>
              <div
                className={cn(
                  styles.deleteMovieConfirmationWrapper,
                  styles.deleteFromWatchlistConfirmationWrapper,
                  {[styles.deleteFromWatchlistConfirmationWrapperActive]: isDeleteFromWatchlistPopupVisible}
                )}
                onClick={(): void => setIsDeleteFromWatchlistPopupVisible(false)}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
              >
                <p className={styles.deleteMovieDescription}>
                  Please click
                  <button
                    aria-label="delete the movie from watchlist"
                    className={cn(
                      styles.deleteFromListButton,
                      styles.deleteFromWatchlistButton
                    )}
                    onClick={deleteMovieFromWatchList}
                    type="button">
                    here
                  </button>
                  to delete the movie from your watchlist
                </p>
              </div>
              <button
                className={cn(styles.userButton, styles.buttonAddToLikedList)}
                onClick={addMovieToLikedList}
                type="button"
              >
                {isMovieInLikedList
                  ? <RiThumbUpFill color='fff' size={23}/>
                  : <GoThumbsup color='fff' size={23}/>
                }
              </button>
              <div
                className={cn(
                  styles.deleteMovieConfirmationWrapper,
                  styles.deleteFromLikedListConfirmationWrapper,
                  {[styles.deleteFromLikedListConfirmationWrapperActive]: isDeleteFromLikedlistPopupVisible}
                )}
                onClick={(): void => setIsDeleteFromLikedlistPopupVisible(false)}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
              >
                <p className={styles.deleteMovieDescription}>
                  Please click
                  <button
                    aria-label="delete the movie from liked list"
                    className={cn(
                      styles.deleteFromListButton,
                      styles.deleteFromWatchlistButton
                    )}
                    onClick={deleteMovieFromLikedList}
                    type="button">
                    here
                  </button>
                  to delete the movie from your liked list
                </p>
              </div>
            </div>
            <ReactPlayer
              className={styles.reactPlayer}
              height='100%'
              muted={isVolumeMuted}
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width='100%'
              playing
            />
          </div>
          <div className={styles.detailedInfo}>
            <div className={styles.releaseInfoAndMatchWrapper}>
              {vote_average && (<p className={styles.matchRank}>{Math.round(vote_average * 10)}% Match</p>)}
              <p className={styles.releaseData}>{release_date || first_air_date}</p>
              <div className={styles.qualityWrapper}>
                <span className={styles.quality}>HD</span>
              </div>
            </div>
            <div className={styles.descriptionAndAdditionalInfoBlocksWrapper}>
              <div className={styles.descriptionBlock}>
                <p className={styles.overview}>
                  {overview}
                </p>
              </div>
              <div className={styles.additionalInfo}>
                <div className={styles.additionalInfoSubblock}>
                  <span className={styles.additionalInfoSubblockTitle}>Genres:&nbsp;</span>
                  <p className={styles.additionalInfoSubblockContent}>{genres.map((genre) => genre.name).join(', ')}</p>
                </div>
                {productionCountries && (
                  <div className={styles.additionalInfoSubblock}>
                    <span className={styles.additionalInfoSubblockTitle}>
                      Production {productionCountries.length > 1 ? 'countries': 'country'}:&nbsp;
                    </span>
                    <p className={styles.additionalInfoSubblockContent}>
                      {productionCountries.map((productionCountry) => productionCountry.name).join(', ')}
                    </p>
                  </div>
                    )}
                <div className={styles.additionalInfoSubblock}>
                  <span className={styles.additionalInfoSubblockTitle}>Original language:&nbsp;</span>
                  <p className={styles.additionalInfoSubblockContent}>{original_language}</p>
                </div>
                <div className={styles.additionalInfoSubblock}>
                  <span className={styles.additionalInfoSubblockTitle}>Total votes:&nbsp;</span>
                  <p className={styles.additionalInfoSubblockContent}>{vote_count}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

 MoviePopup.displayName='MoviePopup';

 export default MoviePopup;
