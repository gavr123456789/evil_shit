import { ListItem, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IFileRow } from 'renderer/model/types';

export interface FileItemProps2 {
	path: string;
	item: IFileRow;
}

export const FileRow: FC<FileItemProps2> = (props) => {
	const [ activeBtns, setActiveBtns ] = useState<number[]>(() => []);
	const { item } = props;

	const handleFormat = (_event: React.MouseEvent<HTMLElement>, newActiveBtns: number[]) => {
		setActiveBtns(newActiveBtns);
    if (newActiveBtns.includes(1)) {
      
		}
	};

	return (
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
