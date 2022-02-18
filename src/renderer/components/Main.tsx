import { Space } from "antd";
import { FC } from "react";
import { useStore } from "effector-react";
import { FilePage } from "./Page";
import { $pages3 } from "../model/pagesStore";
import 'effector-logger/inspector';
import { createNewId } from "services/utils";
import SimpleAccordion from "./Accordion";
import { Box, List, ListItem, Stack } from "@mui/material";
import RecipeReviewCard from "./CardExample";
import { height, width } from "@mui/system";
import { CarouselSwiper } from "./Swiper/Swiper";

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',

};

export const MainComponent: FC = () => {
  // const pages = useStore($pages3);

  return (
    <CarouselSwiper />
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
