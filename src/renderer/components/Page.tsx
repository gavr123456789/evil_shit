import { Skeleton, Divider, List } from "antd";
import { FSWatcher } from "chokidar";

import { useState, useEffect, FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { addPathToWatch, removePathToWatch, startWatch, watchedDirs } from "services/FileService";
import { createNewId } from "services/utils";
import { Page } from "./model/types";
import { DirRow, FileRow } from "./Row";


interface FileListProps {
  page: Page;
}

export const FilePage: FC<FileListProps> = ({ page }) => {

  const loadMoreData = () => {
    // if (loading) {
    //   return;
    // }
    // setLoading(false)
  };

  useEffect(() => {
    console.log("ADDED WATCHER FOR DIR ", page.path);
    addPathToWatch(page.path)
    return function cleanup() {
      removePathToWatch(page.path)
      watchedDirs.delete(page.path)
    };
  }, [page.path]);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: "100%",
        minWidth: 250,
        // overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={page.dirsAndFiles.length}
        next={loadMoreData}
        hasMore={false}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain></Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={page.dirsAndFiles}
          renderItem={(x) =>
            x.kind === "file" 
            ? 
              <FileRow key={createNewId()} path={page.path} item={x} /> 
            :
              <DirRow key={createNewId()} path={page.path} item={x} /> 
          }
          size="large"
        />
      </InfiniteScroll>
    </div>
  );
};
