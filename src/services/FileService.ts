import { watch } from "chokidar";
// import { createNewSortInstance } from "fast-sort";
import { stat } from "fs";
import { basename, dirname, extname } from "path";
import { addFile, deleteFile } from "renderer/model/pagesStore";
import { DirOrFileRow } from "renderer/model/types";


// const naturalSort = createNewSortInstance({
//   comparer: new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })
//     .compare,
// })

// export const watchedDirs = new Set<string>()
const DEFAULT_PATH = "/home/gavr/test"

const watcher = watch(DEFAULT_PATH, {
  ignored: /[\/\\]\./,
  persistent: true,
  depth: 0,
});

// TODO Держать в коллекциях флаг отсортирована она или нет
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

        const dirWhereFileAdded = dirname(newPath)
        let globalFilesArray = globalCatcheFiles.get(dirWhereFileAdded)
        // Если мы на этой странице еще не были, то создаем массив
        if (!globalFilesArray) {
          globalFilesArray = []
          globalCatcheFiles.set(dirWhereFileAdded, globalFilesArray)
        }

        globalFilesArray.push({
          kind: "file",
          name: basename(newPath),
          ext: extname(newPath),
          item: stats
        })

        addFile(dirWhereFileAdded)

      });
    })
    .on("addDir", function (newPath) {

      stat(newPath, (err, stats) => {
        if (err) { console.error(err); return; }

        const dirWhereDirAdded = dirname(newPath)
        let globalDirs = globalCatcheDirs.get(dirWhereDirAdded)

        if (!globalDirs) {
          globalDirs = []
          globalCatcheDirs.set(dirWhereDirAdded, globalDirs)
        }

        globalDirs.push({
          kind: "dir",
          name: basename(newPath),
          item: stats
        })

        console.log("Dir was added", newPath);


        addFile(dirWhereDirAdded)

      });
    })
    .on("change", function (path) {
      console.log("File", path, "has been changed");
    })
    .on("unlink", function (path) {
      console.log("File", path, "has been removed");
      const dirName = dirname(path)
      const baseName = basename(path)

      const dirWhereFileDeleted = dirName
      const filesArray = globalCatcheFiles.get(dirWhereFileDeleted)
      // Если мы на этой странице были, то нужно удалить оттуда файл
      if (filesArray) {
        globalCatcheFiles.set(dirWhereFileDeleted, filesArray.filter(x => x.name != baseName))
      }
      deleteFile({baseName: baseName, dirName: dirName})
    })
    .on("unlinkDir", function (path) {
      console.log("Directory", path, "has been removed");
      const dirName = dirname(path)
      const baseName = basename(path)
      const dirWhereDirDeleted = dirName
      const dirsArray = globalCatcheDirs.get(dirWhereDirDeleted)

      // Если мы на этой странице были, то нужно удалить оттуда директорию
      if (dirsArray) {
        globalCatcheDirs.set(dirWhereDirDeleted, dirsArray.filter(x => x.name !== baseName ))
      }
      deleteFile({baseName: baseName, dirName: dirName})
    })
    .on("error", function (error) {
      console.log("Error happened", error);
    })
    .on("ready", onWatcherReady)
    .on("raw", function (event, path, details) {
      // This event should be triggered everytime something happens.
      // console.log("Raw event info:", event, path, details);
    });

}

export function addPathToWatch(path: string) {
  console.log("_add path to watch ", path);
  watcher.add(path)
}
// export function removePathToWatch(path: string) {
//   // watcher.unwatch(path)
// }
