import { Box, LinearProgress, Slide } from '@mui/material';
import { FC, useRef } from 'react';

export const Loading: FC<{ open: boolean }> = ({ open }) => {
	const containerRef = useRef(null);

	return (
		<Slide direction="up" in={open} container={containerRef.current}>
			<Box sx={{ width: '100%' }} ref={containerRef}>
				<LinearProgress variant="determinate" value={100} />
			</Box>
		</Slide>
	);
};
