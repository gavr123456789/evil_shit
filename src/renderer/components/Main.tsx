import { Space } from "antd";
import { FC } from "react";
import { useStore } from "effector-react";
import { FilePage } from "./Page";
import { $pages3 } from "../model/pagesStore";
import 'effector-logger/inspector';
import { createNewId } from "services/utils";
import SimpleAccordion from "./Accordion";


export const MainComponent: FC = () => {
  const pages = useStore($pages3);

  return (
    <Space direction="horizontal" style={{ margin: 6 }}>
      {/* {pages.map((page) => (
        <FilePage key={createNewId()} page={page} />
      ))} */}
      <SimpleAccordion />
      {/* <EffectorTest /> */}
    </Space>
  );
};
