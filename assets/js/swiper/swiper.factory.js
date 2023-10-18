new Swiper('.factory__swiper', {
  slidesPerView: 5,
  slidesPerGroup: 1,
  loopedSlides: 1,
  spaceBetween: 22,
  grabCursor: true,
  speed: 1000,

  navigation: {
    nextEl: '.base-slider-arrows__arrow--type-next-factory',
    prevEl: '.base-slider-arrows__arrow--type-previous-factory',
  },
});