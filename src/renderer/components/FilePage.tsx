import { Card, CardActions, CardContent, CardMedia, IconButton, List, ToggleButton } from '@mui/material';
import { FC, useState } from 'react';
import { IDirRow, Page } from 'renderer/model/types';
import { createNewId } from 'services/utils';
import { DirRow } from './DirRow';
import { FileRow } from './FileRow';
import { InfoPanel } from './InfoPanel';


import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface PageProps {
	page: Page;
}

export const FilePage: FC<PageProps> = ({ page }) => {
	const [ infoPanelOpened, setOpenInfoPanel ] = useState(false);

	return (
		<Card sx={{ width: 200, height: "fit-content" }} >
			<CardContent>
				<List dense>
					{page.dirsAndFiles.map(
						(x) =>
							x.kind === 'file' ? (
								<FileRow key={x.name} path={page.path} item={x} />
							) : (
								<DirRow key={x.name} path={page.path} item={x} />
							)
					)}
				</List>
			</CardContent>

      <CardActions disableSpacing>
        <IconButton  onClick={()=> {setOpenInfoPanel(!infoPanelOpened)}} >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>

      </CardActions>

			<CardMedia>
				<InfoPanel open={infoPanelOpened} />
			</CardMedia>
		</Card>
	);
};
