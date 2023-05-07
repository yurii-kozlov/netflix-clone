import { SliderArrowNext, SliderArrowPrev } from 'components/SliderArrows/SliderArrows';

export const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 800,
  nextArrow: <SliderArrowNext />,
  prevArrow: <SliderArrowPrev />,
  centerMode: false,
  touchMove: true,
	accessibility: true,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 2.1,
        arrows: false,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 830,
      settings: {
        slidesToShow: 3.1,
        arrows: true,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 4.1,
        arrows: true,
        slidesToScroll: 4
      }
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 5.1,
        arrows: true,
        slidesToScroll: 5
      }
    },
    {
      breakpoint: 1680,
      settings: {
        slidesToShow: 6.1,
        arrows: true,
        slidesToScroll: 6
      }
    }
  ]
};
