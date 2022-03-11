import { createEvent, createStore, guard, sample } from "effector";
import { createNewSortInstance } from "fast-sort";
import {
  addPathToWatch,
  globalCatcheDirs,
  globalCatcheFiles,
} from "services/FileService";
import { selectPage } from "./lastSelectedPage";
import { Page } from "./types";

const DEFAULT_PATH = "/home/gavr/test"

// sort funcs
const naturalSort = createNewSortInstance({
  comparer: new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })
    .compare,
});

export const $pages3 = createStore<Page[]>(
  [
    {
      path: DEFAULT_PATH,
      dirsAndFiles: [],
      selected: false
    }
  ],
  { name: "pages3" }
);



export interface EventBaseNameAndPath {
  baseName: string;
  dirName: string;
}

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
    return !pages.some((x) => x.path === pathForNewPage);
  },
});

// создает евент в который добавляется path из addPage и который срабатывает каждый раз когда оно уникально
const addUnique = sample({
  source: addPage,
  clock: addUniqueGuard,
});

$pages3
  .on(addUnique, (state: Page[], path: string) => {
    const newPage: Page = {
      dirsAndFiles: [],
      path: path,
      selected: true
    };


    const globalDirs = globalCatcheDirs.get(path);
    const globalFiles = globalCatcheFiles.get(path);

    // if this path in cache thenm take data from it Если в кеше есть, значит на эту страницу уже заходили и нужно только взять данные
    if (globalDirs || globalFiles) {
      newPage.dirsAndFiles = [...globalDirs ?? [], ...globalFiles ?? []];
    } else {
      // otherwise add to watching
      addPathToWatch(path);
    }

    selectPage(newPage)

    return [...state, newPage];
  })
  .on(addFile, (pages: Page[], pathWhereAdded: string) => {
    // Взять из глобала список
    const dirsArray = globalCatcheDirs.get(pathWhereAdded);
    const filesArray = globalCatcheFiles.get(pathWhereAdded);
    const page = pages.find((x) => x.path === pathWhereAdded);

    // Добавили на страницу которая сейчас не открыта
    // В кеше файлы все равно появятся, а тут делать ничего не надо
    if (!page) {
      return;
    }
    // 4 варианта, либо только файлоы, либо только директории либо и то и то либо ничего

    // Отсортировать
    const sortedDirs = naturalSort(dirsArray ?? []).asc();
    const sortedFiles = naturalSort(filesArray ?? []).asc();

    console.log("__sortedDirs = ", sortedDirs);

    // Положить в соответстующую page
    page.dirsAndFiles = [...sortedDirs, ...sortedFiles];
    return [...pages];
  })
  .on(
    deleteFile,
    (openPages: Page[], pathWhereDeleted: EventBaseNameAndPath) => {
      const page = openPages.find((x) => x.path === pathWhereDeleted.dirName);

      if (!page) {
        return;
      }
      // 4 варианта, либо только файлоы, либо только директории либо и то и то либо ничего

      // Положить в соответстующую page
      console.log(
        "___result before delete = ",
        JSON.parse(JSON.stringify(openPages))
      );

      page.dirsAndFiles = page.dirsAndFiles.filter(
        (x) => x.name !== pathWhereDeleted.baseName
      );
      const result = [...openPages];
      console.log(
        "___result after delete = ",
        JSON.parse(JSON.stringify(result))
      );

      return result;
    }
  )
  .on(removePage, (pages: Page[], path: string) => {
    return pages.filter((x) => x.path !== path);
  });
