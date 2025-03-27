import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./slider.css"

const SliderAr = ({items}) => {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView="auto"
        navigation={true}
        className="spotify-swiper"
        simulateTouch={true}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id || index} style={{ width: "auto" }}>
            <div className="flex flex-col gap-2 p-2 items-center">
                <img src={item?.images[0].url || ""} alt="img" className="w-36 h-36 object-cover rounded-full" />
                <span className="text-[gray] font-bold">{item?.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderAr;
