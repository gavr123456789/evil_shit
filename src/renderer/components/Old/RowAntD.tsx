import { List, Space } from "antd";
import { shell } from "electron";
import { join } from "path";
import { FC } from "react";
import { createNewId } from "services/utils";
import { addPage } from "../../model/pagesStore";
import { IDirRow, IFileRow } from "../../model/types";
import { FileOutlined, FolderOutlined } from "@ant-design/icons";


export interface DirItemProps {
  path: string;
  item: IDirRow;
}

export const DirRow: FC<DirItemProps> = ({ item, path }) => {
  return (
    <List.Item
      key={createNewId()}
      onClick={(e) => {

      }}
      onMouseDown={(e)=> {
        if (e.button === 1){
          e.preventDefault()
          addPage(join(path, item.name)  )
        }
      }}
    >
      <Space direction="horizontal" style={{ margin: 6 }}>
        <List.Item.Meta
          avatar={<FolderOutlined />}
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
        if (x.button === 0) {
          
          shell.openPath(join(path, item.name));
        }
      }}
    >
      <List.Item.Meta
        // avatar={<Avatar src={item.picture.large} />}
        avatar={<FileOutlined />}

        title={<a>{item.name}</a>}
        description={path}
      />
    </List.Item>
  );
};


