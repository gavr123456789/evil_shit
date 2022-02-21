import { FC } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// eslint-disable-next-line
import 'swiper/css/bundle';
import RecipeReviewCard from '../Old/CardExample';
import { $pages3 } from 'renderer/model/pagesStore';
import { useStore } from 'effector-react';
import { createNewId } from 'services/utils';
import { FilePage } from '../FileList';

export const CarouselSwiper: FC = () => {
	const pages = useStore($pages3);

	return (
		<Swiper
			style={{ height: '100%' }}
			slidesPerView={3}
			spaceBetween={90}
			pagination={{
				clickable: true
			}}
			modules={[ Pagination ]}
		>


			{pages.map((page) => (
				<SwiperSlide key={createNewId()}>
					<FilePage page={page} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};
