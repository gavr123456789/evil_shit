import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IDirRow, Page } from 'renderer/model/types';
import { addPage, removePage } from 'renderer/model/pagesStore';
import { join } from 'path';
import { selectFile, unselectFile } from '../model/selectedStore';
import { selectPage } from '../model/lastSelectedPage';
import FolderIcon from '@mui/icons-material/Folder';

export interface DirItemProps {
	page: Page;
	item: IDirRow;
}


export const DirRow: FC<DirItemProps> = (props) => {
	const [ activeBtns, setActiveBtns ] = useState<number[]>(() => []);

	const { item, page } = props;
	const { path } = page;


	const handleSelect = useCallback(
		(_event: React.MouseEvent<HTMLElement>, newActiveBtns: number[]) => {
			const fullPath = join(path, item.name);
			if (newActiveBtns.includes(2)) {
				// открыли папку
				addPage(fullPath);
			} else if (newActiveBtns.includes(1)) {
				// выбрали папку
				selectFile({ item, fullPath });
			} else if (newActiveBtns.length === 0) {
				// сняли выделение с папки или закрыли папку
				if (activeBtns.includes(1)) {
					// unselect folder
					console.log('unselect folder');
					unselectFile({ item, fullPath });
				} else if (activeBtns.includes(2)) {
					// close folder
					console.log('close folder');
					if (!page.selected) {
						selectPage(page);
					}
					removePage(fullPath);
				}
			}
			setActiveBtns(newActiveBtns);
		},
		[ setActiveBtns, activeBtns ]
	);

	return (
		// <ListItem disableGutters >
		<ToggleButtonGroup
			sx={{ flexGrow: 1, minHeight: '10px' }}
			value={activeBtns}
			onChange={handleSelect}
			size="small"
		>
			<ToggleButton
				color="primary"
				sx={{
					flexGrow: 1,
					gap: 1,
					display: 'flex',
					justifyContent: 'flex-start',
				}}
				value={1}
			>

				<FolderIcon />
				<Typography variant='caption' maxWidth={"80px"} noWrap>{item.name}</Typography>

			</ToggleButton>

			<ToggleButton color="primary" value={2}>
				<ArrowForwardIosIcon fontSize="small" />
			</ToggleButton>
		</ToggleButtonGroup>

	);
};
