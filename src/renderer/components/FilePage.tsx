import { Skeleton, Divider, List } from "antd";
import { FSWatcher } from "chokidar";
import { useStore } from "effector-react";
import { useState, useEffect, FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { $dirsPaths, $filePaths, $filesAndDirsPaths, startWatch } from "services/FileService";
import { createNewId } from "services/utils";
import { ListItem } from "./FileOnPage";


interface FileListProps {
  path: string
}

export const FilePage: FC<FileListProps> = ({path}) => {
  console.log("sasssss");
  const files = useStore($filesAndDirsPaths)
  
  const [watcher, setWatcher] = useState<FSWatcher | null>(null)
  const loadMoreData = () => {
    // if (loading) {
    //   return;
    // }
    // setLoading(false)
  };

  useEffect(() => {
    setWatcher(startWatch(path))
    return function cleanup() {  
      watcher?.close().then(() => console.log('watcher closed'));
    };
  }, [path]);


  return (
    <div
      id="scrollableDiv"
      style={{
        height: "auto",
        minWidth: 250,
        // overflow: "auto",
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
          size="large"
        />
      </InfiniteScroll>
    </div>
  );
};


