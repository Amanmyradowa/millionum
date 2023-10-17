new Swiper('.product__swiper', {
  slidesPerView: 4,
  slidesPerGroup: 1,
  loopedSlides: 1,
  spaceBetween: 22,
  grabCursor: true,
  speed: 1000,

  navigation: {
    nextEl: '.base-slider-arrows__arrow--type-next-product',
    prevEl: '.base-slider-arrows__arrow--type-previous-product',
  },
});