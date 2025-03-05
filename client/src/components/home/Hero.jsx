import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

//images
import slide1 from "../../assets/Images/Hero1.jpg";
import slide2 from "../../assets/Images/Hero2.jpg";
import slide3 from "../../assets/Images/Hero3.png";
import slide4 from "../../assets/Images/Hero4.jpeg";
import slide5 from "../../assets/Images/Hero5.jpg";
import slide6 from "../../assets/Images/Hero6.jpg";

const slides = [
  {
    img: slide3,
    title: "market",
  },
  {
    img: slide4,
    title: "Pomegranates",
  },
  {
    img: slide5,
    title: "Strawberry",
  },
  {
    img: slide6,
    title: "Orange",
  },
];

const Hero = () => {
  return (
    <Swiper
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Pagination, Autoplay]}
      className="mySwiper w-full h-[80vh]"
      speed={500}
      loop={true}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <img src={slide.img} alt={slide.title} className="w-full h-full " />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
              <p className="text-md sm:text-lg mb-4">test</p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold">
                test
              </h1>
              <p className="text-md sm:text-lg mt-4">test</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
