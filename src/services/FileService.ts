import { FSWatcher, watch } from "chokidar";
import { stat } from "fs";
import { basename, dirname, extname } from "path";
import { addFile } from "renderer/model/pagesStore";

// export const watchedDirs = new Set<string>()
const DEFAULT_PATH = "/home/gavr/test"

const watcher = watch(DEFAULT_PATH, {
  ignored: /[\/\\]\./,
  persistent: true,
  depth: 0,
});

startWatch()
export function startWatch() {

  function onWatcherReady() {
    console.info("WATCHER READY, watching paths: ", watcher.getWatched);
  }

  watcher
    .on("add", function (newPath) {
      console.log("File", newPath, "has been added");

      stat(newPath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        // console.log("__dirname(path) = ", dirname(path));

        addFile({
          path: dirname(newPath),
          dirOrFile: {
            kind: "file",
            name: basename(newPath),
            ext: extname(newPath),
            item: stats
          }
        })
      });
    })
    .on("addDir", function (newPath) {
      console.log("Directory", newPath, "has been added");
      stat(newPath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        addFile({
          path: dirname(newPath),
          dirOrFile: {
            kind: "dir",
            name: basename(newPath),
            item: stats
          }
        })
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
  console.log("_removing page from watch: ", path);
  watcher.unwatch(path)
}
