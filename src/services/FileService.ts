// const chokidar = require("chokidar");
import { FSWatcher, watch } from "chokidar";
export function startWatch(path: string) {
  const watcher = watch(path, {
    ignored: /[\/\\]\./,
    persistent: true,
  });
  function onWatcherReady() {
    console.info(
      "SASASASSAASAS WATCHER READY."
    );
  }

  watcher
    .on("add", function (path) {
      console.log("File", path, "has been added");
    })
    .on("addDir", function (path) {
      console.log("Directory", path, "has been added");
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

