import { Box, LinearProgress, Slide, SwipeableDrawer } from '@mui/material';
import { useStore } from 'effector-react';
import { FC, useRef } from 'react';
import { $loadingPercent } from '../model/loadingStore';
import { $globalMenuOpen, $selectedIsNotEmpty, manualOpenCloseGlobalMenu } from '../model/selectedStore';
import { InfoPanel } from './InfoPanel';

export const GlobalMenu: FC<{ open: boolean }> = ({ open }) => {
	// const containerRef = useRef(null);
	// const loading = useStore($loadingPercent);
	// const globalMenuOpen = useStore($globalMenuOpen);
  // const selectedIsNotEmpty = useStore($selectedIsNotEmpty)

  const toggleDrawer =
  ( open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    // setState({ ...state, [anchor]: open });
    // manualOpenCloseGlobalMenu(open)
  };


	return (
    <>
    <SwipeableDrawer
            anchor={"bottom"}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            // BackdropProps={{ invisible: true }}
            variant="persistent"
          >
            <Box>
              Sas
              sus
              sos
            </Box>
          </SwipeableDrawer>
    </>
	);
};
