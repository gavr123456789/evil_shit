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
import { GlobalMenu } from './GloabalMenu';
import { $selectedIsNotEmpty } from '../model/selectedStore';

SwiperCore.use([ Virtual, Keyboard ]);

export const MainComponent: FC = () => {
	const pages = useStore($pages3);
	const selectedPage = useStore($lastSelectedPage);
	const selectedIsNotEmpty = useStore($selectedIsNotEmpty);

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
				spaceBetween={30}
				scrollbar={{
					hide: true
				}}
				slidesPerView={'auto'}
				modules={[ Scrollbar ]}
			>
				{pages.map((page) => <FilePage page={page} />)}
			</Swiper>
			<GlobalMenu open={selectedIsNotEmpty} />
		</Stack>
	);
};
