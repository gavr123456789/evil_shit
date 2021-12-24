// const chokidar = require("chokidar");
import { FSWatcher, watch } from "chokidar";
import { createEvent, createStore } from "effector-logger";
import { stat } from "fs";
import { basename } from "path";
import { FileItem } from "renderer/components/FileOnPage";

import { sort, createNewSortInstance } from 'fast-sort';

// const testArr = ['image-2.jpg', 'image-11.jpg', 'image-3.jpg'];

const naturalSort = createNewSortInstance({
  comparer: new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare,
});

// naturalSort(testArr).asc(); // => ['image-2.jpg', 'image-3.jpg', 'image-11.jpg']
// naturalSort(testArr).desc(); // => ['image-11.jpg', 'image-3.jpg', 'image-2.jpg']

///
export const $filePaths = createStore<FileItem[]>([], {name: "filePaths"})
export const $dirsPaths = createStore<FileItem[]>([], {name: "dirsPaths"})

const fileAdded = createEvent<FileItem>("fileAdded")
const dirAdded = createEvent<FileItem>("dirAdded")

$filePaths.on(fileAdded, (oldVal, newVal) => naturalSort([...oldVal, newVal]).asc())
$dirsPaths.on(dirAdded, (oldVal, newVal) => naturalSort([...oldVal, newVal]).asc())

// Соединить сторы в один с сортировкой сначала директорий



export function startWatch(path: string): FSWatcher {
  const watcher = watch(path, {
    ignored: /[\/\\]\./,
    persistent: true,
    depth: 1
  });
  function onWatcherReady() {
    console.info(
      "SASASASSAASAS WATCHER READY, watching path: ", path
    );
  }

  watcher
    .on("add", function (path) {
      console.log("File", path, "has been added");
      stat(path, (err, stats) => {
        if (err) {
          console.error(err)
          return
        }
        fileAdded({item: stats, name: basename(path), path: path})
      })
    })
    .on("addDir", function (path) {
      console.log("Directory", path, "has been added");
      stat(path, (err, stats) => {
        if (err) {
          console.error(err)
          return
        }
        dirAdded({item: stats, name: basename(path), path: path})
      })
      
    })
    .on("change", function (path) {
      console.log("File", path, "has been changed");
    })
    .on("unlink", function (path) {
      console.log("File", path, "has been removed");
    })
    .on("unlinkDir", function (path) {
      console.log("Directory", path, "has been removed");
    })
    .on("error", function (error) {
      console.log("Error happened", error);
    })
    .on("ready", onWatcherReady)
    .on("raw", function (event, path, details) {
      // This event should be triggered everytime something happens.
      console.log("Raw event info:", event, path, details);
    });

    return watcher
}
