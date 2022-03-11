import { Stats } from "fs";

export interface IFileRow {
  kind: "file";
  name: string;
  ext: string;
  stats?: Stats;
}
export interface IDirRow {
  kind: "dir";
  name: string;
  stats?: Stats;
}

export type DirOrFileRow = IDirRow | IFileRow;

export interface FileOrDirAddEventData {
  path: string;
  dirOrFile: DirOrFileRow;
}


export interface Page {
  path: string;
  dirsAndFiles: DirOrFileRow[];
  selected: boolean;
  lastSelected?: Page
}
