import { useCallback } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export const useCarousel = element => {
  const swiperParams = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 30,
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    style: { width: '100%', height: '100%' },
    allowTouchMove: false,
  };

  const containerStyle = {
    width: element.width,
    height: element.height,
    position: 'relative',
  };

  const handleDragStart = useCallback(e => {
    // 在這裡可以添加拖動開始的邏輯
    console.log('Drag started');
  }, []);

  return { swiperParams, containerStyle, handleDragStart };
};
