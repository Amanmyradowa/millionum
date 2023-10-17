new Swiper('.swiper', {
  direction: 'horizontal',
  slidesPerView: 1,
  loop: true,
  grabCursor: true,
  touchEventsTarget: 'container',
  speed: 1500,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: '.base-slider-arrows__arrow--type-next',
    prevEl: '.base-slider-arrows__arrow--type-previous',
  },

});
