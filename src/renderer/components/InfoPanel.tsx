import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { FC, useCallback, useRef } from 'react';
import { Button, ButtonGroup } from '@mui/material';

// import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStore } from 'effector-react';
import { $selected } from '../model/selectedStore';
import { rm } from 'fs/promises';
import cpy from 'cpy';
import { setLoading } from '../model/loadingStore';

export const InfoPanel: FC<{ open: boolean }> = ({ open }) => {
	const containerRef = useRef(null);
	const selected = useStore($selected);

	const handleDelete = () => {
		selected.forEach(async (x) => {
			switch (x.item.kind) {
				case 'dir':
					console.log('deleting dir ', x.item.name);

					try {
						await rm(x.fullPath, { recursive: true });
						console.log('successfully deleted ', x.item.name);
					} catch (error: any) {
						console.error('there was an error:', error.message);
					}

					break;

				case 'file':
					console.log('deleting file ', x.item.name);

					try {
						await rm(x.fullPath);
						console.log('successfully deleted ', x.item.name);
					} catch (error: any) {
						console.error('there was an error:', error.message);
					}
					break;
			}
		});
	};

	const handleCopy = useCallback(async () => {
		selected.forEach(async (x) => {
			await cpy(x.fullPath, 'gavr/home/lastPageSelectedPath', { overwrite: true }).on('progress', (progress) => {
				setLoading(progress.percent * 1000);
			});
		});
	}, []);

	return (
		<Box
			sx={{
				height: open ? 'auto' : 0,
				width: 200,

				display: 'flex',

				padding: 2,
				borderRadius: 1,
				overflow: 'hidden'
			}}
			ref={containerRef}
		>
			<Box sx={{ width: 200 }}>
				<Slide direction="up" in={ open } container={containerRef.current}>

					<ButtonGroup variant="outlined">
						<Button onClick={handleDelete}>
							<DeleteIcon />
						</Button>
						<Button onClick={handleCopy}>
							<ContentCopy />
						</Button>
						<Button>
							<ContentPaste />
						</Button>
					</ButtonGroup>

				</Slide>
			</Box>
		</Box>
	);
};
