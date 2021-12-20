import { Space } from "antd";
import { createStore } from "effector";
import { useStore } from "effector-react/effector-react.cjs";
import { FC, useState } from "react";
import { EffectorTest } from "./EffectorTest/EffectorTest";

import { FileList } from "./FileList";


export const MainComponent: FC = () => {


  return (
    <Space style={{margin: 6}}>
      <FileList />
      <EffectorTest />
 
    </Space>
  );
};

