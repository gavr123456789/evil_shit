// const chokidar = require("chokidar");
import { FSWatcher, watch } from "chokidar";
import { createEvent, createStore } from "effector-logger";

export const $filePaths = createStore<string[]>([], {name: "filePaths"})
export const $dirsPaths = createStore<string[]>([], {name: "dirsPaths"})

const fileAdded = createEvent<string>("fileAdded")
const dirAdded = createEvent<string>("dirAdded")


$filePaths.on(fileAdded, (oldVal, newVal) => [...oldVal, newVal])
$dirsPaths.on(dirAdded, (oldVal, newVal) => [...oldVal, newVal])

export function startWatch(path: string) {
  const watcher = watch(path, {
    ignored: /[\/\\]\./,
    persistent: true,
    depth: 1
  });
  function onWatcherReady() {
    console.info(
      "SASASASSAASAS WATCHER READY."
    );
  }

  watcher
    .on("add", function (path) {
      console.log("File", path, "has been added");
      fileAdded(path)
    })
    .on("addDir", function (path) {
      console.log("Directory", path, "has been added");
      dirAdded(path)
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
}


// var watch = require('node-watch');

// watch('home/gavr/test', { recursive: true }, function(evt: any, name: any) {
//   console.log('%s changed.', name);
// });

