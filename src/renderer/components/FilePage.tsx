import { Box, Card, CardActions, CardContent, CardMedia, IconButton, LinearProgress, List } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { Page } from 'renderer/model/types';
import { DirRow } from './DirRow';
import { FileRow } from './FileRow';
import { InfoPanel } from './InfoPanel';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Loading } from './Loading';
import { selectPage } from '../model/lastSelectedPage';

export interface PageProps {
	page: Page;
}

export const FilePage: FC<PageProps> = ({ page }) => {
	const [ infoPanelOpened, setOpenInfoPanel ] = useState(false);

	const handleSelect = useCallback((e: React.MouseEvent<HTMLDivElement | HTMLUListElement, MouseEvent>) => {
		console.log('e.target = ', e.target, ' e.currentTarget = ', e.currentTarget);
		if (e.target !== e.currentTarget) return;
		selectPage(page);
	}, []);

	return (
		<Card sx={{ width: 200, height: 'fit-content' }}>
			<CardContent onClick={handleSelect}>
				<List dense onClick={handleSelect}>
					{page.dirsAndFiles.map(
						(x) =>
							x.kind === 'file' ? (
								<FileRow key={x.name} page={page} item={x} />
							) : (
								<DirRow key={x.name} page={page} item={x} />
							)
					)}
				</List>
			</CardContent>

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
		</Card>
	);
};
