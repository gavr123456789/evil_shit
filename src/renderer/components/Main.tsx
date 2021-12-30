import { Space } from "antd";
import { FC } from "react";
import { useStore } from "effector-react";
import { FilePage } from "./Page";
import { $pages3 } from "../model/pagesStore";
import 'effector-logger/inspector';


export const MainComponent: FC = () => {
  const pages = useStore($pages3);

  return (
    <Space direction="horizontal" style={{ margin: 6 }}>
      {pages.map((page) => (
        <FilePage page={page} />
      ))}
      {/* <EffectorTest /> */}
    </Space>
  );
};
