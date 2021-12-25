import { FSWatcher, watch } from "chokidar";
import { stat } from "fs";
import { basename, dirname, extname } from "path";
import { fileAdd3 } from "renderer/components/pagesStore";

// const naturalSort = createNewSortInstance({
//   comparer: new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })
//     .compare,
// });

///
// export const $filePaths = createStore<FileItem[]>([], { name: "filePaths" });
// export const $dirsPaths = createStore<FileItem[]>([], { name: "dirsPaths" });

// const fileAdded = createEvent<FileItem>("fileAdded");
// const dirAdded = createEvent<FileItem>("dirAdded");

// $filePaths.on(fileAdded, (oldVal, newVal) =>
//   naturalSort([...oldVal, newVal]).asc()
// );
// $dirsPaths.on(dirAdded, (oldVal, newVal) =>
//   naturalSort([...oldVal, newVal]).asc()
// );

// Соединить сторы в один с сортировкой сначала директорий

// export const $filesAndDirsPaths = combine([$dirsPaths, $filePaths], (items) => [
//   ...items[0],
//   ...items[1],
// ]);

export function startWatch(path: string): FSWatcher {
  const watcher = watch(path, {
    ignored: /[\/\\]\./,
    persistent: true,
    depth: 1,
  });

  function onWatcherReady() {
    console.info("WATCHER READY, watching path: ", path);
  }

  watcher
    .on("add", function (path) {
      console.log("File", path, "has been added");

      stat(path, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("__basename(path) = ", basename(path));
        
        fileAdd3({
          path: dirname(path),
          dirOrFile: {
            kind: "file",
            name: basename(path),
            ext: extname(path),
            item: stats
          }
        })


      });
    })
    .on("addDir", function (path) {
      console.log("Directory", path, "has been added");
      stat(path, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        fileAdd3({
          path: dirname(path),
          dirOrFile: {
            kind: "dir",
            name: basename(path),
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

  return watcher;
}
