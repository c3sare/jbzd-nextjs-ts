"use client";

import "swiper/css";

import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Controller } from "swiper/modules";
import Image from "next/image";
import Arrow from "./Arrow";
import { useState } from "react";

const sliderImages = [
  "/images/premium/s1.png",
  "/images/premium/s2.png",
  "/images/premium/s3.png",
  "/images/premium/s4.png",
  "/images/premium/s5.png",
  "/images/premium/s6.png",
];

const ImageSlider = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const currentSlide = swiper?.activeIndex || 0;
  const maxSlide = (swiper?.slides?.length || 1) - 1;

  const disabled = {
    left: currentSlide === 0,
    right: maxSlide === currentSlide,
  };

  return (
    <div className="relative w-full px-[45px]">
      <Arrow
        disabled={disabled["left"]}
        direction="left"
        onClick={() => swiper?.slidePrev()}
      />
      <Swiper modules={[Controller]} onSwiper={setSwiper}>
        {sliderImages.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              className="mx-auto"
              width={283}
              height={340}
              alt={`Obraz ${index}`}
              src={src}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Arrow
        disabled={disabled["left"]}
        direction="right"
        onClick={() => swiper?.slideNext()}
      />
    </div>
  );
};

export default ImageSlider;
