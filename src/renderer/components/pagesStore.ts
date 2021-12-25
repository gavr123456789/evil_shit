import { createEvent, createStore } from "effector-logger";
import { createNewSortInstance } from "fast-sort";
import { Stats } from "fs";

// sort funcs
const naturalSort = createNewSortInstance({
  comparer: new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })
    .compare,
});
// event interfaces
interface FileOrDirAddEventData {
  path: string;
  dirOrFile: DirOrFileRow;
}
//
export interface IFileRow {
  kind: "file";
  name: string;
  ext: string;
  item: Stats;
}

export interface IDirRow {
  kind: "dir";
  name: string;
  item: Stats;
}

type DirOrFileRow = IDirRow | IFileRow;

export interface Page {
  path: string;
  dirsAndFiles: DirOrFileRow[];
}

export const $pages3 = createStore<Page[]>(
  [
    {
      path: "/home/gavr/test",
      dirsAndFiles: [],
    },
  ],
  { name: "pages2" }
);

export const fileAdd3 = createEvent<FileOrDirAddEventData>("fileAdd");

function onFileOrDirAdd(
  pages: Page[],
  dirOrFileEventData: FileOrDirAddEventData
): Page[] | void {
  console.log("__onFileOrDirAdd ");
  
  const result = pages;
  // найти нужную страцину по path
  const page = pages.find((x) => x.path === dirOrFileEventData.path);
  if (!page) return;
  
  // вынуть все файлы и все папки
  let dirs = page.dirsAndFiles.filter((x) => x.kind === "dir");
  let files = page.dirsAndFiles.filter((x) => x.kind === "file");
  
  // добавить файл или директорию и сразу отсортировать
  switch (dirOrFileEventData.dirOrFile.kind) {
    case "dir":
      dirs.push(dirOrFileEventData.dirOrFile);
      dirs = naturalSort(dirs).asc();
      break;
    case "file":
      files.push(dirOrFileEventData.dirOrFile);
      files = naturalSort(files).asc();
      break;
  }

  // добавить обратно папки и файлы
  page.dirsAndFiles = [...dirs, ...files]

  const sas = [...result]
  console.log("__onFileOrDirAdd, result = ", sas);
  
  return [...result];
}

$pages3.on(fileAdd3, onFileOrDirAdd);
