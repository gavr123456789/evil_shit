import { Card, CardActions, CardContent, CardMedia, IconButton, List } from '@mui/material';
import { FC, useState } from 'react';
import { IDirRow, Page } from 'renderer/model/types';
import { createNewId } from 'services/utils';
import { DirRow } from './DirRow';
import { FileRow } from './FileRow';
import { InfoPanel } from './InfoPanel';


import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
export interface PageProps2 {
	page: Page;
}

export const FilePage: FC<PageProps2> = ({ page }) => {
	const [ infoPanelOpened, setOpenInfoPanel ] = useState(false);

	return (
		<Card sx={{ width: 200 }}>
			<CardContent>
				<List dense>
					{page.dirsAndFiles.map(
						(x) =>
							x.kind === 'file' ? (
								<FileRow key={createNewId()} path={page.path} item={x} />
							) : (
								<DirRow key={createNewId()} path={page.path} item={x} />
							)
					)}
				</List>
			</CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      </CardActions>

			<CardMedia>
				<InfoPanel open={infoPanelOpened} />
			</CardMedia>
		</Card>
	);
};
