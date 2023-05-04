import React, { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { Movie } from 'types/MovieAPI';
import { Loader } from 'components/Loader';
import { Container } from 'components/Container';
import playIcon from 'images/play.svg';
import moreInfoIcon from 'images/moreInfo.svg';
import styles from 'components/Banner/Banner.module.scss';

type BannerProps = {
  netflixOriginals: Movie[];
}

export const Banner: React.FC<BannerProps> = ({ netflixOriginals }): ReactElement => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals]);

  if (!movie) {
    return <div className={styles.loaderWrapper}><Loader/></div>;
  }

  const {title, backdrop_path, poster_path, overview} = movie;
  const movieImageBaseUrl = process.env.NEXT_PUBLIC_MOVIE_IMAGE_BASE_URL;

  return (
    <div className={styles.wrapper}>

      <div className={styles.imageWrapper}>
        <Image
          alt="image"
          className={styles.image}
          src={`${movieImageBaseUrl}${backdrop_path || poster_path}`}
          fill
          priority
        />
      </div>
      <div className={styles.content}>
        <Container>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.overview}>
            {overview}
          </p>
          <div className={styles.buttonRow}>
            <button className={cn(styles.button, styles.buttonPlay)} type="button">
              <Image alt="play" className={styles.icon} src={playIcon}/>
              <span>Play</span>
            </button>
            <button className={cn(styles.button, styles.buttonMoreInfo)} type="button">
              <Image alt="more info" className={styles.icon} src={moreInfoIcon}/>
              <span>More info</span>
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
}
