import { FC } from "react"
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// eslint-disable-next-line
import "swiper/css/bundle";
import RecipeReviewCard from "../CardExample";
import { $pages3 } from "renderer/model/pagesStore";
import { useStore } from "effector-react";
import { FilePage } from "../Page";
import { createNewId } from "services/utils";

export const CarouselSwiper: FC = () => {
  const pages = useStore($pages3);

  return (
    <Swiper
    style={{height: "100%"}}
    slidesPerView={3}
    spaceBetween={5}
    pagination={{
      clickable: true,
    }}
    modules={[Pagination]}
    // className="mySwiper"
  >
    {/* {pages.map(page => (
      <SwiperSlide> <FilePage key={createNewId() + "qwe"} page={page} /> </SwiperSlide>
    ))} */}

    {pages.map(page => (
      <SwiperSlide> <RecipeReviewCard name={page.path} /> </SwiperSlide>
    ))}
    <SwiperSlide> <RecipeReviewCard name="sas" /> </SwiperSlide>
    <SwiperSlide> <RecipeReviewCard name="sas 2" /> </SwiperSlide>
    <SwiperSlide> <RecipeReviewCard name="sas 3" /> </SwiperSlide>
    <SwiperSlide> <RecipeReviewCard name="sas 4" /> </SwiperSlide>
    <SwiperSlide> <RecipeReviewCard name="sas 5" /> </SwiperSlide>
  </Swiper>
  )
}

