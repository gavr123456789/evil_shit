import { ListItem, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IFileRow, Page } from 'renderer/model/types';
import { selectFile, unselectFile } from '../model/selectedStore';
import { join } from 'path';

export interface FileItemProps {
	item: IFileRow;
  page: Page
}

export const FileRow: FC<FileItemProps> = (props) => {
	const [ activeBtns, setActiveBtns ] = useState<number[]>(() => []);

  const { item, page } = props;
  const { path } = page

	const handleSelect = useCallback( (_event: React.MouseEvent<HTMLElement>, newActiveBtns: number[]) => {
		const fullPath = join(path, item.name)
    if (newActiveBtns.includes(2)) {
      // запустили файл

		} else if (newActiveBtns.includes(1)) {
      // выбрали файл
      selectFile({item, fullPath})
    } else if (newActiveBtns.length === 0) {
      // сняли выделение с файла
      if (activeBtns.includes(1)) {
        // unselect folder
        console.log("unselect folder");
        unselectFile({item, fullPath})
      }
      else if (activeBtns.includes(2)) {
        // отжали вторую кнопку, не должно происходить
      }

    }
		setActiveBtns(newActiveBtns);

	}, [setActiveBtns, activeBtns]);

	return (
		<ListItem disableGutters >
			<ToggleButtonGroup sx={{ flexGrow: 1 }} value={activeBtns} onChange={handleSelect} size="small">
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
