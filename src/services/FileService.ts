import { watch } from "chokidar";
import { createNewSortInstance } from "fast-sort";
import { stat } from "fs";
import { basename, dirname, extname } from "path";
import { addFile, addFileOld } from "renderer/model/pagesStore";
import { DirOrFileRow } from "renderer/model/types";

const naturalSort = createNewSortInstance({
  comparer: new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })
    .compare,
})

// export const watchedDirs = new Set<string>()
const DEFAULT_PATH = "/home/gavr/test"

const watcher = watch(DEFAULT_PATH, {
  ignored: /[\/\\]\./,
  persistent: true,
  depth: 0,
});


export const globalCatcheDirs = new Map<string, Array<DirOrFileRow>>()
export const globalCatcheFiles = new Map<string, Array<DirOrFileRow>>()

startWatch()
export function startWatch() {

  function onWatcherReady() {
    console.info("WATCHER READY, watching paths: ", watcher.getWatched);
  }

  watcher
    .on("add", function (newPath) {

      stat(newPath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("add File, global files = ", globalCatcheFiles);

        const dirWhereFileAdded = dirname(newPath)
        let globalFilesArray = globalCatcheFiles.get(dirWhereFileAdded)
        if (!globalFilesArray) {
          const a = new Array<DirOrFileRow>()
          globalCatcheFiles.set(dirWhereFileAdded, a)
          globalFilesArray = a
        }

        globalFilesArray.push({
          kind: "file",
          name: basename(newPath),
          ext: extname(newPath),
          item: stats
        })

        // globalFilesArray = naturalSort(globalFilesArray).asc()


        addFile(dirWhereFileAdded)

      });
    })
    .on("addDir", function (newPath) {

      stat(newPath, (err, stats) => {
        if (err) { console.error(err); return; }

        console.log("add Dir, global dirs = ", globalCatcheDirs)

        const dirWhereDirAdded = dirname(newPath)
        let globalDirs = globalCatcheDirs.get(dirWhereDirAdded)

        if (!globalDirs) {
          const a = new Array<DirOrFileRow>()
          globalCatcheDirs.set(dirWhereDirAdded, a)
          globalDirs = a
        }

        globalDirs.push({
          kind: "dir",
          name: basename(newPath),
          item: stats
        })

        addFile(dirWhereDirAdded)

      });
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

  // return watcher;
}

export function addPathToWatch(path: string) {
  console.log("_add path to watch ", path);
  watcher.add(path)
}
export function removePathToWatch(path: string) {
  // console.log("_removing page from watch: ", path);
  // watcher.unwatch(path)
}
