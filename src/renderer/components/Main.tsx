import { Space } from "antd";
import { FC } from "react";
import { useStore } from "effector-react";
import { FilePage } from "./FilePage";
import { $pages3 } from "./pagesStore";


export const MainComponent: FC = () => {
  const pages = useStore($pages3);

  return (
    <Space style={{ margin: 6 }}>
      {pages.map((page) => (
        <FilePage page={page} />
      ))}
      {/* <EffectorTest /> */}
    </Space>
  );
};
