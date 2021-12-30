import { Stats } from "fs";

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

export interface FileOrDirAddEventData {
  path: string;
  dirOrFile: DirOrFileRow;
}


export interface Page {
  path: string;
  dirsAndFiles: DirOrFileRow[];
}