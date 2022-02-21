import { ListItem, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { FC, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IDirRow } from 'renderer/model/types';
import { addPage } from 'renderer/model/pagesStore';
import { join } from 'path';

export interface DirItemProps2 {
	path: string;
	item: IDirRow;
}

export const DirRow: FC<DirItemProps2> = (props) => {
	const [ activeBtns, setActiveBtns ] = useState<number[]>(() => []);

	const { item, path } = props;

	const handleFormat = (_event: React.MouseEvent<HTMLElement>, newActiveBtns: number[]) => {
		setActiveBtns(newActiveBtns);
		if (newActiveBtns.includes(2)) {
			addPage(join(path, item.name));
		}
	};

	return (
    // disablePadding
		<ListItem disableGutters >
			<ToggleButtonGroup sx={{ flexGrow: 1 }} value={activeBtns} onChange={handleFormat} size="small">
				<ToggleButton color="primary" sx={{ flexGrow: 1 }} value={1}>
					{item.name}
				</ToggleButton>

				<ToggleButton color="primary" value={2}>
					<ArrowForwardIosIcon fontSize="small" />
				</ToggleButton>
			</ToggleButtonGroup>
		</ListItem>
	);
};
