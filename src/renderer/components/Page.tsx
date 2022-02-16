import { Skeleton, Divider, List, Button, Space } from "antd";

import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { removePage } from "renderer/model/pagesStore";
import { createNewId } from "services/utils";
import { Page } from "../model/types";
import { DirRow, FileRow } from "./Row";
import Parser = require("web-tree-sitter")

Parser.init()

interface FileListProps {
  page: Page;
}

async function treeSitterTest() {
  const parser = new Parser;
  const JavaScript = await Parser.Language.load('/path/to/tree-sitter-javascript.wasm');
  parser.setLanguage(JavaScript);
}

export const FilePage: FC<FileListProps> = ({ page }) => {

  const loadMoreData = () => {

  };

  // useEffect(() => {
    // console.log("ADDED WATCHER FOR DIR ", page.path);
    // addPathToWatch(page.path)
    // return function cleanup() {
    //   removePathToWatch(page.path)
    // };
  // }, [page.path]);

  return (
    <div
      key={createNewId()}
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
        <Space>
          <Button onClick={() => removePage(page.path)} key="back" > back </Button>
          <Button onClick={() => removePage(page.path)} key="delete" > delete </Button>
        </Space>

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
