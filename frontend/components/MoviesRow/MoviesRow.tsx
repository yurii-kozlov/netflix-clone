import React, { ReactElement} from 'react';
import { v4 as uuid_v4 } from 'uuid';
import Slider from 'react-slick';
import { AnimationOnScroll} from 'react-animation-on-scroll';
import { Movie } from 'types/MovieAPI';
import { sliderSettings } from 'constants/sliderSettings';
import { MovieCard } from 'components/MovieCard';
import styles from 'components/MoviesRow/MoviesRow.module.scss';

type MoviesRowProps = {
  rowTitle: string,
  movies: Movie[]
}

export const MoviesRow: React.FC<MoviesRowProps> = ({ rowTitle, movies }): ReactElement => (
  <div >
    <AnimationOnScroll animateIn="animate__fadeInUp" >
      <div className={styles.wrapper} >
        <h2 className={styles.title}>{rowTitle}</h2>
        <div className={styles.block}>
          <Slider {...sliderSettings}>
            {movies.map((movie) => (
              <MovieCard key={uuid_v4()} movie={movie}/>
            ))}
          </Slider>
        </div>
      </div>
    </AnimationOnScroll>
  </div>
);
