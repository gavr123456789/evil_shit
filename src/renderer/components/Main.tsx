import { FC } from "react";
import 'effector-logger/inspector';

import { CarouselSwiper } from "./Swiper/CarouselSwiper";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import { useStore } from "effector-react";
import { $pages3 } from "renderer/model/pagesStore";

import MoveDownRoundedIcon from '@mui/icons-material/MoveDownRounded';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export const buttonGroup = (
	<ButtonGroup variant="outlined" aria-label="outlined primary button group">
		<IconButton onClick={()=> {console.log("asas");}}>
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

export const MainComponent: FC = () => {
  const pages = useStore($pages3);

  return (
    <>
      <CarouselSwiper  />
      {buttonGroup}
    </>



    // <Space direction="horizontal" style={{ margin: 6 }}>
    //   {/* {pages.map((page) => (
    //     <FilePage key={createNewId()} page={page} />
    //   ))} */}
    //   {/* <SimpleAccordion /> */}
    //   {/* <EffectorTest /> */}
    // </Space>
  );
};
