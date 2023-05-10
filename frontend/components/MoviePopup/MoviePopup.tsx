import React, { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import ReactPlayer from 'react-player';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { actions as moviePreviewActions } from 'features/moviePreview';
import { PayloadAction } from '@reduxjs/toolkit';
import { Element, ElementType, Genre, ProductionCountry } from 'types/MovieAPI';
import { movieFetcher } from 'api/api';
import { AiOutlinePlus } from 'react-icons/ai';
import { HiOutlineX } from 'react-icons/hi';
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { GoThumbsup } from 'react-icons/go';
import playIcon from 'images/play.svg';
import styles from 'components/MoviePopup/MoviePopup.module.scss';

const MoviePopup: React.FC = (): ReactElement => {
  const [trailer, setTrailer] = useState<string>('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isVolumeMuted, setIsMuted] = useState<boolean>(false);
  const [productionCountries, setProductionCountries] = useState<ProductionCountry[]>([]);

  const dispatch = useAppDispatch();
  const previewMovie = useAppSelector((state) => state.moviePreview.movieForPreview);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Escape') {
      dispatch(moviePreviewActions.closeMoviePopup());
    }
  }

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
                className={styles.userButton}
                type="button"
                  >
                <AiOutlinePlus color='fff' size={23}/>
              </button>
              <button
                className={styles.userButton}
                type="button"
              >
                <GoThumbsup color='fff' size={23}/>
              </button>
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
              {vote_average && (<p className={styles.matchRank}>{vote_average * 10}% Match</p>)}
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
