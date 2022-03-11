import { FC, useEffect } from 'react';
import 'effector-logger/inspector';

import { Box, LinearProgress, Stack } from '@mui/material';
import { useStore } from 'effector-react';
import { $pages3 } from 'renderer/model/pagesStore';

// import MoveDownRoundedIcon from '@mui/icons-material/MoveDownRounded';
// import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { FilePage } from './FilePage';
import { $loadingPercent } from '../model/loadingStore';
import { $lastSelectedPage, selectPage } from '../model/lastSelectedPage';
import { $selected } from '../model/selectedStore';

// export const buttonGroup = (
// 	<ButtonGroup variant="outlined" aria-label="outlined primary button group">
// 		<IconButton onClick={()=> {console.log("asas");}}>
// 			<MoveDownRoundedIcon />
// 		</IconButton>
// 		<Button>
// 			<FileCopyRoundedIcon />
// 		</Button>
// 		<Button>
// 			<DeleteRoundedIcon />
// 		</Button>
// 	</ButtonGroup>
// );

export const MainComponent: FC = () => {
	const pages = useStore($pages3);
	const loading = useStore($loadingPercent);
	const selectedPage = useStore($lastSelectedPage);

	useEffect(() => {
		if (pages.length > 0) {
			selectPage(pages[0]);
      console.log("first page selected ", pages[0], " - ", selectedPage);
      console.log("aaaa ", selectedPage);

		}
	}, []);

	return (
		<Stack
			direction="column"
			// alignItems="stretch"
			height={'100vh'}
		>
			<Stack margin={"5px"} direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2} height={'100vh'}>
				{pages.map((page) => <FilePage page={page} />)}
			</Stack>

			<Box sx={{ width: '100%', MozBoxPack: 'end' }}>
				<LinearProgress variant="determinate" value={loading} />
			</Box>
		</Stack>

		// <Space direction="horizontal" style={{ margin: 6 }}>
		//   {/* {pages.map((page) => (
		//     <FilePage key={createNewId()} page={page} />
		//   ))} */}
		//   {/* <SimpleAccordion /> */}
		//   {/* <EffectorTest /> */}
		// </Space>
	);
};
