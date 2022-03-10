import { ListItem, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IDirRow } from 'renderer/model/types';
import { addPage, removePage } from 'renderer/model/pagesStore';
import { join } from 'path';
import { selectFile, unselectFile } from '../model/selectedStore';

export interface DirItemProps {
	path: string;
	item: IDirRow;
}


export const DirRow: FC<DirItemProps> = (props) => {
	const [ activeBtns, setActiveBtns ] = useState<number[]>(() => []);

	const { item, path } = props;

	const handleSelect = useCallback( (_event: React.MouseEvent<HTMLElement>, newActiveBtns: number[]) => {
		const fullPath = join(path, item.name)
    if (newActiveBtns.includes(2)) {
      // открыли папку
			addPage(fullPath);
		} else if (newActiveBtns.includes(1)) {
      // выбрали папку
      selectFile({item, fullPath})
    } else if (newActiveBtns.length === 0) {
      // сняли выделение с папки или закрыли папку
      if (activeBtns.includes(1)) {
        // unselect folder
        console.log("unselect folder");
        unselectFile({item, fullPath})
      }
      else if (activeBtns.includes(2)) {
        // close folder
        console.log("close folder");
        removePage(fullPath);
      }

    }
		setActiveBtns(newActiveBtns);

	}, [setActiveBtns, activeBtns]);


	return (
		<ListItem disableGutters >
			<ToggleButtonGroup sx={{ flexGrow: 1 }} value={activeBtns} onChange={handleSelect} size="small">

        <ToggleButton color="primary"  sx={{ flexGrow: 1 }} value={1}>
					{item.name}
				</ToggleButton>

				<ToggleButton color="primary" value={2}>
					<ArrowForwardIosIcon fontSize="small" />
				</ToggleButton>

			</ToggleButtonGroup>
		</ListItem>
	);
};
