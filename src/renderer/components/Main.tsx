import { FC } from "react";
import 'effector-logger/inspector';

import { Stack } from "@mui/material";
import { useStore } from "effector-react";
import { $pages3 } from "renderer/model/pagesStore";

// import MoveDownRoundedIcon from '@mui/icons-material/MoveDownRounded';
// import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { FilePage } from "./FilePage";

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

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      {pages.map((page) => (
					<FilePage page={page} />
			))}
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
