import * as React from 'react';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FC } from 'react';
import { Button, ButtonGroup, IconButton } from '@mui/material';

import MoveDownRoundedIcon from '@mui/icons-material/MoveDownRounded';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
const buttonGroup = (
	<ButtonGroup variant="outlined" aria-label="outlined primary button group">
		<IconButton>
			<MoveDownRoundedIcon />
		</IconButton>
		<Button>
			<FileCopyRoundedIcon />
		</Button>
		<Button>
			<DeleteRoundedIcon />
		</Button>
	</ButtonGroup>
);

export const InfoPanel: FC<{ open: boolean }> = ({ open }) => {
	const [ checked, setChecked ] = React.useState(false);
	const containerRef = React.useRef(null);

	const handleChange = () => {
		setChecked((prev) => !prev);
	};

	return (
		<Box
			sx={{
				// height: 180,
				width: 200,
				display: 'flex',
				// paddingTop: 2,
				// paddingRigth: 2,
				// paddingLeft: 2,
				padding: 2,
				borderRadius: 1,
				// bgcolor: (theme) =>
				//   theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
				overflow: 'hidden'
			}}
			ref={containerRef}
		>
			<Box sx={{ width: 200 }}>
				{/* <FormControlLabel
					control={<Switch checked={checked} onChange={handleChange} />}
					label="Show from target"
				/> */}
				<Slide direction="up" in={checked || open || true} container={containerRef.current}>
					{buttonGroup}
				</Slide>
			</Box>
		</Box>
	);
};
