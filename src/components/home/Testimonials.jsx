import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import useResponsiveContent from "../../hooks/useResponsiveContent";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Testimonials() {
  const {isMobile, isDesktop} = useResponsiveContent()
  return (
    <section className="testimonials px-mobSectionPad md:px-sectionPad py-[13rem] md:py-[15rem]">
      <div className="title text-center">
        <h2>Voices of Our Community</h2>
        <div>
          Discover how Let's GO is making travel effortless for our community.
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={100}
          slidesPerView={isDesktop ? 3 : 1}
          navigation
          pagination={{ clickable: true }}
          slidesPerGroup={1}
          onSlideChange={() => console.log("There's been a slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          className="md:mt-20 h-[34rem] md:h-[37rem]"
        >
          {isDesktop && <SwiperSlide className="cursor-default mt-[2rem]"></SwiperSlide>}
          <SwiperSlide className="cursor-default mt-[2rem]">
            <div className="flex flex-col items-center gap-10 shadow-xl my-8 rounded-lg px-6 py-6">
              <div>
                <img src="./finegirl.png" alt="finegirl" />
              </div>
              <div className="flex flex-col text-start gap-6">
                <div className="text-[20px] font-normal">
                  Lorem ipsum dolor sit amet consectetur.
                  <br />
                  adipisicing elit. Maxime mollitia, molestiae <br />
                  quas vel sint commodi repudiandae conseq
                </div>
                <div className="text-black font-bold">Helena Weasley</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-default mt-[2rem]">
            <div className="flex flex-col items-center gap-10 shadow-xl my-8 rounded-lg px-6 py-6">
              <div>
                <img src="./finegirl.png" alt="finegirl" />
              </div>
              <div className="flex flex-col text-start gap-6">
                <div className="text-[20px] font-normal">
                  Lorem ipsum dolor sit amet consectetur.
                  <br />
                  adipisicing elit. Maxime mollitia, molestiae <br />
                  quas vel sint commodi repudiandae conseq
                </div>
                <div className="text-black font-bold">Helena Weasley</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-default mt-[2rem]">
            <div className="flex flex-col items-center gap-10 shadow-xl my-8 rounded-lg px-6 py-6">
              <div>
                <img src="./finegirl.png" alt="finegirl" />
              </div>
              <div className="flex flex-col text-start gap-6">
                <div className="text-[20px] font-normal">
                  Lorem ipsum dolor sit amet consectetur.
                  <br />
                  adipisicing elit. Maxime mollitia, molestiae <br />
                  quas vel sint commodi repudiandae conseq
                </div>
                <div className="text-black font-bold">Helena Weasley</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-default mt-[2rem]">
            <div className="flex flex-col items-center gap-10 shadow-xl my-8 rounded-lg px-6 py-6">
              <div>
                <img src="./finegirl.png" alt="finegirl" />
              </div>
              <div className="flex flex-col text-start gap-6">
                <div className="text-[20px] font-normal">
                  Lorem ipsum dolor sit amet consectetur.
                  <br />
                  adipisicing elit. Maxime mollitia, molestiae <br />
                  quas vel sint commodi repudiandae conseq
                </div>
                <div className="text-black font-bold">Helena Weasley</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-default mt-[2rem]">
            <div className="flex flex-col items-center gap-10 shadow-xl my-8 rounded-lg px-6 py-6">
              <div>
                <img src="./finegirl.png" alt="finegirl" />
              </div>
              <div className="flex flex-col text-start gap-6">
                <div className="text-[20px] font-normal">
                  Lorem ipsum dolor sit amet consectetur.
                  <br />
                  adipisicing elit. Maxime mollitia, molestiae <br />
                  quas vel sint commodi repudiandae conseq
                </div>
                <div className="text-black font-bold">Helena Weasley</div>
              </div>
            </div>
          </SwiperSlide>
          {isDesktop && <SwiperSlide className="cursor-default mt-[2rem]"></SwiperSlide>}
        </Swiper>
      </div>
    </section>
  );
}

export default Testimonials;
