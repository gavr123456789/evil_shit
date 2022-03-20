import { FC, useEffect } from 'react';
import 'effector-logger/inspector';

import { useStore } from 'effector-react';
import { $pages3 } from 'renderer/model/pagesStore';

import { $loadingPercent } from '../model/loadingStore';
import { $lastSelectedPage, selectPage } from '../model/lastSelectedPage';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { FreeMode, Mousewheel, Pagination, Scrollbar, Virtual } from 'swiper';

import { Stack, Box, LinearProgress } from '@mui/material';

import { FilePage } from './FilePage';
import { FileRow } from './FileRow';
import { DirRow } from './DirRow';

import SwiperCore, { Virtual, Navigation, Pagination, Scrollbar, Mousewheel, FreeMode, Keyboard } from 'swiper';

import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

SwiperCore.use([ Virtual, Keyboard ]);

export const MainComponent: FC = () => {
	const pages = useStore($pages3);
	const loading = useStore($loadingPercent);
	const selectedPage = useStore($lastSelectedPage);

	useEffect(() => {
		if (pages.length > 0) {
			selectPage(pages[0]);
			console.log('first page selected ', pages[0], ' - ', selectedPage);
			console.log('aaaa ', selectedPage);
		}
	}, []);

	return (
		<Stack direction="column" alignItems="stretch" height={'100vh'}>
			<Swiper
				spaceBetween={50}
				scrollbar={{
					hide: true
				}}
				slidesPerView={3}
				modules={[ Scrollbar ]}
			>
				{pages.map((page) => (


						<FilePage page={page} />

				))}


				<SwiperSlide>Horizontal Slide 1</SwiperSlide>
				<SwiperSlide>
					<Swiper
						className="mySwiper2 swiper-v"
						direction={'vertical'}
						slidesPerView={10}

						spaceBetween={50}
						pagination={{
							clickable: true
						}}
						modules={[ Pagination ]}
					>
						<SwiperSlide>Vertical Slide 1</SwiperSlide>
						<SwiperSlide>Vertical Slide 2</SwiperSlide>
						<SwiperSlide>Vertical Slide 3</SwiperSlide>
						<SwiperSlide>Vertical Slide 4</SwiperSlide>
						<SwiperSlide>Vertical Slide 5</SwiperSlide>
					</Swiper>
				</SwiperSlide>
				<SwiperSlide>Horizontal Slide 1</SwiperSlide>
				<SwiperSlide>Horizontal Slide 1</SwiperSlide>
				<SwiperSlide>Horizontal Slide 1</SwiperSlide>

			</Swiper>
			{/* <Stack direction={"row"} >
            {pages.map((page, i) => <FilePage itemId={i} page={page} />)}

          </Stack> */}

			<Box sx={{ width: '100%', MozBoxPack: 'end' }}>
				<LinearProgress variant="determinate" value={loading} />
			</Box>
		</Stack>

	);
};
