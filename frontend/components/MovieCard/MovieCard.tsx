import React, { ReactElement } from 'react';
import Image from 'next/image';
import { useAppDispatch } from 'store/hooks';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions as moviePreviewActions } from 'features/moviePreview';
import { Movie } from 'types/MovieAPI';
import styles from 'components/MovieCard/MovieCard.module.scss';

type MovieCardProps = {
  movie: Movie
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie }): ReactElement => {
  const {backdrop_path, poster_path} = movie;
  const movieImageBaseUrl = process.env.NEXT_PUBLIC_MOVIE_IMAGE_BASE_URL;

  const sizes = `
    (max-width: 640px) 100vw,
    (max-width: 768px) 50vw,
    30vw`;

  const dispatch = useAppDispatch();
  const openMoviePopup = (): PayloadAction<Movie> => dispatch(
    moviePreviewActions.openMoviePopup(movie)
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <button
          className={styles.button}
          onClick={openMoviePopup}
          type="button"
        >
          <Image
            alt="image"
            className={styles.image}
            sizes={sizes}
            src={`${movieImageBaseUrl}${backdrop_path || poster_path}`}
            fill
          />
        </button>
      </div>
    </div>
  );
};
