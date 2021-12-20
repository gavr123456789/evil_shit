import { Skeleton, Divider, List, Avatar } from "antd";
import { useState, useEffect, FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { startWatch } from "services/FileService";
import { createNewId } from "services/utils";

interface FileItem {
  name: string;
  id: string;
}

const dataMock: FileItem[] = [
  {
    id: createNewId(),
    name: "zxc",
  },
  {
    id: createNewId(),
    name: "rty",
  },
  {
    id: createNewId(),
    name: "ghj",
  },
  {
    id: createNewId(),
    name: "sawe",
  },
  {
    id: createNewId(),
    name: "vbnfd",
  },
  {
    id: createNewId(),
    name: "retyjgh",
  },
];

interface ListItemProps {
  item: FileItem;
}

const ListItem: FC<ListItemProps> = ({ item }) => {
  return (
    <List.Item
      key={item.id}
      onClick={() => {
        startWatch("/home/gavr/test");
      }}
    >
      <List.Item.Meta
        // avatar={<Avatar src={item.picture.large} />}
        title={<a>{item.name}</a>}
        description={item.id}
      />
      <div>Content</div>
    </List.Item>
  );
};

interface FileListProps {
  path: string
}

export const FileList: FC<FileListProps> = ({path}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FileItem[]>(dataMock);

  const loadMoreData = () => {
    // if (loading) {
    //   return;
    // }
    // setLoading(true);
    // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
    //   .then(res => res.json())
    //   .then(body => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
    if (data.length < dataMock.length) {
      setLoading(true);
      setData(dataMock);
      setLoading(false);
    }

    // setLoading(false)
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: "auto",
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < dataMock.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>nothing more</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => <ListItem item={item} />}
        />
      </InfiniteScroll>
    </div>
  );
};
