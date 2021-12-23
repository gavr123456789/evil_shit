import { Skeleton, Divider, List, Avatar } from "antd";
import { useStore } from "effector-react";
import { useState, useEffect, FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { $filePaths, startWatch } from "services/FileService";
import { createNewId } from "services/utils";
import { ListItem } from "./FileOnPage";





startWatch("/home/gavr/test");
interface FileListProps {
  path: string
}

export const FilePage: FC<FileListProps> = ({path}) => {
  // const [loading, setLoading] = useState(false);

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
    // if (data.length < dataMock.length) {
    //   setLoading(true);
    //   setData(dataMock);
    //   setLoading(false);
    // }
    // setData

    // setLoading(false)
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const files = useStore($filePaths)

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
        dataLength={files.length}
        next={loadMoreData}
        hasMore={false}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>nothing more</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={files}
          renderItem={(x) => <ListItem path={x.path} name={x.name} item={x.item} />}
        />
      </InfiniteScroll>
    </div>
  );
};
