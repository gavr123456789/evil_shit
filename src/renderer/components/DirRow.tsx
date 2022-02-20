import { ListItem, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IDirRow } from 'renderer/model/types';

export interface DirItemProps2 {
	path: string;
	item: IDirRow;
}

export const DirRow: FC<DirItemProps2> = (props) => {
	const [ activeBtns, setActiveBtns ] = useState<number[]>(() => []);

	const { item } = props;

	const handleFormat = (_event: React.MouseEvent<HTMLElement>, newActiveBtns: number[]) => {
		setActiveBtns(newActiveBtns);
	};

	return (
		<ListItem disablePadding>

				<ToggleButtonGroup sx={{flexGrow:1}}  value={activeBtns} onChange={handleFormat} size="small">
					<ToggleButton sx={{flexGrow:1}} value={1}>
						{item.name}
					</ToggleButton>

					<ToggleButton
						value={2}
					>
						<ArrowForwardIosIcon fontSize='small' />
					</ToggleButton>
				</ToggleButtonGroup>

		</ListItem>
	);
};
