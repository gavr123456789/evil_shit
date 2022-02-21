import { createEvent, createStore, guard, sample } from "effector";
import { createNewSortInstance } from "fast-sort";
import { addPathToWatch, globalCatcheDirs, globalCatcheFiles } from "services/FileService";
import { FileOrDirAddEventData, Page } from "./types";

// sort funcs
const naturalSort = createNewSortInstance({
  comparer: new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })
    .compare,
})


export const $pages3 = createStore<Page[]>(
  [
    {
      path: "/home/gavr/test",
      dirsAndFiles: [],
    },
  ],
  { name: "pages3" }
);

export interface EventBaseNameAndPath{
  baseName: string,
  dirName: string,
}

export const addFileOld = createEvent<FileOrDirAddEventData>("fileAdd");
export const deleteFileOld = createEvent<FileOrDirAddEventData>("deleteFile");
export const addFile = createEvent<string>("fileAdd"); // путь в котором добавился файл
export const deleteFile = createEvent<EventBaseNameAndPath>("deleteFile"); // путь в котором удалился файл


export const addPage = createEvent<string>("addPage"); // pagePath
export const removePage = createEvent<string>("removePage"); // pagePath
export const goBack = createEvent<string>("goBack"); // pagePath



// Возвращает евент который срабатыват только если path в addPage уникально
const addUniqueGuard = guard({
  clock: addPage,
  source: $pages3,
  filter: (pages, pathForNewPage) => {
    return !pages.some(x => x.path === pathForNewPage)
  },
})

// создает евент в который добавляется path из addPage и который срабатывает каждый раз когда оно уникально
const addUnique = sample({
  source: addPage,
  clock: addUniqueGuard
})



function onFileOrDirAddNew(pages: Page[], pathWhereAdded: string): Page[] | void {

  // Взять из глобала список
  const dirsArray = globalCatcheDirs.get(pathWhereAdded)
  const filesArray = globalCatcheFiles.get(pathWhereAdded)
  const page = pages.find((x) => x.path === pathWhereAdded);

  // Добавили на страницу которая сейчас не открыта
  // В кеше файлы все равно появятся, а тут делать ничего не надо
  if (!page) {
    return
  }
  // 4 варианта, либо только файлоы, либо только директории либо и то и то либо ничего

  // Отсортировать
  const sortedDirs = naturalSort(dirsArray ?? []).asc()
  const sortedFiles = naturalSort(filesArray ?? []).asc()

  console.log("__sortedDirs = ", sortedDirs);

  // Положить в соответстующую page
  page.dirsAndFiles = [...sortedDirs, ...sortedFiles]
  return [...pages]
}

function onFileOrDirDeleteNew(openPages: Page[], pathWhereDeleted: EventBaseNameAndPath): Page[] | void {

  const page = openPages.find((x) => x.path === pathWhereDeleted.dirName);


  if (!page) {
    return
  }
  // 4 варианта, либо только файлоы, либо только директории либо и то и то либо ничего

  // Положить в соответстующую page
  console.log("___result before delete = ", JSON.parse(JSON.stringify(openPages)));

  page.dirsAndFiles = page.dirsAndFiles.filter(x => x.name !== pathWhereDeleted.baseName)
  const result = [...openPages]
  console.log("___result after delete = ", JSON.parse(JSON.stringify(result)));

  return result
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


function onRemovePage(pages: Page[], path: string) {
  // removePathToWatch(path)
  return pages.filter(x => x.path !== path)
}

function onAddPage(state: Page[], path: string) {

  const newPage: Page = {
    dirsAndFiles: [],
    path: path
  }

  // Если в кеше есть, значит на эту страницу уже заходили и нужно только взять данные
  const globalDirs = globalCatcheDirs.get(path)
  const globalFiles = globalCatcheFiles.get(path)

  if (globalDirs && globalFiles) {
    newPage.dirsAndFiles = [...globalDirs, ...globalFiles]
  } else {
    addPathToWatch(path)
  }

  // Иначе добавить путь к наблюдаемым



  return [...state, newPage]
}

$pages3.on(addUnique, onAddPage);
// $pages3.on(addFileOld, onFileOrDirAdd);
$pages3.on(addFile, onFileOrDirAddNew);
$pages3.on(deleteFile, onFileOrDirDeleteNew);
// $pages3.on(deleteFileOld, onFileOrDirDelete);
$pages3.on(removePage, onRemovePage);
