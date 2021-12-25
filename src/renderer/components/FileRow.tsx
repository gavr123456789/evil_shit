import { Button, List, Space } from "antd";
import { Stats } from "fs";
import { FC } from "react";
import { createNewId } from "services/utils";
import { IDirRow, IFileRow } from "./pagesStore";

export interface DirItemProps {
  path: string;
  item: IDirRow;
}

export const DirRow: FC<DirItemProps> = ({ item, path }) => {
  return (
    <List.Item
      key={createNewId()}
      onClick={(x) => {
        if (x.button === 1) {
          console.log("clicked ", path);
          // createPage(path);
        }
        
      }}
    >
      <Space direction="horizontal" style={{ margin: 6 }}>
        <List.Item.Meta
          // avatar={<Avatar src={item.picture.large} />}
          title={<a>{item.name}</a>}
          description={path}
        />
        {/* <Button> {"->"} </Button> */}
      </Space>
    </List.Item>
    
  );
};

export interface FileItem {
  path: string;
  item: IFileRow;
}

export const FileRow: FC<FileItem> = ({ item, path }) => {
  return (
    <List.Item
      key={createNewId()}
      onClick={(x) => {
        if (x.button === 1) {
          console.log("clicked ", name);
          // createPage(path);
        }
        
      }}
    >
      <List.Item.Meta
        // avatar={<Avatar src={item.picture.large} />}
        title={<a>{item.name}</a>}
        description={path}
      />
    </List.Item>
  );
};
