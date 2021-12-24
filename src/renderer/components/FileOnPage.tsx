import { List } from "antd";
import { Stats } from "fs";
import { FC } from "react";



export interface FileItem {
  name: string
  path: string
  item: Stats
}


export const ListItem: FC<FileItem> = ({ item, name, path }) => {
  return (
    <List.Item
      key={item.uid}
      onClick={() => {
        console.log("clicked ", item);
        // add new list
      }}
    >
      <List.Item.Meta
        // avatar={<Avatar src={item.picture.large} />}
        title={<a>{name}</a>}
        description={path}
      />
    </List.Item>
  );
};