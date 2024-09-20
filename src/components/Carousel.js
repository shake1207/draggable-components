import React, { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GripVertical } from 'lucide-react';
import { useCarousel } from '../hooks/useCarousel';

const Carousel = memo(({ element }) => {
  const { swiperParams, containerStyle } = useCarousel(element);

  return (
    <div style={containerStyle}>
      <div className="absolute top-0 left-0 w-full h-8 bg-black bg-opacity-50 flex items-center justify-center cursor-move z-10" draggable>
        <GripVertical size={20} color="white" />
      </div>
      <Swiper {...swiperParams}>
        {element.images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default memo(Carousel);
