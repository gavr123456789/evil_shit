import { Space } from "antd";
import { createStore } from "effector";
import { useStore } from "effector-react/effector-react.cjs";
import { FC, useState } from "react";
import { EffectorTest } from "./EffectorTest/EffectorTest";

import { FilePage } from "./FilePage";


export const MainComponent: FC = () => {


  return (
    <Space style={{margin: 6}}>
      <FilePage path="/home/gavr/test" />
      <EffectorTest />
 
    </Space>
  );
};

