import { FC } from "react";
import { useStore } from "effector-react";
import { $pages3 } from "../model/pagesStore";
import 'effector-logger/inspector';
import { createNewId } from "services/utils";

import { Box, List, ListItem, Stack } from "@mui/material";
import { FilePage } from "./FileList";



export const MainComponent: FC = () => {
  const pages = useStore($pages3);

  return (
    // <CarouselSwiper />
    <Box width={200} >
      {pages.map(page => (
        <FilePage key={createNewId()} page={page} />
      )

      )}
    </Box>

    // <List sx={{display: 'flex',
    // flexDirection: 'row', width: 'fit-content'}} dense={true} >
    //   <ListItem>
    //     <RecipeReviewCard  />
    //   </ListItem>
    //   <ListItem>
    //     <RecipeReviewCard  />
    //   </ListItem>
    //   <ListItem>
    //     <RecipeReviewCard  />
    //   </ListItem>
    //   <ListItem>
    //     <RecipeReviewCard  />
    //   </ListItem>
    // </List>


    // <Space direction="horizontal" style={{ margin: 6 }}>
    //   {/* {pages.map((page) => (
    //     <FilePage key={createNewId()} page={page} />
    //   ))} */}
    //   {/* <SimpleAccordion /> */}
    //   {/* <EffectorTest /> */}
    // </Space>
  );
};
