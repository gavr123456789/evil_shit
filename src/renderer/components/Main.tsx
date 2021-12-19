import { Layout, Breadcrumb, Menu, Avatar, Card } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import { FC, useState } from "react";

import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { FileList } from "./FileList";

export const MainComponent: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed: boolean) => {
    console.log("collapsed = ", collapsed);
    setCollapsed(collapsed);
  };

  return (
    <FileList />
    // <Layout>
    //   <Content>

    //     <Card
    //       style={{ width: 300 }}
    //       cover={
    //         <img
    //           alt="example"
    //           src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    //         />
    //       }
    //       actions={[
    //         <SettingOutlined key="setting" />,
    //         <EditOutlined key="edit" />,
    //         <EllipsisOutlined key="ellipsis" />,
    //       ]}
    //     >
    //       <Meta
    //         avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
    //         title="Card title"
    //         description="This is the description"
    //       />
    //     </Card>

    //   </Content>
    // </Layout>
  );
};
