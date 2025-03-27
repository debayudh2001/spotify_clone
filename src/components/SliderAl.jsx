import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./slider.css";

const SliderAl = ({ items }) => {
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
            <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all duration-300 group cursor-pointer w-[200px]">
              <div className="relative mb-4">
                <img
                  src={item?.images[2]?.url || ""}
                  alt={item?.name}
                  className="w-[168px] h-[168px] object-cover rounded-md shadow-lg"
                />
                <button className="play-button">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    fill="#000000"
                  >
                    <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                  </svg>
                </button>
              </div>
              <h3 className="text-white font-bold text-base mb-2 line-clamp-2">
                {item?.name}
              </h3>
              <p className="text-[#a7a7a7] text-sm line-clamp-2">
                By {item?.artists?.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderAl;
