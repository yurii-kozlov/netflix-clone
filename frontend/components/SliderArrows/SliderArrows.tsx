import React, { ReactElement } from 'react';
import { CustomArrowProps } from 'react-slick';
import cn from 'classnames';
import styles from 'components/SliderArrows/SliderArrows.module.scss';

export const SliderArrowNext = (props: CustomArrowProps): ReactElement => {
  const {onClick } = props;

  return (
    <button
      aria-label='show next slides'
      className={cn(styles.arrowWrapper, styles.nextArrowWrapper)}
      onClick={onClick}
      type="button"
    >
      <div className={cn(styles.arrows, styles.nextArrow)}/>
    </button>
  );
};

export const SliderArrowPrev = (props: CustomArrowProps): ReactElement => {
  const {onClick } = props;

  return (
    <button
      aria-label='show previous slides'
      className={cn(styles.arrowWrapper, styles.prevArrowWrapper)}
      onClick={onClick}
      type="button"
    >
      <div className={cn(styles.arrows, styles.prevArrow)}/>
    </button>
  );
};
