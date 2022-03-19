import { Box, Card, CardActions, CardContent, CardMedia, IconButton, LinearProgress, List, Stack } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { Page } from 'renderer/model/types';
import { DirRow } from './DirRow';
import { FileRow } from './FileRow';
import { InfoPanel } from './InfoPanel';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Loading } from './Loading';
import { selectPage } from '../model/lastSelectedPage';
import SwiperCore, { Virtual, Navigation, Pagination, Scrollbar, Mousewheel, FreeMode, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface PageProps {
	page: Page;
	// itemId: number
}

export const FilePage: FC<PageProps> = ({ page }) => {
	const [ infoPanelOpened, setOpenInfoPanel ] = useState(false);

	const handleSelect = useCallback((e: React.MouseEvent<HTMLDivElement | HTMLUListElement, MouseEvent>) => {
		console.log('e.target = ', e.target, ' e.currentTarget = ', e.currentTarget);
		if (e.target !== e.currentTarget) return;
		selectPage(page);
	}, []);

	return (
		<SwiperSlide
			style={{
				margin: 10,
				marginBlock: '10px'
			}}
		>
			{/* <Card sx={{ width: 200, minHeight: 400, m: 2 }}>
				<CardContent onClick={handleSelect}> */}
					<Swiper
						wrapperTag="div"
						direction={'vertical'}
						mousewheel={true}
						freeMode={true}
						// spaceBetween={5}
						modules={[ Scrollbar, Mousewheel, FreeMode, Keyboard ]}
						slidesPerView={10}
						virtual={{
							addSlidesBefore: 10,
							addSlidesAfter: 10
						}}
						scrollbar={{
							hide: true,
							draggable: true
						}}
					>
						{page.dirsAndFiles.map(
							(x, i) =>
								x.kind === 'file' ? (
									<SwiperSlide key={x.name} virtualIndex={i}>
										<FileRow page={page} item={x} />
									</SwiperSlide>
								) : (
									<SwiperSlide key={x.name} virtualIndex={i}>
										<DirRow page={page} item={x} />
									</SwiperSlide>
								)
						)}
					</Swiper>

				{/* </CardContent>

				<CardActions disableSpacing>
					<IconButton
						onClick={() => {
							setOpenInfoPanel(!infoPanelOpened);
						}}
					>
						<ArrowForwardIosIcon fontSize="small" />
					</IconButton>
				</CardActions>

				<CardMedia>
					<InfoPanel open={infoPanelOpened} />

					<Loading open={page.selected} />
				</CardMedia>
			</Card> */}
		</SwiperSlide>
	);
};

FilePage.displayName = 'SwiperSlide';
