import React, { ReactElement } from 'react';
import { CustomArrowProps } from 'react-slick';
import cn from 'classnames';
import styles from 'components/SliderArrows/SliderArrows.module.scss';

export const SliderArrowNext = (props: CustomArrowProps): ReactElement => {
  const {onClick } = props;

  return (
    <div
      className={cn(styles.arrowWrapper, styles.nextArrowWrapper)}
      onClick={onClick}
      role="presentation"
    >
      <div
        className={cn(styles.arrows, styles.nextArrow)}
        onClick={onClick}
        role="presentation"
    />
    </div>
  );
};

export const SliderArrowPrev = (props: CustomArrowProps): ReactElement => {
  const {onClick } = props;

  return (
    <button
      className={cn(styles.arrowWrapper, styles.prevArrowWrapper)}
      onClick={onClick}
      type="button"
      >
      <div
        className={cn(styles.arrows, styles.prevArrow)}

    />
    </button>
  );
};
