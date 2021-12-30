import { createEvent, createStore, guard, sample } from "effector";
import { createNewSortInstance } from "fast-sort";
import { FileOrDirAddEventData, Page } from "./types";

// sort funcs
const naturalSort = createNewSortInstance({
  comparer: new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })
    .compare,
});


export const $pages3 = createStore<Page[]>(
  [
    {
      path: "/home/gavr/test",
      dirsAndFiles: [],
    },
  ],
  { name: "pages3" }
);



export const addFile = createEvent<FileOrDirAddEventData>("fileAdd");
export const deleteFile = createEvent<FileOrDirAddEventData>("deleteFile");
export const addPage = createEvent<string>("addPage");
export const removePage = createEvent<string>("removePage");



// Возвращает евент который срабатыват только если path в addPage уникально
const addUniqueGuard = guard({
  clock: addPage,
  source: $pages3,
  filter: (pages, pathForNewPage) => {

    console.log("__pageAdd guard, ищу среди  ", pages)
    console.log("__pageAdd guard, вот такой path  ", pathForNewPage)
    console.log("__pageAdd guard, ", pages.find(x => x.path === pathForNewPage) === undefined )
      
    return !pages.some(x => x.path === pathForNewPage) 
  },
})

// создает евент в который добавляется path из addPage и который срабатывает каждый раз когда оно уникально
const addUnique = sample({
  source: addPage,
  clock: addUniqueGuard
})


function onFileOrDirAdd(
  pages: Page[],
  dirOrFileEventData: FileOrDirAddEventData
): Page[] | void {
  
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

  
  return [...result];
}

function onFileOrDirDelete(
  pages: Page[],
  dirOrFileEventData: FileOrDirAddEventData
): Page[] | void {
  
  const result = pages;
  // найти нужную страцину по path
  const page = pages.find((x) => x.path === dirOrFileEventData.path);
  if (!page) return;
  page.dirsAndFiles = 
    page.dirsAndFiles.filter(x => x.name !== dirOrFileEventData.dirOrFile.name)
  
  // // вынуть все файлы и все папки
  // let dirs = page.dirsAndFiles.filter((x) => x.kind === "dir");
  // let files = page.dirsAndFiles.filter((x) => x.kind === "file");
  
  // // добавить файл или директорию и сразу отсортировать
  // switch (dirOrFileEventData.dirOrFile.kind) {
  //   case "dir":
  //     dirs.push(dirOrFileEventData.dirOrFile);
  //     dirs = naturalSort(dirs).asc();
  //     break;
  //   case "file":
  //     files.push(dirOrFileEventData.dirOrFile);
  //     files = naturalSort(files).asc();
  //     break;
  // }

  // // добавить обратно папки и файлы
  // page.dirsAndFiles = [...dirs, ...files]

  
  return [...result];
}


function onRemovePage(pages: Page[], path: string) {
  return pages.filter(x => x.path !== path)
}

function onAddPage(state: Page[], path: string) {
  console.log("__onPageAdd path = ", path);
  
  const newPage: Page = {
    dirsAndFiles: [],
    path: path
  }
  return [...state, newPage]
}

$pages3.on(addUnique, onAddPage);
$pages3.on(addFile, onFileOrDirAdd);
$pages3.on(deleteFile, onFileOrDirDelete);
$pages3.on(removePage, onRemovePage);
